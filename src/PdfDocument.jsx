import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { pdfWorkerUrl } from './pdfRuntime'
import { readPdf } from './meetingAttachments'

GlobalWorkerOptions.workerSrc = pdfWorkerUrl

export default function PdfDocument({ pdf }) {
  const [document, setDocument] = useState(null)
  const [page, setPage] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [width, setWidth] = useState(600)
  const [error, setError] = useState('')
  const [rendering, setRendering] = useState(false)
  const canvas = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    let active = true
    let task
    readPdf(pdf.id).then(blob => blob.arrayBuffer()).then(data => {
      if (!active) return
      task = getDocument({ data, isEvalSupported: false })
      return task.promise
    }).then(doc => { if (active && doc) setDocument(doc) }).catch(error => {
      if (active) setError(error.name === 'PasswordException'
        ? 'El PDF está protegido con contraseña. Adjunta una copia que puedas abrir sin contraseña.'
        : error.message || 'No se pudo abrir este PDF.')
    })
    return () => { active = false; task?.destroy() }
  }, [pdf.id])

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(1, entry.contentRect.width - 24)))
    observer.observe(container.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!document) return
    let active = true
    let drawing
    setRendering(true)
    document.getPage(page).then(sheet => {
      if (!active) return
      const original = sheet.getViewport({ scale: 1 })
      const viewport = sheet.getViewport({ scale: Math.min(width / original.width, 2) * zoom })
      const density = Math.min(window.devicePixelRatio || 1, 2)
      const target = window.document.createElement('canvas')
      target.setAttribute('role', 'img')
      target.setAttribute('aria-label', 'Página ' + page + ' de ' + pdf.name)
      target.width = Math.floor(viewport.width * density)
      target.height = Math.floor(viewport.height * density)
      target.style.width = viewport.width + 'px'
      target.style.height = viewport.height + 'px'
      drawing = sheet.render({ canvasContext: target.getContext('2d'), viewport, transform: [density, 0, 0, density, 0, 0] })
      return drawing.promise.then(() => { if (active) canvas.current.replaceChildren(target) })
    }).then(() => { if (active) setRendering(false) }).catch(error => {
      if (active && error.name !== 'RenderingCancelledException') {
        setRendering(false)
        setError('No se pudo mostrar esta página del PDF.')
      }
    })
    return () => { active = false; drawing?.cancel() }
  }, [document, page, width, zoom, pdf.name])

  return <div ref={container} className="mp-pdf-document" aria-label={'Visor PDF · ' + pdf.name}>
    {document && <div className="mp-pdf-toolbar" role="group" aria-label="Controles del PDF">
      <button type="button" className="mp-icon" aria-label="Página anterior del PDF" disabled={page === 1} onClick={() => setPage(value => value - 1)}><ArrowLeft size={16} /></button>
      <span>Página {page} de {document.numPages}</span>
      <button type="button" className="mp-icon" aria-label="Página siguiente del PDF" disabled={page === document.numPages} onClick={() => setPage(value => value + 1)}><ArrowRight size={16} /></button>
      <button type="button" className="mp-icon" aria-label="Reducir PDF" disabled={zoom <= .5} onClick={() => setZoom(value => value - .25)}><Minus size={16} /></button>
      <span>{Math.round(zoom * 100)} %</span>
      <button type="button" className="mp-icon" aria-label="Ampliar PDF" disabled={zoom >= 2} onClick={() => setZoom(value => value + .25)}><Plus size={16} /></button>
    </div>}
    {error && <p role="alert">{error}</p>}
    {!error && (!document || rendering) && <p role="status">Cargando página…</p>}
    <div className="mp-pdf-pages"><div ref={canvas} /></div>
  </div>
}
