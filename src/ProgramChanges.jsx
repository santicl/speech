import { useState } from 'react'
import { BookOpen, Check, CornerDownRight, RotateCcw, UserRound } from 'lucide-react'
import { hasAssignee, isCongregationStudy } from './meetingData'

export default function ProgramChanges({ part, entry, group, onSave, onMove, onRestore, onOmit, onOutline }) {
  const { candidates, canMoveToStart, omitted, moved } = group
  const [view, setView] = useState('')
  const [after, setAfter] = useState('')
  const study = isCongregationStudy(part)

  return <section className="mp-changes" aria-label={'Cambios para ' + part.title}>
    <div className="mp-actions">
      {hasAssignee(part) && <button type="button" aria-pressed={view === 'replace'} onClick={() => setView(view === 'replace' ? '' : 'replace')}>
        <UserRound size={16} /> Reemplazar
      </button>}
      {Boolean(candidates.length || canMoveToStart) && <button type="button" aria-pressed={view === 'move'} onClick={() => setView(view === 'move' ? '' : 'move')}>
        <CornerDownRight size={16} /> Mover
      </button>}
      <button type="button" onClick={onOmit}>{omitted ? 'Volver a incluir' : 'Omitir parte'}</button>
      {moved && <button type="button" onClick={onRestore}><RotateCcw size={15} /> Restaurar posición</button>}
      {onOutline && <button type="button" className="mp-primary" onClick={onOutline}><BookOpen size={16} /> Abrir mi bosquejo</button>}
    </div>
    {view === 'replace' && <form className="mp-change-form" onSubmit={event => {
      event.preventDefault()
      const form = new FormData(event.currentTarget)
      onSave({ person: form.get('person').trim(), ...(form.has('helper') ? { helper: form.get('helper').trim() } : {}) })
    }}>
      <div className="mp-grid">
        <label>{study ? 'Encargado del estudio' : 'Persona asignada'}
          <input name="person" defaultValue={entry.person || ''} autoComplete="off" maxLength={120} />
        </label>
        {part.kind !== 'prayer' && <label>{study ? 'Lector' : 'Ayudante o segundo participante'}
          <input name="helper" defaultValue={entry.helper || ''} autoComplete="off" maxLength={120} />
        </label>}
      </div>
      <button type="submit" className="mp-primary"><Check size={16} /> Guardar reemplazo</button>
    </form>}
    {view === 'move' && <form className="mp-change-form" onSubmit={event => {
      event.preventDefault()
      if (after) onMove(after === 'inicio' ? null : after)
    }}>
      <label>Nueva posición
        <select value={after} onChange={event => setAfter(event.target.value)} required>
          <option value="">Elige dónde presentar esta parte</option>
          {canMoveToStart && <option value="inicio">Al principio del programa</option>}
          {candidates.map(candidate => <option key={candidate.id} value={candidate.id}>Después de {candidate.title}</option>)}
        </select>
      </label>
      <button type="submit" className="mp-primary" disabled={!after}><Check size={16} /> Guardar posición</button>
    </form>}
  </section>
}
