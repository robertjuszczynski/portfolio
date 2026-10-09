import { useEffect, useRef, useState } from 'react'
import { useMotion } from '../../context/motion'
import './Chatbot.scss'

interface Message {
  role: 'user' | 'bot'
  content: string
  sig?: string
  fresh?: boolean
}

function InkText({ text, animate }: { text: string; animate: boolean }) {
  const motion = useMotion()
  const [count, setCount] = useState(animate && motion ? 0 : text.length)

  useEffect(() => {
    if (count >= text.length) return
    const id = setTimeout(() => setCount((c) => Math.min(text.length, c + 2)), 16)
    return () => clearTimeout(id)
  }, [count, text.length])

  return (
    <>
      {text.slice(0, count)}
      {count < text.length && <span className="type-caret" />}
    </>
  )
}

const SUGGESTIONS = ["What's your stack?", 'Are you available?', 'What are you working on now?']

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "I'm Robert's agent. I know his stack, his projects and whether he's free. Ask. I answer in seconds and skip the small talk." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const show = setTimeout(() => setShowBadge(true), 4000)
    const hide = setTimeout(() => setShowBadge(false), 14000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    const observer = new MutationObserver(() => { el.scrollTop = el.scrollHeight })
    observer.observe(el, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  function togglePanel() {
    setOpen((prev) => {
      if (!prev) setShowBadge(false)
      return !prev
    })
    setTimeout(() => inputRef.current?.focus(), 350)
  }

  async function send(text = input) {
    const q = text.trim()
    if (!q || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: q }])
    setLoading(true)

    const history = messages.map((m) => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.content,
      sig: m.sig,
    }))
    history.push({ role: 'user', content: q, sig: undefined })

    let reply = 'Something went wrong. Please try again or contact Robert directly.'
    let sig: string | undefined
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      if (typeof data.message === 'string') reply = data.message
      if (res.ok && typeof data.sig === 'string') sig = data.sig
    } catch {
      reply = 'Something went wrong. Please try again or contact Robert directly.'
    } finally {
      setMessages((prev) => [...prev, { role: 'bot', content: reply, sig, fresh: true }])
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div id="chat-widget">
      <div id="chat-panel" className={open ? 'open' : ''} aria-hidden={!open}>

        <div id="chat-messages" ref={messagesRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role}`}>
              <div className="msg-label">{msg.role === 'bot' ? 'Agent' : 'You'}</div>
              <div className="bubble">
                {msg.role === 'bot' ? <InkText text={msg.content} animate={!!msg.fresh} /> : msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot chat-typing">
              <div className="msg-label">Agent</div>
              <div className="bubble">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && !loading && (
          <div id="chat-suggest">
            {SUGGESTIONS.map((q) => (
              <button key={q} className="wipe" onClick={() => send(q)} tabIndex={open ? 0 : -1}>{q}</button>
            ))}
          </div>
        )}

        <div id="chat-bottom">
          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            placeholder="Ask about my work"
            maxLength={200}
            autoComplete="off"
            value={input}
            tabIndex={open ? 0 : -1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button id="chat-send" onClick={() => send()} disabled={loading || !input.trim()} tabIndex={open ? 0 : -1} aria-label="Send">Send</button>
        </div>
      </div>

      {showBadge && !open && (
        <div id="chat-teaser" className="invert">
          <button aria-label="Dismiss" onClick={() => setShowBadge(false)}>×</button>
          <p>Hiring, or just curious? My agent answers questions about my work in seconds.</p>
        </div>
      )}

      <button id="chat-toggle" aria-label="Open chat assistant" onClick={togglePanel} className={`cell wipe ${open ? 'is-open' : ''}`} data-cursor="hover">
        <span>{open ? 'Close' : <>Ask<span className="ct-label-long"> my</span> agent</>}</span>
        <span className="ch-dot" />
      </button>
    </div>
  )
}
