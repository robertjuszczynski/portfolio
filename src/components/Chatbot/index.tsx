import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useMotion } from '../../context/motion'
import { cx } from '../../lib/cx'
import './Chatbot.scss'

interface Message {
  id: number
  role: 'user' | 'bot'
  content: string
  sig?: string
  fresh?: boolean
}

interface ChatResponse {
  message?: unknown
  sig?: unknown
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
const GREETING = "I'm Robert's agent. I know his stack, his projects and whether he's free. Ask. I answer in seconds and skip the small talk."
const ERROR_REPLY = 'Something went wrong. Please try again or message Robert on LinkedIn.'

let nextId = 1

async function askAgent(history: Message[]): Promise<{ content: string; sig?: string }> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: history.map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content, sig: m.sig })),
      }),
    })
    const data = (await res.json()) as ChatResponse
    const content = typeof data.message === 'string' ? data.message : ERROR_REPLY
    const sig = res.ok && typeof data.sig === 'string' ? data.sig : undefined
    return { content, sig }
  } catch {
    return { content: ERROR_REPLY }
  }
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: 'bot', content: GREETING }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const show = window.setTimeout(() => setShowTeaser(true), 4000)
    const hide = window.setTimeout(() => setShowTeaser(false), 14000)
    return () => {
      window.clearTimeout(show)
      window.clearTimeout(hide)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const focus = window.setTimeout(() => inputRef.current?.focus(), 350)
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(focus)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    const observer = new MutationObserver(() => {
      el.scrollTop = el.scrollHeight
    })
    observer.observe(el, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  function togglePanel() {
    setShowTeaser(false)
    setOpen((prev) => !prev)
  }

  async function send(text = input) {
    const question = text.trim()
    if (!question || loading) return

    const userMessage: Message = { id: nextId++, role: 'user', content: question }
    const history = [...messages, userMessage]
    setInput('')
    setMessages(history)
    setLoading(true)

    const reply = await askAgent(history)
    setMessages((prev) => [...prev, { id: nextId++, role: 'bot', content: reply.content, sig: reply.sig, fresh: true }])
    setLoading(false)
    inputRef.current?.focus()
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void send()
    }
  }

  return (
    <div id="chat-widget">
      <div id="chat-panel" className={cx(open && 'open')} role="region" aria-label="Chat with Robert's agent" inert={!open}>
        <div id="chat-messages" ref={messagesRef} aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={cx('chat-msg', msg.role)}>
              <div className="msg-label">{msg.role === 'bot' ? 'Agent' : 'You'}</div>
              <div className="bubble">
                {msg.role === 'bot' ? <InkText text={msg.content} animate={!!msg.fresh} /> : msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot chat-typing" aria-label="Agent is typing">
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
              <button key={q} type="button" className="wipe" onClick={() => void send(q)}>{q}</button>
            ))}
          </div>
        )}

        <div id="chat-bottom">
          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            aria-label="Your question"
            placeholder="Ask about my work"
            maxLength={200}
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button id="chat-send" type="button" onClick={() => void send()} disabled={loading || !input.trim()}>Send</button>
        </div>
      </div>

      {showTeaser && !open && (
        <div id="chat-teaser" className="invert">
          <button type="button" aria-label="Dismiss" onClick={() => setShowTeaser(false)}>×</button>
          <p>Hiring, or just curious? My agent answers questions about my work in seconds.</p>
        </div>
      )}

      <button
        id="chat-toggle"
        type="button"
        className={cx('cell wipe', open && 'is-open')}
        onClick={togglePanel}
        aria-expanded={open}
        aria-controls="chat-panel"
        data-cursor="hover"
      >
        <span>{open ? 'Close' : <>Ask<span className="ct-label-long"> my</span> agent</>}</span>
        <span className="ch-dot" aria-hidden="true" />
      </button>
    </div>
  )
}
