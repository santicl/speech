import { useState } from 'react'
import { FileText, X } from 'lucide-react'
import PdfDocument from './PdfDocument'

export default function PointPdf({ pdf }) {
  const [open, setOpen] = useState(false)
  return <section className="mp-point-pdf" aria-label={'PDF adjunto · ' + pdf.name}>
    <div className="mp-point-pdf-head">
      <FileText size={19} aria-hidden="true" />
      <span><strong>{pdf.name}</strong><small>PDF guardado en este navegador · {pdf.size < 1048576
        ? Math.max(1, Math.round(pdf.size / 1024)) + ' KB'
        : (pdf.size / 1048576).toLocaleString('es-CO', { maximumFractionDigits: 2 }) + ' MB'}</small></span>
      <button type="button" aria-expanded={open} onClick={() => setOpen(value => !value)}>
        {open ? <X size={16} aria-hidden="true" /> : <FileText size={16} aria-hidden="true" />}
        {open ? 'Cerrar PDF' : 'Ver PDF'}
      </button>
    </div>
    {open && <PdfDocument pdf={pdf} />}
  </section>
}
