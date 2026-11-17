import { useEffect, useState } from 'react'
import { BookOpen, ChevronDown, CirclePlay, Music2, ScrollText } from 'lucide-react'
import { loadMeeting, readLocal } from './meetingData'

function referenceRequest(reference) {
  const url = new URL(reference.url)
  const video = url.searchParams.get('lank')
  if (reference.bible || url.pathname.includes('/wol/bc/')) return ['verse', url.pathname]
  if (video) return ['video', video]
  return ['document', url.pathname]
}

function useReference(reference, open) {
  const [type, value] = referenceRequest(reference)
  const key = 'meeting:reference:v2:' + reference.url
  const [content, setContent] = useState(() => readLocal(key, null))
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!open || content) return
    const request = new AbortController()
    loadMeeting({ [type]: value }, request.signal).then(result => {
      if (request.signal.aborted) return
      setContent(result)
      if (type !== 'video') {
        try { localStorage.setItem(key, JSON.stringify(result)) } catch {}
      }
    }).catch(() => { if (!request.signal.aborted) setError(true) })
    return () => request.abort()
  }, [open, content, type, value, key, attempt])

  return { type, content, error, retry: () => { setError(false); setAttempt(count => count + 1) } }
}

function ReferenceBody({ reference, open, compact }) {
  const { type, content, error, retry } = useReference(reference, open)
  if (error) return <div className="mp-reference-error">
    <span>No se pudo cargar {type === 'verse' ? 'el texto bíblico' : 'este contenido'}.</span>
    <button type="button" onClick={retry}>Reintentar</button>
  </div>
  if (!content) return <p className="mp-reference-loading" role="status">Cargando {reference.label}…</p>

  if (type === 'verse') return <div className="mp-bible">
    {content.map((verse, index) => <p key={verse.number + '-' + index}><sup>{verse.number}</sup> {verse.text}</p>)}
  </div>

  if (type === 'video') return <div className="mp-media">
    <strong>{content.title}</strong>
    <video controls preload="none" src={content.video} aria-label={content.title} />
  </div>

  return <div className={'mp-publication' + (compact ? ' mp-publication-compact' : '')}>
    {content.title && <h5>{content.title}</h5>}
    {content.stanzas?.length > 0
      ? <div className="mp-lyrics">{content.stanzas.map((stanza, index) => <section key={index}>
        {stanza.map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}
      </section>)}</div>
      : content.paragraphs?.map((line, index) => <p key={index}>{line}</p>)}

  </div>
}

export function GuideReference({ reference, initiallyOpen = false, compact = false }) {
  const [open, setOpen] = useState(initiallyOpen)
  const [type] = referenceRequest(reference)
  const Icon = type === 'verse' ? BookOpen : type === 'video' ? CirclePlay : /^Canción\b/i.test(reference.label) ? Music2 : ScrollText

  return (
    <details className={'mp-reference mp-reference-' + type} open={open} onToggle={event => setOpen(event.currentTarget.open)}>
      <summary><Icon size={17} /><span>{reference.label}</span><ChevronDown size={16} /></summary>
      {open && <ReferenceBody reference={reference} open={open} compact={compact} />}
    </details>
  )
}

export function OutlineVerse({ reference }) {
  return <blockquote className="mp-verse">
    <strong>{reference.label}</strong>
    <ReferenceBody reference={reference} open compact />
  </blockquote>
}

function Paragraph({ block, featured }) {
  const [open, setOpen] = useState({})
  const refs = block.runs.flatMap((run, index) => run.reference && open[index] ? [{ reference: run.reference, index }] : [])
  return <div className={block.list ? 'mp-guide-question' : 'mp-guide-paragraph'}>
    <p>{block.runs.map((run, index) => {
      if (run.reference && run.reference.url !== featured) {
        return <button className="mp-cite" type="button" aria-expanded={Boolean(open[index])} key={index} onClick={() => setOpen({ ...open, [index]: !open[index] })}>
          {run.text.trim()} <ChevronDown size={12} />
        </button>
      }
      if (run.style === 'bold') return <strong key={index}>{run.text}</strong>
      if (run.style === 'italic') return <em key={index}>{run.text}</em>
      return <span key={index}>{run.text}</span>
    })}</p>
    {refs.map(({ reference, index }) => <div className="mp-inline-reference" key={index}>
      <strong>{reference.label}</strong>
      <ReferenceBody reference={reference} open compact />
    </div>)}
  </div>
}

export default function GuideContent({ part }) {
  const refs = Array.from(new Map((part.links || []).map(ref => [ref.url, ref])).values())
  const lesson = refs.find(ref => /\blección\b/i.test(ref.label))
  const single = part.kind === 'song' || /^Estudio bíblico de la congregación$/i.test(part.title)
  const featured = single ? refs[0] : lesson
  const inline = new Set((part.blocks || []).flatMap(block => block.runs.flatMap(run => run.reference ? [run.reference.url] : [])))
  const more = refs.filter(ref => ref.url !== featured?.url && !inline.has(ref.url))
  const opening = part.kind === 'opening'
  const closing = part.kind === 'closing'

  if (!(opening || closing || part.details?.length || refs.length || part.images?.length)) {
    return <p className="mp-empty-detail">Esta parte se añadió al programa. Puedes preparar sus indicaciones en la pestaña Preparación.</p>
  }
  return <div className="mp-guide">
    {(opening || closing) && <div className="mp-presider-note">
      <ClockBadge minutes={part.minutes} />
      <div>
        <h4>{closing ? 'Cierre de la reunión' : 'Introducción al programa'}</h4>
        <p>{closing ? 'Incluye los anuncios y recordatorios en estos 3 minutos.' : 'Destaca los puntos del programa que más beneficiarán a la congregación.'}</p>
      </div>
    </div>}
    {part.blocks?.length > 0
      ? <div className="mp-guide-copy">{part.blocks.map((block, index) => <Paragraph block={block} featured={featured?.url} key={index} />)}</div>
      : part.details?.length > 0 && <div className="mp-guide-copy">{part.details.map((line, index) => <p key={index}>{line}</p>)}</div>}
    {featured && <div className="mp-guide-feature">
      {lesson && <h4>Punto de enseñanza</h4>}
      <GuideReference reference={featured} initiallyOpen />
    </div>}
    {more.length > 0 && <div className="mp-reference-list">{more.map(reference => <GuideReference reference={reference} key={reference.url} />)}</div>}
    {part.images?.length > 0 && <div className="mp-guide-gallery">{part.images.map(image => <figure key={image.url}>
      <img src={image.url} alt={image.alt} loading="lazy" />
      {image.alt && <figcaption>{image.alt}</figcaption>}
    </figure>)}</div>}
  </div>
}

function ClockBadge({ minutes }) {
  return <span className="mp-minutes-badge"><strong>{minutes}</strong><span>min</span></span>
}
