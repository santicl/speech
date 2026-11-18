import { useEffect, useRef, useState } from 'react'
import { CircleCheck, Download } from 'lucide-react'
import { downloadWeek, offlineStatus } from './meetingOffline'

export default function OfflineWeek({ guide, onStatus, buttonRef }) {
  const [saved, setSaved] = useState(null)
  const [checkedGuide, setCheckedGuide] = useState(null)
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')
  const download = useRef(null)
  const downloading = Boolean(progress)

  useEffect(() => {
    if (downloading) return
    let mounted = true
    function markChecked(status) {
      if (!mounted || download.current) return
      setSaved(status)
      setCheckedGuide(guide)
    }
    offlineStatus(guide).then(markChecked).catch(() => markChecked(null))
    return () => { mounted = false }
  }, [downloading, guide])

  useEffect(() => () => { download.current?.abort() }, [])

  async function saveWeek() {
    if (download.current) return
    const request = new AbortController()
    download.current = request
    setError('')
    setProgress({ done: 0, total: 0 })
    try {
      const result = await downloadWeek(guide, request.signal, (done, total) => {
        if (!request.signal.aborted) setProgress({ done, total })
      })
      if (!request.signal.aborted) {
        setSaved(result)
        setCheckedGuide(guide)
      }
    } catch (error) {
      if (!request.signal.aborted) setError(error.name === 'QuotaExceededError' ? 'El navegador no tiene espacio para guardar la semana.' : error.message)
    } finally {
      download.current = null
      if (!request.signal.aborted) setProgress(null)
    }
  }

  const current = checkedGuide === guide ? saved : null
  const failures = current?.failures || []
  const complete = current && !failures.length
  const status = progress ? 'downloading' : checkedGuide !== guide ? 'checking' : complete ? 'ready' : failures.length ? 'partial' : 'pending'
  useEffect(() => { onStatus?.(status) }, [onStatus, status])

  if (!guide) return null
  return <div className="mp-offline-status">
    <button ref={buttonRef} type="button" className="mp-offline-button" disabled={!!progress} onClick={saveWeek}>
      {complete ? <CircleCheck size={17} /> : <Download size={17} />}
      {progress ? 'Descargando semana…' : complete ? 'Actualizar descarga' : failures.length ? 'Reintentar descarga' : 'Descargar semana'}
    </button>
    {progress && <progress aria-label="Descarga de la semana" max={progress.total || undefined} value={progress.total ? progress.done : undefined} />}
    {complete && !progress && <span className="mp-offline-message" role="status">Semana lista sin conexión</span>}
    {failures.length > 0 && !progress && <details className="mp-offline-errors">
      <summary>Descarga parcial · {failures.length} pendientes</summary>
      <ul>{failures.map(label => <li key={label}>{label}</li>)}</ul>
    </details>}
    {error && <p className="mp-offline-message" role="alert">{error}</p>}
  </div>
}
