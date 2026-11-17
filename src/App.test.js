import { act, fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'
import { dateKey, shiftDate, weekKey } from './meetingData'

const week = weekKey(dateKey())
const guide = {
  week,
  label: '16-22 DE NOVIEMBRE',
  source: 'https://wol.jw.org/es/wol/d/r4/lp-s/12345',
  parts: [
    {
      id: 'tesoros|1|tema',
      title: 'Tema del discurso',
      number: 1,
      section: 'tesoros',
      minutes: 10,
      speech: true,
      points: [{
        id: 'a',
        text: 'Punto del bosquejo',
        verses: [{ label: 'Lam 2:11', url: 'https://wol.jw.org/es/wol/bc/r4/lp-s/12345/1/0' }],
        support: [],
      }],
    },
    { id: 'maestros|4|conversaciones', title: 'Empecemos conversaciones', number: 4, section: 'maestros', minutes: 3 },
  ],
}

function openSchedule() {
  const dialog = document.getElementById('meeting-schedule')
  if (!dialog.showModal) {
    dialog.showModal = () => dialog.setAttribute('open', '')
    dialog.close = () => dialog.removeAttribute('open')
  }
  fireEvent.click(screen.getByRole('button', { name: 'Configurar horario' }))
  return screen.getByRole('dialog', { name: 'Horario de la reunión' })
}

function changeScheduleTime(time) {
  const dialog = within(openSchedule())
  fireEvent.change(dialog.getByLabelText('Hora de inicio'), { target: { value: time } })
  fireEvent.click(dialog.getByRole('button', { name: 'Guardar horario' }))
}

beforeEach(() => {
  localStorage.clear()
  global.fetch = jest.fn(async url => ({
    ok: true,
    json: async () => url.includes('verse=') ? [{ number: 11, text: 'Texto del versículo.' }] : guide,
  }))
})

test('recupera los asignados, la evaluación, las partes propias y el bosquejo de la semana', async () => {
  const first = render(<App />)
  fireEvent.click(await screen.findByRole('button', { name: /tema del discurso sin asignar/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Preparación' }))
  fireEvent.change(screen.getByLabelText('Persona asignada'), { target: { value: 'Daniel' } })
  fireEvent.click(screen.getByRole('button', { name: 'Bosquejo' }))
  fireEvent.click(screen.getByLabelText('Punto del bosquejo'))
  expect(await screen.findByText(/texto del versículo/i)).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('Mi explicación'), { target: { value: 'Mi comentario preparado' } })

  fireEvent.click(screen.getByRole('button', { name: /empecemos conversaciones sin asignar/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Preparación' }))
  fireEvent.change(screen.getByLabelText('Evaluación y observaciones'), { target: { value: 'Buen uso de preguntas' } })
  fireEvent.click(screen.getByRole('button', { name: 'Añadir parte' }))
  fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Anuncio local' } })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar parte' }))
  first.unmount()

  await act(async () => { render(<App />) })
  fireEvent.click(await screen.findByRole('button', { name: /tema del discurso daniel/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Bosquejo' }))
  fireEvent.click(screen.getByRole('button', { name: 'Vista de lectura' }))
  expect(screen.getByText('Mi comentario preparado')).toBeInTheDocument()
  expect(screen.getByText(/texto del versículo/i)).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /empecemos conversaciones sin asignar/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Preparación' }))
  expect(screen.getByLabelText('Evaluación y observaciones')).toHaveValue('Buen uso de preguntas')
  expect(screen.getByRole('button', { name: /anuncio local sin asignar/i })).toBeInTheDocument()
})

test('permite reasignar una persona cuando cambia el título publicado', async () => {
  localStorage.setItem('meeting:week:' + week, JSON.stringify({
    entries: { 'maestros|4|anterior': { title: 'Título anterior', person: 'Ana' } },
    extras: [],
  }))
  await act(async () => { render(<App />) })
  expect(await screen.findByText('Título anterior · Ana')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /empecemos conversaciones sin asignar/i })).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('Reasignar Título anterior'), { target: { value: guide.parts[1].id } })
  fireEvent.click(screen.getByRole('button', { name: 'Reasignar' }))
  expect(screen.getByRole('button', { name: /empecemos conversaciones ana/i })).toBeInTheDocument()
})

test('mantiene activo un cronómetro por parte y separa el cronómetro general', async () => {
  jest.useFakeTimers()
  jest.setSystemTime(shiftDate(week, 1).setHours(12, 0, 0, 0))
  try {
    await act(async () => { render(<App />) })
    const first = screen.getByRole('button', { name: 'Iniciar Tema del discurso' })
    fireEvent.click(within(screen.getByRole('complementary')).getByRole('button', { name: 'Iniciar' }))
    fireEvent.click(first)
    act(() => jest.advanceTimersByTime(2000))
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Empecemos conversaciones' }))
    act(() => jest.advanceTimersByTime(1000))
    expect(within(screen.getByRole('complementary')).getByText('00:03')).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('00:02')).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Seamos Mejores Maestros' })).getByText('00:01')).toBeInTheDocument()
  } finally {
    jest.useRealTimers()
  }
})

test('separa las canciones de las partes del presidente y asigna sus tiempos', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      ...guide,
      parts: [
        { id: 'open', title: 'Canción 28 y oración | Palabras de introducción', section: 'apertura', minutes: 8 },
        ...guide.parts,
        { id: 'close', title: 'Palabras de conclusión | Canción 75 y oración', section: 'cierre', minutes: 5 },
      ],
    }),
  })
  await act(async () => { render(<App />) })
  const open = screen.getByRole('region', { name: 'Apertura' })
  expect(within(open).getAllByRole('button').slice(0, 2).map(button => button.textContent)).toEqual([
    'Canción 28 y oración', 'Palabras de introducción',
  ])
  expect(within(open).getByText('1 minuto')).toBeInTheDocument()
  expect(within(open).queryByText('Sin asignar')).not.toBeInTheDocument()
  expect(within(open).queryByRole('button', { name: /iniciar canción/i })).not.toBeInTheDocument()
  const close = screen.getByRole('region', { name: 'Cierre' })
  expect(within(close).getByText('3 minutos')).toBeInTheDocument()
  fireEvent.click(within(close).getByRole('button', { name: 'Palabras de conclusión' }))
  fireEvent.click(within(close).getByRole('button', { name: 'Guía' }))
  expect(within(close).getByText(/incluye los anuncios y recordatorios/i)).toBeInTheDocument()
  fireEvent.click(within(close).getByRole('button', { name: 'Bosquejo' }))
  expect(within(close).queryByLabelText('Persona asignada')).not.toBeInTheDocument()
  expect(within(close).getByRole('button', { name: 'Añadir punto' })).toBeInTheDocument()
})

test('abre el contenido de una cita dentro de su párrafo', async () => {
  const reference = { label: 'Lam 2:11', bible: true, url: 'https://wol.jw.org/es/wol/bc/r4/lp-s/12345/1/0' }
  const firstPart = {
    ...guide.parts[0],
    details: ['Consulta Lam 2:11.'],
    links: [reference],
    blocks: [{ runs: [{ text: 'Consulta ' }, { text: reference.label, reference }, { text: '.' }] }],
  }
  global.fetch.mockImplementation(async url => ({
    ok: true,
    json: async () => url.includes('verse=') ? [{ number: 11, text: 'Texto del versículo.' }] : { ...guide, parts: [firstPart] },
  }))
  await act(async () => { render(<App />) })
  fireEvent.click(screen.getByRole('button', { name: /tema del discurso sin asignar/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Lam 2:11' }))
  expect(await screen.findByText(/texto del versículo/i)).toBeInTheDocument()
  expect(screen.queryByRole('link', { name: 'Lam 2:11' })).not.toBeInTheDocument()
})

test('arranca el miércoles a las 19:00 y avisa cuando faltan diez minutos', async () => {
  jest.useFakeTimers()
  const start = shiftDate(week, 2).setHours(19, 0, 0, 0)
  jest.setSystemTime(start - 1000)
  try {
    const consolePanel = () => within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    let first
    await act(async () => { first = render(<App />) })
    expect(consolePanel().getByRole('button', { name: 'Iniciar' })).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(1000))
    expect(consolePanel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()

    jest.setSystemTime(start + 95 * 60 * 1000 - 250)
    act(() => jest.advanceTimersByTime(250))
    expect(consolePanel().getByText('01:35:00')).toBeInTheDocument()
    expect(consolePanel().getByText(/Quedan 10 minutos/)).toBeInTheDocument()
    fireEvent.click(consolePanel().getByRole('button', { name: 'Entendido' }))

    first.unmount()
    await act(async () => { render(<App />) })
    expect(consolePanel().getByText('01:35:00')).toBeInTheDocument()
    expect(consolePanel().queryByText(/Quedan 10 minutos/)).not.toBeInTheDocument()

    jest.setSystemTime(start + 105 * 60 * 1000 - 250)
    act(() => jest.advanceTimersByTime(250))
    expect(consolePanel().getByText('01:45:00')).toBeInTheDocument()
    expect(consolePanel().getByText(/Tiempo previsto cumplido/)).toBeInTheDocument()
    expect(consolePanel().getByRole('button', { name: 'Continuar' })).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(5000))
    expect(consolePanel().getByText('01:45:00')).toBeInTheDocument()
    fireEvent.click(consolePanel().getByRole('button', { name: 'Continuar' }))
    act(() => jest.advanceTimersByTime(1000))
    expect(consolePanel().getByText('01:45:01')).toBeInTheDocument()
  } finally {
    jest.useRealTimers()
  }
})

test('guarda el horario y recupera el tiempo general y por parte después de una recarga', async () => {
  jest.useFakeTimers()
  const startsAt = shiftDate(week, 3).setHours(18, 30, 0, 0)
  jest.setSystemTime(startsAt + 5 * 60 * 1000)
  try {
    const panel = () => within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    let first
    await act(async () => { first = render(<App />) })
    expect(panel().getByRole('button', { name: 'Iniciar' })).toBeInTheDocument()
    expect(panel().queryByRole('button', { name: 'Configurar horario' })).not.toBeInTheDocument()
    openSchedule()
    expect(screen.getByLabelText('Día de la reunión')).toHaveValue('3')
    expect(screen.getByLabelText('Hora de inicio')).toHaveValue('19:00')
    fireEvent.change(screen.getByLabelText('Día de la reunión'), { target: { value: '4' } })
    fireEvent.change(screen.getByLabelText('Hora de inicio'), { target: { value: '18:30' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar horario' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(panel().getByText('05:00')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Tema del discurso' }))
    act(() => jest.advanceTimersByTime(6000))
    fireEvent.click(panel().getByRole('button', { name: 'Pausar' }))
    first.unmount()
    jest.setSystemTime(startsAt + 5 * 60 * 1000 + 10000)
    await act(async () => { render(<App />) })

    expect(panel().getByText('05:06')).toBeInTheDocument()
    expect(panel().getByRole('button', { name: 'Continuar' })).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('00:10')).toBeInTheDocument()
    openSchedule()
    expect(screen.getByLabelText('Día de la reunión')).toHaveValue('4')
    expect(screen.getByLabelText('Hora de inicio')).toHaveValue('18:30')
  } finally {
    jest.useRealTimers()
  }
})

test('reprograma el arranque después de pausar o volver a cambiar el horario', async () => {
  jest.useFakeTimers()
  const start = shiftDate(week, 2).setHours(19, 0, 0, 0)
  jest.setSystemTime(start)
  try {
    const panel = () => within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    const advance = milliseconds => act(() => jest.advanceTimersByTime(milliseconds))
    let first
    await act(async () => { first = render(<App />) })
    expect(panel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Tema del discurso' }))
    advance(60000)
    fireEvent.click(screen.getByRole('button', { name: 'Pausar Tema del discurso' }))
    fireEvent.click(panel().getByRole('button', { name: 'Pausar' }))

    changeScheduleTime('19:02')
    expect(panel().getByText('00:00')).toBeInTheDocument()
    advance(30000)
    changeScheduleTime('19:03')
    advance(30000)
    expect(panel().getByRole('button', { name: 'Iniciar' })).toBeInTheDocument()
    advance(60000)
    expect(panel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()
    advance(60000)
    expect(panel().getByText('01:00')).toBeInTheDocument()

    changeScheduleTime('19:05')
    first.unmount()
    await act(async () => { render(<App />) })
    expect(panel().getByRole('button', { name: 'Iniciar' })).toBeInTheDocument()
    advance(60000)
    expect(panel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()
    advance(5000)
    expect(panel().getByText('00:05')).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('01:00')).toBeInTheDocument()
    changeScheduleTime('19:05')
    expect(panel().getByText('00:05')).toBeInTheDocument()
  } finally {
    jest.useRealTimers()
  }
})

test('recalcula el tiempo y el aviso cuando el inicio se cambia a una hora anterior', async () => {
  jest.useFakeTimers()
  const sixPm = shiftDate(week, 2).setHours(18, 0, 0, 0)
  jest.setSystemTime(sixPm)
  localStorage.setItem('meeting:schedule', JSON.stringify({ day: 3, time: '18:00' }))
  try {
    const panel = () => within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    let first
    await act(async () => { first = render(<App />) })
    expect(panel().getByText('00:00')).toBeInTheDocument()

    changeScheduleTime('17:00')
    expect(panel().getByText('01:00:00')).toBeInTheDocument()
    expect(panel().getByText('45:00 restantes')).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(250))
    expect(panel().getByText('45:00 restantes')).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(4750))
    expect(panel().getByText('01:00:05')).toBeInTheDocument()
    expect(panel().getByText('44:55 restantes')).toBeInTheDocument()
    expect(panel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()

    fireEvent.click(panel().getByRole('button', { name: 'Pausar' }))
    act(() => jest.advanceTimersByTime(5000))
    expect(panel().getByText('01:00:05')).toBeInTheDocument()
    fireEvent.click(panel().getByRole('button', { name: 'Reiniciar cronómetro general' }))
    expect(panel().getByText('01:00:10')).toBeInTheDocument()
    expect(panel().getByText('44:50 restantes')).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(1000))
    expect(panel().getByText('01:00:11')).toBeInTheDocument()
    expect(panel().getByText('44:49 restantes')).toBeInTheDocument()

    changeScheduleTime('16:20')
    expect(panel().getByText('04:49 restantes')).toBeInTheDocument()
    expect(panel().getByText(/Quedan 10 minutos/)).toBeInTheDocument()

    changeScheduleTime('16:00')
    expect(panel().getByText('01:45:00')).toBeInTheDocument()
    expect(panel().getByText('Tiempo previsto cumplido')).toBeInTheDocument()
    fireEvent.click(panel().getByRole('button', { name: 'Reiniciar cronómetro general' }))
    expect(panel().getByText('01:45:00')).toBeInTheDocument()
    expect(panel().getByRole('button', { name: 'Continuar' })).toBeInTheDocument()
    first.unmount()
    await act(async () => { render(<App />) })
    expect(panel().getByText('01:45:00')).toBeInTheDocument()
    expect(panel().getByRole('button', { name: 'Continuar' })).toBeInTheDocument()
  } finally {
    jest.useRealTimers()
  }
})

test('prepara la introducción con puntos de la semana y guarda los anuncios en el cierre', async () => {
  const published = [
    { id: 'open', title: 'Palabras de introducción', section: 'apertura', minutes: 1 },
    ...guide.parts,
    { id: 'close', title: 'Palabras de conclusión', section: 'cierre', minutes: 3 },
  ]
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ ...guide, parts: published }) })
  localStorage.setItem('meeting:week:' + week, JSON.stringify({
    entries: {
      open: { presiderOutline: [{ id: 'legacy-announcement', kind: 'announcement', title: 'Anuncio anterior', text: 'Aviso que se guardó antes.' }] },
      close: { title: 'Palabras de conclusión', notes: 'Nota anterior del cierre.' },
    },
    extras: [],
  }))
  function addClosingPoint(region, kind, title, text) {
    fireEvent.click(region.getByRole('button', { name: 'Añadir punto' }))
    fireEvent.change(region.getByLabelText('Tipo de punto'), { target: { value: kind } })
    fireEvent.change(region.getByLabelText('Título del punto'), { target: { value: title } })
    fireEvent.change(region.getByLabelText('Mis palabras'), { target: { value: text } })
    fireEvent.click(region.getByRole('button', { name: 'Guardar punto' }))
  }

  let first
  await act(async () => { first = render(<App />) })
  fireEvent.click(screen.getByRole('button', { name: 'Palabras de introducción' }))
  let introduction = within(screen.getByRole('region', { name: 'Bosquejo de introducción' }))
  expect(introduction.queryByText('Anuncio anterior')).not.toBeInTheDocument()
  fireEvent.click(introduction.getByRole('button', { name: 'Añadir punto' }))
  expect(introduction.queryByLabelText('Tipo de punto')).not.toBeInTheDocument()
  expect(introduction.getByLabelText('Punto del programa')).toBeDisabled()
  fireEvent.change(introduction.getByLabelText('Sección de la reunión'), { target: { value: 'maestros' } })
  expect(introduction.getByRole('option', { name: /Empecemos conversaciones/ })).toBeInTheDocument()
  fireEvent.change(introduction.getByLabelText('Sección de la reunión'), { target: { value: 'tesoros' } })
  expect(introduction.queryByRole('option', { name: /Empecemos conversaciones/ })).not.toBeInTheDocument()
  fireEvent.change(introduction.getByLabelText('Punto del programa'), { target: { value: guide.parts[0].id } })
  fireEvent.change(introduction.getByLabelText('Mis palabras'), { target: { value: 'Mencionar el punto principal.' } })
  fireEvent.click(introduction.getByRole('button', { name: 'Guardar punto' }))

  fireEvent.click(screen.getByRole('button', { name: 'Palabras de conclusión' }))
  let closing = within(screen.getByRole('region', { name: 'Bosquejo de conclusión' }))
  expect(closing.getByText('Nota anterior del cierre.')).toBeInTheDocument()
  expect(closing.getByText('Aviso que se guardó antes.')).toBeInTheDocument()
  addClosingPoint(closing, 'announcement', 'Cambio de salón', 'La próxima reunión será en el salón pequeño.')
  addClosingPoint(closing, 'reminder', 'Materiales', 'Traer el material de la próxima semana.')
  fireEvent.click(closing.getByRole('button', { name: 'Editar Materiales' }))
  fireEvent.change(closing.getByLabelText('Mis palabras'), { target: { value: 'Traer el material el miércoles.' } })
  fireEvent.click(closing.getByRole('button', { name: 'Guardar punto' }))
  first.unmount()

  await act(async () => { render(<App />) })
  fireEvent.click(screen.getByRole('button', { name: 'Palabras de conclusión' }))
  closing = within(screen.getByRole('region', { name: 'Bosquejo de conclusión' }))
  expect(closing.getAllByRole('heading', { level: 5 }).map(title => title.textContent)).toEqual(['Mis notas', 'Anuncio anterior', 'Cambio de salón', 'Materiales'])
  expect(closing.getByText('Traer el material el miércoles.')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Palabras de introducción' }))
  introduction = within(screen.getByRole('region', { name: 'Bosquejo de introducción' }))
  expect(introduction.getByText('Tesoros de la Biblia')).toBeInTheDocument()
  expect(introduction.getByRole('heading', { name: 'Tema del discurso' })).toBeInTheDocument()
  expect(introduction.getByText('Mencionar el punto principal.')).toBeInTheDocument()
})

test('oculta una ficha desde su pie y devuelve el foco a su fila', async () => {
  const reading = { id: 'reading', title: 'Lectura de la Biblia', number: 3, minutes: 4, section: 'tesoros', details: ['Pasaje de lectura'] }
  const study = { id: 'study', title: 'Estudio bíblico de la congregación', number: 8, minutes: 30, section: 'vida', details: ['Texto del capítulo'] }
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ ...guide, parts: [reading, study] }) })
  await act(async () => { render(<App />) })
  for (const part of [reading, study]) {
    const row = screen.getByRole('button', { name: part.title + ' Sin asignar' })
    fireEvent.click(row)
    expect(screen.getByText(part.details[0])).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Ocultar información' }))
    expect(screen.queryByText(part.details[0])).not.toBeInTheDocument()
    expect(row).toHaveAttribute('aria-expanded', 'false')
    expect(row).toHaveFocus()
  }
})
