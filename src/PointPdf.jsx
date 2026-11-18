import { useEffect, useRef, useState } from 'react'
import { FileText, X } from 'lucide-react'
import PdfDocument from './PdfDocument'
import './PdfFullscreen.css'

export default function PointPdf({ pdf }) {
  const [open, setOpen] = useState(false)
  const dialog = useRef(null)
  useEffect(() => {
    if (!open) return
    const element = dialog.current
    const previousOverflow = window.document.body.style.overflow
    window.document.body.style.overflow = 'hidden'
    element.showModal()
    return () => {
      element.close()
      window.document.body.style.overflow = previousOverflow
    }
  }, [open])
  return <section className="mp-point-pdf" aria-label={'PDF adjunto · ' + pdf.name}>
    <div className="mp-point-pdf-head">
      <FileText size={19} aria-hidden="true" />
      <span><strong>{pdf.name}</strong><small>PDF guardado en este navegador · {pdf.size < 1048576
        ? Math.max(1, Math.round(pdf.size / 1024)) + ' KB'
        : (pdf.size / 1048576).toLocaleString('es-CO', { maximumFractionDigits: 2 }) + ' MB'}</small></span>
      <button type="button" aria-expanded={open} onClick={() => setOpen(true)}>
        <FileText size={16} aria-hidden="true" />Ver PDF
      </button>
    </div>
    {open && <dialog ref={dialog} className="mp-pdf-fullscreen" aria-label={'Documento PDF · ' + pdf.name} onCancel={() => setOpen(false)}>
      <header className="mp-pdf-fullscreen-header">
        <span><FileText size={19} aria-hidden="true" /><strong>{pdf.name}</strong></span>
        <button type="button" autoFocus onClick={() => setOpen(false)}><X size={18} aria-hidden="true" />Cerrar PDF</button>
      </header>
      <PdfDocument pdf={pdf} />
    </dialog>}
  </section>
}
