import { elapsedTime, emptyTimer, meetingDuration } from './meetingTiming'

const minute = 60000

export function programOrder(parts, moves = []) {
  const ordered = parts.map(part => ({ ...part, programSection: part.section }))
  for (const { id, after } of moves) {
    const from = ordered.findIndex(part => part.id === id)
    if (from < 0 || id === after) continue
    const target = after === null ? null : ordered.find(part => part.id === after)
    if (after !== null && !target) continue
    const [part] = ordered.splice(from, 1)
    const position = target ? ordered.indexOf(target) + 1 : 0
    ordered.splice(position, 0, { ...part, programSection: target?.programSection || ordered[0]?.programSection || part.section })
  }
  return ordered
}

export function nextProgramPart(parts, session, omitted) {
  const cursor = parts.findIndex(part => part.id === (session.active || session.anchor))
  return parts.slice(cursor + 1).find(part => !omitted[part.id] && !session.presented?.[part.id])
}

function plannedDuration(part) {
  if (part.kind === 'song') return 3 * minute
  if (part.kind === 'prayer') return minute
  return (part.minutes || 0) * minute
}

export function projectedFinish(parts, session, omitted, scheduled, now) {
  const { active, anchor, parts: timers, general, programStartedAt, finishedAt } = session
  const generalStarted = general.started !== null || general.elapsed > 0
  const cursor = parts.findIndex(part => part.id === (active || anchor))
  const firstAction = Math.min(programStartedAt ?? Infinity, session.generalStartedAt ?? Infinity)
  const practice = Number.isFinite(firstAction) && (
    firstAction < scheduled || new Date(firstAction).toDateString() !== new Date(scheduled).toDateString()
  )
  const estimateStart = practice ? firstAction : scheduled
  const deadline = estimateStart + meetingDuration
  if (finishedAt != null) return { end: finishedAt, deadline, actual: true }

  const scheduledTime = parts.reduce((sum, part) => sum + plannedDuration(part), 0)
  const reserve = Math.max(0, meetingDuration - scheduledTime)
  const remaining = parts.reduce((sum, part, index) => {
    if (omitted[part.id] || session.presented?.[part.id] || index < cursor) return sum
    const measured = elapsedTime(timers[part.id] || emptyTimer, now)
    if (index === cursor && part.id !== active) return sum
    return sum + Math.max(0, plannedDuration(part) - measured)
  }, reserve)
  const start = programStartedAt != null || generalStarted ? now : scheduled
  return { end: start + remaining, deadline, actual: false }
}

export function hasPreparedOutline(part, outline) {
  return part.speech && (outline?.intro?.trim() || outline?.close?.trim()
    || part.points?.some(point => outline?.points?.[point.id]?.selected))
}
