import { useEffect, useRef } from 'react'
import { useMotion } from '../../context/motion'
import { introDone } from '../../lib/intro'

const PIXEL = 2

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uInk;
uniform vec3 uPaper;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p) {
  float t = uTime * 0.35;
  float d = length(p) - 0.95;
  d = smin(d, length(p - vec3(sin(t) * 0.9, cos(t * 1.3) * 0.55, sin(t * 0.7) * 0.5)) - 0.55, 0.65);
  d = smin(d, length(p - vec3(-cos(t * 0.8) * 0.95, sin(t * 1.1) * 0.75, cos(t * 0.5) * 0.4)) - 0.52, 0.65);
  d = smin(d, length(p - vec3(sin(t * 1.7) * 0.45, -cos(t * 0.9) * 0.9, sin(t * 1.3) * 0.6)) - 0.48, 0.65);
  d = smin(d, length(p - vec3(uMouse * vec2(1.0, -0.8), 0.7)) - 0.42, 0.75);
  return d;
}

vec3 normal(vec3 p) {
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.0, 6.6);
  vec3 rd = normalize(vec3(uv, -1.7));

  float t = 0.0;
  float hit = 0.0;
  for (int i = 0; i < 96; i++) {
    float d = map(ro + rd * t);
    if (d < 0.002 && t < 11.0) { hit = 1.0; break; }
    t += d * 0.8;
    if (t > 12.0) break;
  }

  float ink = 0.0;
  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec3 n = normal(p);
    vec3 l = normalize(vec3(-0.55, 0.75, 0.6));
    float dif = max(dot(n, l), 0.0);
    float spec = pow(max(dot(reflect(-l, n), -rd), 0.0), 28.0);
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 2.5);
    ink = clamp(0.95 - dif * 0.85 - spec * 0.9 + rim * 0.35, 0.0, 1.0);
  }

  float on = step(bayer8(mod(floor(gl_FragCoord.xy), 8.0)) + 0.001, ink);
  gl_FragColor = vec4(mix(uPaper, uInk, on), 1.0);
}
`

function readColor(name: string) {
  const el = document.createElement('span')
  el.style.color = `var(${name})`
  document.body.appendChild(el)
  const rgb = getComputedStyle(el).color.match(/\d+/g)?.map(Number) ?? [0, 0, 0]
  el.remove()
  return rgb.slice(0, 3).map((v) => v / 255)
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export function Blob({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const motion = useMotion()

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false })
    if (!canvas || !gl) return

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(program, 'uRes'),
      time: gl.getUniformLocation(program, 'uTime'),
      mouse: gl.getUniformLocation(program, 'uMouse'),
      ink: gl.getUniformLocation(program, 'uInk'),
      paper: gl.getUniformLocation(program, 'uPaper'),
    }

    const setColors = () => {
      gl.uniform3fv(u.ink, readColor('--fg'))
      gl.uniform3fv(u.paper, readColor('--bg'))
    }
    setColors()
    const themeObserver = new MutationObserver(() => {
      setColors()
      if (!motion) draw(0)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth / PIXEL))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight / PIXEL))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(u.res, canvas.width, canvas.height)
      if (!motion) draw(0)
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const draw = (time: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      gl.uniform1f(u.time, time / 1000)
      gl.uniform2f(u.mouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(canvas)
    resize()

    if (!motion) {
      draw(4000)
      return () => {
        sizeObserver.disconnect()
        themeObserver.disconnect()
      }
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = Math.max(-1, Math.min(1, ((e.clientX - r.left - r.width / 2) / window.innerWidth) * 2))
      mouse.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top - r.height / 2) / window.innerHeight) * 2))
    }
    window.addEventListener('pointermove', onMove)

    let frame = 0
    let visible = true
    let ready = false
    const loop = (time: number) => {
      draw(time)
      frame = visible ? requestAnimationFrame(loop) : 0
    }
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (ready && visible && !frame) frame = requestAnimationFrame(loop)
    })
    visibility.observe(canvas)
    introDone.then(() => {
      ready = true
      if (visible && !frame) frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      visibility.disconnect()
      sizeObserver.disconnect()
      themeObserver.disconnect()
    }
  }, [motion])

  return <canvas ref={ref} className={`blob ${className}`} aria-hidden="true" />
}
