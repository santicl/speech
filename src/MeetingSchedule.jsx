import { useRef, useState } from 'react'
import { CalendarClock, Settings, X } from 'lucide-react'
import { scheduledStart } from './meetingTiming'

const startFormat = new Intl.DateTimeFormat('es-CO', { weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true })
const days = [
  [1, 'Lunes'], [2, 'Martes'], [3, 'Miércoles'], [4, 'Jueves'],
  [5, 'Viernes'], [6, 'Sábado'], [0, 'Domingo'],
]

export default function MeetingSchedule({ week, schedule, onSchedule, error }) {
  const dialog = useRef(null)
  const [draft, setDraft] = useState(schedule)

  function openSchedule() {
    setDraft(schedule)
    dialog.current.showModal()
  }

  function closeSchedule() {
    dialog.current.close()
  }

  function saveSchedule(event) {
    event.preventDefault()
    if (!draft.time) return
    onSchedule(draft)
    closeSchedule()
  }

  return (
    <div className="mp-schedule-settings">
      <div className="mp-schedule-heading">
        <span>{startFormat.format(scheduledStart(week, schedule))}</span>
        <button type="button" aria-label="Configurar horario" aria-haspopup="dialog" aria-controls="meeting-schedule" onClick={openSchedule}>
          <Settings size={15} aria-hidden="true" /> Horario
        </button>
      </div>
      <dialog id="meeting-schedule" ref={dialog} className="mp-schedule-dialog"
        aria-labelledby="meeting-schedule-title" aria-describedby="meeting-schedule-help"
        onPointerDown={event => { if (event.target === event.currentTarget) closeSchedule() }}>
        <form className="mp-schedule" onSubmit={saveSchedule}>
          <div className="mp-schedule-top">
            <span className="mp-schedule-symbol"><CalendarClock size={22} aria-hidden="true" /></span>
            <button type="button" className="mp-icon mp-modal-close" aria-label="Cerrar horario" onClick={closeSchedule}><X size={19} /></button>
          </div>
          <h2 id="meeting-schedule-title">Horario de la reunión</h2>
          <p id="meeting-schedule-help">El cronómetro arranca a la hora elegida. Si esa hora ya pasó, calcula cuánto tiempo ha transcurrido y cuánto queda.</p>
          <div className="mp-grid mp-schedule-fields">
            <label>Día de la reunión<select value={draft.day} onChange={event => setDraft({ ...draft, day: Number(event.target.value) })}>
              {days.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select></label>
            <label>Hora de inicio<input type="time" required value={draft.time} onChange={event => setDraft({ ...draft, time: event.target.value })} /></label>
          </div>
          <div className="mp-actions mp-schedule-actions">
            <button type="button" onClick={closeSchedule}>Cancelar</button>
            <button type="submit" className="mp-primary">Guardar horario</button>
          </div>
        </form>
      </dialog>
      {error && <p className="mp-schedule-error" role="alert">El navegador no pudo guardar el horario.</p>}
    </div>
  )
}
