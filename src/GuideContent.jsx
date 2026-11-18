import { useEffect, useState } from 'react'
import { BookOpen, ChevronDown, CirclePlay, Music2, ScrollText } from 'lucide-react'
import { isCongregationStudy, loadMeeting, meetingImage, readLocal, referenceRequest, teachingReference } from './meetingData'

function useReference(reference, open) {
  const [type, value] = referenceRequest(reference)
  const key = 'meeting:reference:' + (type === 'document' ? 'v4:' : 'v2:') + reference.url
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

function ReferenceBody({ reference, open, compact, study }) {
  const { type, content, error, retry } = useReference(reference, open)
  if (error) return <div className="mp-reference-error">
    <span>{type === 'video' && navigator.onLine === false ? 'El video requiere conexión a internet.'
      : 'No se pudo cargar ' + (type === 'verse' ? 'el texto bíblico.' : 'este contenido.')}</span>
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

  if (study && content.blocks?.length) return <StudyContent content={content} {...study} />

  return <div className={'mp-publication' + (compact ? ' mp-publication-compact' : '')}>
    {content.title && <h5>{content.title}</h5>}
    {content.themeScriptures?.length > 0 && <section className="mp-song-theme" aria-label="Texto bíblico de la canción">
      <h5>Texto bíblico de la canción</h5>
      {content.themeScriptures.map(scripture => <GuideReference key={scripture.url} reference={scripture} initiallyOpen compact />)}
    </section>}
    {content.stanzas?.length > 0
      ? <div className="mp-lyrics">{content.stanzas.map((stanza, index) => <section key={index}>
        {stanza.map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}
      </section>)}</div>
      : content.paragraphs?.map((line, index) => <p key={index}>{line}</p>)}

  </div>
}

export function GuideReference({ reference, initiallyOpen = false, compact = false, study }) {
  const [open, setOpen] = useState(initiallyOpen)
  const [type] = referenceRequest(reference)
  const Icon = type === 'verse' ? BookOpen : type === 'video' ? CirclePlay : /^Canción\b/i.test(reference.label) ? Music2 : ScrollText

  return (
    <details className={'mp-reference mp-reference-' + type} open={open} onToggle={event => setOpen(event.currentTarget.open)}>
      <summary><Icon size={17} /><span>{reference.label}</span><ChevronDown size={16} /></summary>
      {open && <ReferenceBody reference={reference} open={open} compact={compact} study={study} />}
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
      if (run.reference && !featured?.has(run.reference.url)) {
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

function StudyContent({ content, answers, onAnswerChange }) {
  return (
    <div className="mp-study-content">
      <div className="mp-study-heading">
        {content.context && <span>{content.context}</span>}
        <h4>{content.title}</h4>
      </div>
      {content.blocks.map((block, index) => {
        if (block.kind === 'heading') return <h5 className="mp-study-subheading" key={index}>{block.text}</h5>
        if (block.kind === 'image') return <figure className="mp-study-image" key={index}>
          <GuideImage image={block} />
          {(block.caption || block.alt) && <figcaption>{block.caption || block.alt}</figcaption>}
        </figure>

        return <div className={block.questions?.length ? 'mp-study-question' : block.kind === 'quote' ? 'mp-study-quote' : 'mp-study-paragraph'} key={index}>
          <Paragraph block={block} />
          {block.questions?.map(question => <label className="mp-study-answer" key={question.id}>
            {block.questions.length > 1 && <span>{question.label}</span>}
            <span>Mi respuesta</span>
            <textarea rows={3} aria-label={'Mi respuesta a ' + question.label} value={answers?.[question.id] || ''}
              onChange={event => onAnswerChange(question.id, event.target.value)} />
          </label>)}
        </div>
      })}
    </div>
  )
}

export default function GuideContent({ part, answers, onAnswerChange }) {
  const refs = Array.from(new Map((part.links || []).map(ref => [ref.url, ref])).values())
  const lesson = teachingReference(part)
  const study = isCongregationStudy(part)
  const featured = study ? refs.filter(ref => referenceRequest(ref)[0] === 'document')
    : (part.kind === 'song' ? [refs[0]] : [lesson]).filter(Boolean)
  const featuredUrls = new Set(featured.map(ref => ref.url))
  const inline = new Set((part.blocks || []).flatMap(block => block.runs.flatMap(run => run.reference ? [run.reference.url] : [])))
  const more = refs.filter(ref => !featuredUrls.has(ref.url) && !inline.has(ref.url))
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
      ? <div className="mp-guide-copy">{part.blocks.map((block, index) => <Paragraph block={block} featured={featuredUrls} key={index} />)}</div>
      : part.details?.length > 0 && <div className="mp-guide-copy">{part.details.map((line, index) => <p key={index}>{line}</p>)}</div>}
    {featured.length > 0 && <div className="mp-guide-feature">
      {lesson && <h4>Punto de enseñanza</h4>}
      {featured.map(reference => <GuideReference key={reference.url} reference={reference} initiallyOpen
        study={study ? { answers, onAnswerChange } : undefined} />)}
    </div>}
    {more.length > 0 && <div className="mp-reference-list">{more.map(reference => <GuideReference reference={reference} key={reference.url} />)}</div>}
    {part.images?.length > 0 && <div className="mp-guide-gallery">{part.images.map(image => <figure key={image.url}>
      <GuideImage image={image} />
      {image.alt && <figcaption>{image.alt}</figcaption>}
    </figure>)}</div>}
  </div>
}

function GuideImage({ image }) {
  const [src, setSrc] = useState(() => meetingImage(image.url))
  return <img src={src} alt={image.alt} loading="lazy" onError={() => {
    if (src !== image.url) setSrc(image.url)
  }} />
}

function ClockBadge({ minutes }) {
  return <span className="mp-minutes-badge"><strong>{minutes}</strong><span>min</span></span>
}
