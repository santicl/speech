export const sections = [
  ['apertura', 'Apertura'],
  ['tesoros', 'Tesoros de la Biblia'],
  ['maestros', 'Seamos Mejores Maestros'],
  ['vida', 'Nuestra Vida Cristiana'],
  ['cierre', 'Cierre'],
]

const api = '/api/meeting'

export function dateKey(date = new Date()) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((value, index) => String(value).padStart(index ? 2 : 4, '0'))
    .join('-')
}

export function shiftDate(value, days) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day + days, 12)
}

export function weekKey(value) {
  const date = shiftDate(value, 0)
  return dateKey(shiftDate(value, -((date.getDay() + 6) % 7)))
}

export function readLocal(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export function meetingUrl(params) {
  return api + '?' + new URLSearchParams(params)
}

export function referenceRequest(reference) {
  const url = new URL(reference.url)
  const video = url.searchParams.get('lank')
  if (reference.bible || url.pathname.includes('/wol/bc/')) return ['verse', url.pathname]
  if (video) return ['video', video]
  return ['document', url.pathname]
}

export function meetingImage(url) {
  const image = new URL(url)
  return image.origin === 'https://wol.jw.org' && image.pathname.startsWith('/es/wol/mp/r4/lp-s/')
    ? meetingUrl({ image: image.pathname }) : url
}

export async function loadMeeting(params, signal) {
  const response = await fetch(meetingUrl(params), { signal })
  const result = await response.json()
  if (!response.ok) throw new Error(result.error)
  return result
}

export function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  return String(minutes).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0')
}

export function orderParts(published, extras) {
  return sections.flatMap(([section]) => {
    const rows = published.filter(part => part.section === section)
    const custom = extras.filter(part => part.section === section)
    return [
      ...custom.filter(part => part.after === ''),
      ...rows.flatMap(part => [part, ...custom.filter(extra => extra.after === part.id)]),
      ...custom.filter(part => part.after && !rows.some(row => row.id === part.after)),
    ]
  })
}

export function prepareParts(parts) {
  return parts.flatMap(part => {
    if (part.custom) return [part]
    const pieces = part.title.split(/\s*[|｜]\s*/)
    const words = pieces.find(title => /^Palabras de (introducción|conclusión)/iu.test(title))
    const song = pieces.find(title => /^Canción\b/iu.test(title))
    const songTitle = song?.replace(/\s+y oración\b/iu, '')
    if (!words) return [song && !part.number
      ? { ...part, title: songTitle, kind: 'song' }
      : { ...part, kind: 'assignment' }]

    const closing = /conclusión/iu.test(words)
    const timed = {
      ...part, title: words, kind: closing ? 'closing' : 'opening', minutes: closing ? 3 : 1,
      links: (part.links || []).filter(link => !/^Canción\b/iu.test(link.label)),
    }
    const prayer = {
      id: part.id + '|oracion', title: closing ? 'Oración final' : 'Oración inicial',
      kind: 'prayer', section: part.section, minutes: 0,
    }
    const songs = song ? [{
      ...part, id: part.id + '|cancion', title: songTitle, kind: 'song', minutes: 0, number: null,
      details: [], blocks: [], links: (part.links || []).filter(link => /^Canción\b/iu.test(link.label)),
    }] : []
    return closing ? [timed, ...songs, prayer] : [...songs, prayer, timed]
  })
}

export function hasAssignee(part) {
  return part.kind === 'assignment' || part.kind === 'prayer' || part.custom
}

export function isCongregationStudy(part) {
  return /^Estudio bíblico de la congregación\b/iu.test(part.title)
}

export function teachingReference(part) {
  return part.links?.find(link => /\blección\b/i.test(link.label))
    || part.links?.find(link => /\bapéndice\b.*\bpunto\b/i.test(link.label))
}

export function presiderPoints(entry, closing) {
  if (Array.isArray(entry?.presiderOutline)) return entry.presiderOutline
  return entry?.notes?.trim()
    ? [{ id: 'previous-notes', kind: closing ? 'other' : 'program', title: 'Mis notas', text: entry.notes }]
    : []
}

export function moveClosingOutlinePoints(data, parts) {
  const opening = parts.find(part => part.kind === 'opening')
  const closing = parts.find(part => part.kind === 'closing')
  if (!opening || !closing) return data
  const entries = data.entries
  const introductory = presiderPoints(entries[opening.id], false)
  const forClosing = point => point.kind !== 'program' && point.id !== 'previous-notes'
  const moved = introductory.filter(forClosing)
  if (!moved.length) return data

  return {
    ...data,
    entries: {
      ...entries,
      [opening.id]: {
        ...entries[opening.id], title: opening.title, notes: '',
        presiderOutline: introductory.filter(point => !forClosing(point)),
      },
      [closing.id]: {
        ...entries[closing.id], title: closing.title, notes: '',
        presiderOutline: [...presiderPoints(entries[closing.id], true), ...moved],
      },
    },
  }
}
