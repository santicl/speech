import { useState, useEffect } from "react"

export default function MeetingProgram() {
  const [globalTime, setGlobalTime] = useState(0)
  const [isGlobalTimerRunning, setIsGlobalTimerRunning] = useState(false)
  const [isTimerExpanded, setIsTimerExpanded] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  const [assignments, setAssignments] = useState([
    {
      id: "tesoros-1",
      title: "1. Diferencias entre el justo y el malvado",
      participant: "Nehemias Caballero",
      time: "7:06 p.m.",
      duration: "10 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "tesoros-2",
      title: "2. Busquemos perlas escondidas",
      participant: "Juan Carlos Peinado Pérez",
      time: "7:16 p.m.",
      duration: "10 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "tesoros-3",
      title: "3. Lectura de la biblia",
      participant: "Alvaro Salas - Proverbios 28: 1 - 17",
      duration: "4 mins",
      expandableContent: `
        <div class="bible-reading">
          <div class="bible-verses">
            <p><strong>1</strong> Los malvados huyen cuando nadie los persigue, pero los justos se sienten tan confiados como un león.</p>
            <p><strong>2</strong> Cuando en el país se viola la ley, hay una sucesión de príncipes; pero, con la ayuda de un hombre de discernimiento y conocimiento, el príncipe permanece por mucho tiempo.</p>
            <p><strong>3</strong> El pobre que explota a los desfavorecidos es como la lluvia que arrasa con todo el alimento.</p>
            <p><strong>4</strong> Los que abandonan la ley alaban al malvado; los que obedecen la ley se indignan con ellos.</p>
            <p><strong>5</strong> Los hombres malos no pueden entender la justicia, pero los que buscan a Jehová lo pueden entender todo.</p>
            <p><strong>6</strong> Es mejor el pobre que vive con integridad que el rico que va por caminos corruptos.</p>
            <p><strong>7</strong> El hijo que tiene entendimiento obedece la ley, pero el amigo de los glotones deshonra a su padre.</p>
            <p><strong>8</strong> Quien aumenta su fortuna por medio de intereses y beneficios injustos la acumula para el que les muestra compasión a los pobres.</p>
            <p><strong>9</strong> Si alguien se niega a obedecer la ley, hasta su oración es detestable.</p>
            <p><strong>10</strong> El que desvía a las personas rectas hacia el mal camino caerá en su propio hoyo, pero los intachables heredarán lo bueno.</p>
            <p><strong>11</strong> El hombre rico es sabio a sus propios ojos, pero el pobre que tiene discernimiento lo ve como realmente es.</p>
            <p><strong>12</strong> Cuando los justos triunfan, hay una inmensa gloria; pero, cuando los malvados suben al poder, la gente corre a esconderse.</p>
            <p><strong>13</strong> Al que esconde sus pecados no le irá bien, pero al que los confiesa y los abandona se le mostrará misericordia.</p>
            <p><strong>14</strong> El hombre que siempre está en guardia es feliz, pero el terco caerá en la desgracia.</p>
            <p><strong>15</strong> Como un león que ruge y un oso que ataca es el malvado que gobierna a un pueblo indefenso.</p>
            <p><strong>16</strong> El líder sin discernimiento abusa de su poder, pero el que odia las ganancias deshonestas alargará su vida.</p>
            <p><strong>17</strong> El hombre aplastado por la culpa de haber derramado sangre y acabado con una vida será un fugitivo hasta la tumba. ¡Que nadie lo ayude!</p>
          </div>
          
          <div class="lesson-section">
            <div class="lesson-header">
              <h4>📚 Th Lección 10 - Modular la voz</h4>
              <div class="lesson-reference">Proverbios 8:4, 7</div>
            </div>
            
            <div class="lesson-summary">
              <h5>📋 RESUMEN:</h5>
              <p>Varíe el volumen, el tono y el ritmo para transmitir claramente las ideas y despertar emociones.</p>
            </div>
            
            <div class="lesson-content">
              <h5>🎯 CÓMO HACERLO:</h5>
              
              <div class="lesson-point">
                <h6>🔊 Varíe el volumen</h6>
                <ul>
                  <li><strong>Eleve la voz</strong> para destacar puntos principales y motivar a sus oyentes. Haga lo mismo cuando lea una sentencia divina.</li>
                  <li><strong>Baje la voz</strong> para generar expectación o expresar miedo o preocupación.</li>
                  <li><em>⚠️ No eleve la voz constantemente</em>, o sus oyentes creerán que los está regañando.</li>
                  <li><em>⚠️ Evite ser demasiado dramático</em> para no llamar la atención hacia usted mismo.</li>
                </ul>
              </div>
              
              <div class="lesson-point">
                <h6>🎵 Varíe el tono</h6>
                <ul>
                  <li><strong>Tono más agudo:</strong> Para expresar alegría o para hablar de tamaños o distancias.</li>
                  <li><strong>Tono más grave:</strong> Para expresar tristeza o preocupación.</li>
                </ul>
              </div>
              
              <div class="lesson-point">
                <h6>⏱️ Varíe el ritmo</h6>
                <ul>
                  <li><strong>Hable más deprisa</strong> si desea transmitir entusiasmo.</li>
                  <li><strong>Hable más despacio</strong> si va a mencionar un punto importante.</li>
                  <li><em>⚠️ No cambie bruscamente de ritmo</em>, o asustará a sus oyentes.</li>
                  <li><em>⚠️ No sacrifique la buena pronunciación</em> por hablar demasiado rápido.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="evaluation-section">
            <h5>📝 EVALUACIÓN - Hermano Álvaro</h5>
            <div class="evaluation-options">
              <div class="evaluation-good">
                <h6>✔ Si lo hizo bien:</h6>
                <p>"Álvaro, modulaste la voz de manera excelente, variando el tono y el ritmo para resaltar las ideas más importantes. Eso mantuvo la atención y transmitió bien el mensaje."</p>
              </div>
              <div class="evaluation-improve">
                <h6>✏ Si debe mejorar:</h6>
                <p>"Álvaro, la explicación fue clara y se notó tu esfuerzo. Sería muy provechoso añadir más variedad en el tono y el ritmo al presentar los puntos clave, para darles todavía más fuerza."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "maestros-1",
      title: "4. Empiece conversaciones",
      participant: "Hortensia De La Rosa Espinosa | Mary Luz Castillo Pérez",
      duration: "3 mins",
      time: "7:31 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>🏠 DE CASA EN CASA</h4>
            <p><strong>Tema:</strong> Hable del fin de la guerra y la violencia</p>
            <p><strong>Lección:</strong> Una Obra de amor, Lección 5 punto 5 - Tacto</p>
            <div class="lesson-description">
              <p><em>Siempre que sea posible, dele la razón a la persona y felicítela. Recuerde que quizás la persona crea de corazón que está en lo correcto. Primero busque un terreno común y luego ayúdela poco a poco a entender lo que la Biblia enseña.</em></p>
            </div>
          </div>
          
          <div class="evaluation-section">
            <h5>📝 EVALUACIÓN - Hermana Hortensia</h5>
            <div class="evaluation-options">
              <div class="evaluation-good">
                <h6>✔ Si lo hizo bien:</h6>
                <p>"Hortensia, mostraste muy buen tacto, felicitando a la persona y encontrando un punto en común antes de presentar el texto. Eso genera confianza y disposición para escuchar."</p>
              </div>
              <div class="evaluation-improve">
                <h6>✏ Si debe mejorar:</h6>
                <p>"Hortensia, tu manera de expresarte fue amable y respetuosa. Podrías enfocarte un poco más en encontrar puntos en común al inicio, para que la persona sienta aún más conexión contigo."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "maestros-2",
      title: "5. Empiece conversaciones",
      participant: "Jackelin Caballero Suárez | Shirley Barrios González",
      duration: "3 mins",
      time: "7:34 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>🏠 DE CASA EN CASA</h4>
            <p><strong>Tema:</strong> Hable del fin de la guerra y la violencia</p>
            <p><strong>Lección:</strong> Una Obra de amor, Lección 5 punto 4 - Tacto</p>
            <div class="lesson-description">
              <p><em>No corrija enseguida a la persona. Deje que la persona se exprese con total libertad. Y, cuando diga algo que no esté de acuerdo con la Biblia, no la contradiga (Sant. 1:19). Si la escucha con atención, logrará entender lo que ella cree y por qué lo cree (Prov. 20:5).</em></p>
            </div>
          </div>
          
          <div class="evaluation-section">
            <h5>📝 EVALUACIÓN - Hermana Jackeline</h5>
            <div class="evaluation-options">
              <div class="evaluation-good">
                <h6>✔ Si lo hizo bien:</h6>
                <p>"Jackeline, me encantó que escuchaste con paciencia y dejaste que la persona se expresara sin interrumpir. Eso muestra respeto y facilita entender su punto de vista."</p>
              </div>
              <div class="evaluation-improve">
                <h6>✏ Si debe mejorar:</h6>
                <p>"Jackeline, se notó que escuchaste con atención. En otra ocasión, podrías dejar que la persona termine por completo sus ideas antes de responder, para que perciba aún más tu interés."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "maestros-3",
      title: "6. Empiece conversaciones",
      participant: "Adela Perez | Martha Torres",
      duration: "2 mins",
      time: "7:37 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>🌍 PREDICACIÓN PÚBLICA</h4>
            <p><strong>Tema:</strong> Hable del fin de la guerra y la violencia</p>
            <p><strong>Lección:</strong> Una Obra de amor, Lección 1 punto 4 - Interés sincero</p>
            <div class="lesson-description">
              <p><em>Sea observador. Pregúntese:</em></p>
              <ul>
                <li><em>"¿Qué está haciendo la persona en este momento? ¿En qué estará pensando?"</em></li>
                <li><em>"¿Qué me dicen su ropa, su apariencia y su vivienda sobre sus creencias o su cultura?"</em></li>
                <li><em>"¿Es un buen momento para conversar?"</em></li>
              </ul>
            </div>
          </div>
          
          <div class="evaluation-section">
            <h5>📝 EVALUACIÓN - Hermana Adela</h5>
            <div class="evaluation-options">
              <div class="evaluation-good">
                <h6>✔ Si lo hizo bien:</h6>
                <p>"Adela, reflejaste un interés sincero, observando y adaptándote a la situación. Eso crea un ambiente agradable para conversar."</p>
              </div>
              <div class="evaluation-improve">
                <h6>✏ Si debe mejorar:</h6>
                <p>"Adela, tu participación fue muy buena. Sería valioso añadir algunas preguntas relacionadas con lo que observas, para que la conversación resulte todavía más cercana y personal."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "maestros-4",
      title: "7. Empiece conversaciones",
      participant: "Luisa Echenique González | Marta Meza",
      duration: "3 mins",
      time: "7:40 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>💬 PREDICACIÓN INFORMAL</h4>
            <p><strong>Tema:</strong> Hable del fin de la guerra y la violencia</p>
            <p><strong>Lección:</strong> Una Obra de amor, Lección 2 punto 4 - Naturalidad</p>
            <div class="lesson-description">
              <p><em>Tenga paciencia. No piense que tiene que ponerse a hablar de la Biblia enseguida. Espere al momento oportuno y saque el tema de forma natural. Quizás tenga que esperar hasta la próxima vez que hable con la persona.</em></p>
            </div>
          </div>
          
          <div class="evaluation-section">
            <h5>📝 EVALUACIÓN - Hermana Luisa</h5>
            <div class="evaluation-options">
              <div class="evaluation-good">
                <h6>✔ Si lo hizo bien:</h6>
                <p>"Luisa, hablaste con mucha naturalidad, introduciendo el tema bíblico de forma sencilla y sin forzarlo. Eso genera confianza en la persona."</p>
              </div>
              <div class="evaluation-improve">
                <h6>✏ Si debe mejorar:</h6>
                <p>"Luisa, tu forma de expresarte fue clara y agradable. Podrías esperar un poco más el momento oportuno antes de introducir el tema, para que la conversación fluya con mayor naturalidad."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "vida-1",
      title: "8. ¿Odia usted la violencia? Análisis con el auditorio",
      participant: "Leonardo Sotomayor Rueda",
      time: "7:46 p.m.",
      duration: "6 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "vida-2",
      title: "9. Campaña especial en septiembre",
      participant: "José Guillermo Galeano Piñeres",
      time: "8:02 p.m.",
      duration: "9 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "vida-3",
      title: "10. Estudio bíblico de congregación",
      participant: "Angel Echenique",
      time: "8:11 p.m.",
      duration: "30 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
  ])

  // Global timer effect
  useEffect(() => {
    let interval = null
    if (isGlobalTimerRunning) {
      interval = setInterval(() => {
        setGlobalTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isGlobalTimerRunning])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleGlobalStartPause = () => {
    setIsGlobalTimerRunning(!isGlobalTimerRunning)
  }

  const handleGlobalReset = () => {
    setGlobalTime(0)
    setIsGlobalTimerRunning(false)
  }

  const handleFontSizeChange = (e) => {
    setFontSize(Number.parseInt(e.target.value))
  }

  const toggleTimerExpansion = () => {
    setIsTimerExpanded(!isTimerExpanded)
  }

  const handleControlClick = (e) => {
    e.stopPropagation()
  }

  const toggleAssignmentExpansion = (id) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id ? { ...assignment, isExpanded: !assignment.isExpanded } : assignment,
      ),
    )
  }

  const startAssignmentTimer = (id) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id ? { ...assignment, timerRunning: !assignment.timerRunning } : assignment,
      ),
    )
  }

  const resetAssignmentTimer = (id) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id ? { ...assignment, recordedTime: 0, timerRunning: false } : assignment,
      ),
    )
  }

  // Individual timer effect for assignments
  useEffect(() => {
    const intervals = {}

    assignments.forEach((assignment) => {
      if (assignment.timerRunning) {
        intervals[assignment.id] = setInterval(() => {
          setAssignments((prev) =>
            prev.map((a) => (a.id === assignment.id ? { ...a, recordedTime: (a.recordedTime || 0) + 1 } : a)),
          )
        }, 1000)
      }
    })

    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval))
    }
  }, [assignments])

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <style jsx>{`
        .meeting-container {
          font-family: Georgia, "Times New Roman", serif;
          line-height: 1.6;
          color: #333;
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .timer-container {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .timer-container.collapsed {
          padding: 10px 15px;
          min-width: auto;
        }

        .timer-container.expanded {
          padding: 15px;
          min-width: 200px;
          cursor: default;
        }

        .timer-container.collapsed:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .timer-display {
          font-weight: bold;
          text-align: center;
          font-family: "Courier New", monospace;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px;
          border-radius: 6px;
        }

        .timer-container.collapsed .timer-display {
          font-size: 20px;
          margin-bottom: 0;
        }

        .timer-container.expanded .timer-display {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .timer-controls {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .timer-btn {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .timer-btn.start {
          background-color: #4caf50;
          color: white;
        }

        .timer-btn.pause {
          background-color: #ff9800;
          color: white;
        }

        .timer-btn.reset {
          background-color: #f44336;
          color: white;
        }

        .timer-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .font-control {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .font-control input[type="range"] {
          flex: 1;
        }

        .font-control span {
          min-width: 35px;
          text-align: center;
        }

        .expand-hint {
          font-size: 10px;
          text-align: center;
          opacity: 0.7;
          margin-top: 5px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .meeting-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          padding: 40px;
          border-radius: 15px;
          margin-bottom: 35px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .meeting-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .meeting-title {
          font-size: 2.2em;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .meeting-date {
          font-size: 1.3em;
          margin-bottom: 5px;
          opacity: 0.9;
        }

        .meeting-time {
          font-size: 1.1em;
          opacity: 0.8;
        }

        .president-info {
          margin-top: 20px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        .section {
          background: white;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-left: 5px solid #3498db;
          transition: all 0.3s ease;
        }

        .section:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }

        .section-title {
          color: #2c3e50;
          font-size: 1.4em;
          font-weight: bold;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-time {
          background: #3498db;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8em;
          font-weight: normal;
        }

        .assignment {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .assignment.expanded {
          background: #e3f2fd;
          border-color: #2196f3;
          box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
        }

        .assignment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .assignment-title {
          font-weight: bold;
          color: #2c3e50;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .assignment-title:hover {
          color: #3498db;
        }

        .expand-icon {
          transition: transform 0.3s ease;
          color: #3498db;
        }

        .expand-icon.expanded {
          transform: rotate(90deg);
        }

        .assignment-participant {
          color: #666;
          font-style: italic;
          margin-bottom: 8px;
        }

        .assignment-meta {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .assignment-duration {
          background: #e74c3c;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8em;
        }

        .assignment-time {
          background: #27ae60;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8em;
        }

        .timer-controls-assignment {
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .timer-btn-small {
          padding: 4px 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8em;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .timer-btn-small.start {
          background-color: #4caf50;
          color: white;
        }

        .timer-btn-small.pause {
          background-color: #ff9800;
          color: white;
        }

        .timer-btn-small.reset {
          background-color: #f44336;
          color: white;
        }

        .recorded-time {
          background: #6c757d;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8em;
          font-family: "Courier New", monospace;
        }

        .expandable-content {
          margin-top: 15px;
          padding: 15px;
          background: white;
          border-radius: 6px;
          border-left: 3px solid #3498db;
          animation: slideDown 0.3s ease;
          line-height: 1.5;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
            padding-top: 15px;
            padding-bottom: 15px;
          }
        }

        .song-prayer {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 12px;
          margin: 10px 0;
          text-align: center;
        }

        .song-prayer.song {
          background: #d1ecf1;
          border-color: #bee5eb;
        }

        .song-prayer.prayer {
          background: #d4edda;
          border-color: #c3e6cb;
        }

        .introduction-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-left: 4px solid #5a67d8;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
          margin-bottom: 30px;
        }

        .introduction-header {
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 15px;
          margin-bottom: 20px;
        }

        .introduction-title {
          color: white;
          font-size: 1.4em;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }

        .intro-icon {
          font-size: 1.2em;
        }

        .introduction-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .introduction-text {
          flex: 1;
        }

        .greeting {
          font-size: 1.1em;
          margin-bottom: 20px;
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #ffd700;
        }

        .program-preview {
          margin: 20px 0;
        }

        .preview-section {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 15px;
          background: rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 8px;
          border-left: 3px solid rgba(255, 255, 255, 0.3);
        }

        .preview-icon {
          font-size: 1.3em;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .preview-content {
          line-height: 1.5;
        }

        .preview-content strong {
          color: #ffd700;
        }

        .closing-intro {
          text-align: center;
          font-size: 1.1em;
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 8px;
          border: 2px solid rgba(255, 215, 0, 0.3);
        }

        .introduction-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          min-width: 80px;
        }

        .introduction-duration {
          background: #ffd700;
          color: #333;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.9em;
          font-weight: bold;
        }

        .conclusion-section {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          border-left: 4px solid #1e7e34;
          box-shadow: 0 4px 20px rgba(40, 167, 69, 0.3);
          margin-bottom: 30px;
        }

        .conclusion-header {
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 15px;
          margin-bottom: 20px;
        }

        .conclusion-title {
          color: white;
          font-size: 1.4em;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }

        .conclusion-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .conclusion-text {
          flex: 1;
        }

        .conclusion-summary {
          margin: 20px 0;
        }

        .summary-section {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 15px;
          background: rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 8px;
          border-left: 3px solid rgba(255, 255, 255, 0.3);
        }

        .summary-icon {
          font-size: 1.3em;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .summary-content {
          line-height: 1.5;
        }

        .summary-content strong {
          color: #ffd700;
        }

        .closing-message {
          text-align: center;
          font-size: 1.1em;
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 8px;
          border: 2px solid rgba(255, 215, 0, 0.3);
        }

        .conclusion-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          min-width: 80px;
        }

        .conclusion-duration {
          background: #ffd700;
          color: #333;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.9em;
          font-weight: bold;
        }

        .announcements-section {
          background: linear-gradient(135deg, #fd7e14 0%, #e63946 100%);
          color: white;
          border-left: 4px solid #dc3545;
          box-shadow: 0 4px 20px rgba(253, 126, 20, 0.3);
          margin-bottom: 30px;
        }

        .announcements-header {
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 15px;
          margin-bottom: 20px;
        }

        .announcements-title {
          color: white;
          font-size: 1.4em;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }

        .announcements-list {
          margin: 20px 0;
        }

        .announcement-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          border-left: 3px solid rgba(255, 255, 255, 0.3);
        }

        .announcement-item h4 {
          color: #ffd700;
          margin: 0 0 10px 0;
          font-size: 1.1em;
        }

        .announcement-item p {
          margin: 8px 0;
          line-height: 1.5;
        }

        .auxiliary-list {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 8px;
          margin: 10px 0;
        }

        .auxiliary-list h5 {
          color: #ffd700;
          margin: 0 0 10px 0;
        }

        .auxiliary-list ul {
          margin: 0;
          padding-left: 20px;
          columns: 2;
          column-gap: 20px;
        }

        .auxiliary-list li {
          margin: 5px 0;
          break-inside: avoid;
        }

        @media (max-width: 768px) {
          .introduction-content, .conclusion-content {
            flex-direction: column;
            gap: 15px;
          }
          
          .introduction-meta, .conclusion-meta {
            flex-direction: row;
            justify-content: center;
            width: 100%;
          }
          
          .preview-section, .summary-section {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
          
          .preview-icon, .summary-icon {
            align-self: center;
          }

          .auxiliary-list ul {
            columns: 1;
          }
        }

        .bible-reading {
          max-width: 100%;
        }

        .bible-verses {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border: 2px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 25px;
          max-height: 300px;
          overflow-y: auto;
        }

        .bible-verses p {
          margin: 8px 0;
          line-height: 1.6;
        }

        .bible-verses strong {
          color: #dc3545;
          font-weight: bold;
          margin-right: 8px;
          font-size: 1.1em;
        }

        .lesson-section {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border: 2px solid #2196f3;
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
        }

        .lesson-header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #2196f3;
        }

        .lesson-header h4 {
          color: #1565c0;
          margin: 0 0 8px 0;
          font-size: 1.3em;
        }

        .lesson-reference {
          background: #2196f3;
          color: white;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.9em;
          display: inline-block;
        }

        .lesson-summary {
          background: #fff3e0;
          border-left: 4px solid #ff9800;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 0 8px 8px 0;
        }

        .lesson-summary h5 {
          color: #f57c00;
          margin: 0 0 10px 0;
        }

        .lesson-content h5 {
          color: #1565c0;
          margin: 0 0 15px 0;
        }

        .lesson-point {
          background: white;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          border-left: 4px solid #4caf50;
        }

        .lesson-point h6 {
          color: #2e7d32;
          margin: 0 0 10px 0;
          font-size: 1.1em;
        }

        .lesson-point ul {
          margin: 0;
          padding-left: 20px;
        }

        .lesson-point li {
          margin: 6px 0;
          line-height: 1.5;
        }

        .lesson-point em {
          color: #d32f2f;
          background: #ffebee;
          padding: 2px 4px;
          border-radius: 3px;
        }

        .assignment-content {
          max-width: 100%;
        }

        .assignment-details {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border: 2px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 25px;
        }

        .assignment-details h4 {
          color: #495057;
          margin: 0 0 15px 0;
          font-size: 1.2em;
        }

        .assignment-details p {
          margin: 8px 0;
          line-height: 1.6;
        }

        .lesson-description {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 15px 0;
          border-radius: 0 8px 8px 0;
        }

        .lesson-description em {
          color: #856404;
          font-style: italic;
        }

        .lesson-description ul {
          margin: 10px 0;
          padding-left: 20px;
        }

        .lesson-description li {
          margin: 5px 0;
        }

        .evaluation-section {
          background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);
          border: 2px solid #28a745;
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
        }

        .evaluation-section h5 {
          color: #155724;
          margin: 0 0 15px 0;
          text-align: center;
          font-size: 1.2em;
        }

        .evaluation-options {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .evaluation-good {
          background: #d1f2eb;
          border-left: 4px solid #00d4aa;
          padding: 15px;
          border-radius: 0 8px 8px 0;
        }

        .evaluation-good h6 {
          color: #00695c;
          margin: 0 0 8px 0;
          font-size: 1em;
        }

        .evaluation-improve {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          border-radius: 0 8px 8px 0;
        }

        .evaluation-improve h6 {
          color: #856404;
          margin: 0 0 8px 0;
          font-size: 1em;
        }

        .evaluation-good p, .evaluation-improve p {
          margin: 0;
          font-style: italic;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .evaluation-options {
            gap: 10px;
          }
          
          .evaluation-good, .evaluation-improve {
            padding: 12px;
          }
        }

        .auxiliary-transition {
          background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
          color: white;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
          border-left: 4px solid #0c5460;
        }

        .auxiliary-content {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .auxiliary-icon {
          font-size: 2em;
          flex-shrink: 0;
          margin-top: 5px;
        }

        .auxiliary-text {
          flex: 1;
        }

        .auxiliary-text p {
          margin: 10px 0;
          line-height: 1.6;
        }

        .auxiliary-text strong {
          color: #ffd700;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .auxiliary-content {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          
          .auxiliary-icon {
            align-self: center;
          }
        }

        .section-introduction {
          background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%);
          border: 2px solid #17a2b8;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
          box-shadow: 0 2px 10px rgba(23, 162, 184, 0.2);
        }

        .intro-content {
          text-align: center;
        }

        .intro-content p {
          margin: 0;
          line-height: 1.6;
          color: #2c3e50;
          font-size: 1.05em;
        }

        .highlight-text {
          background: #17a2b8;
          color: white;
          padding: 3px 8px;
          border-radius: 15px;
          font-weight: bold;
          font-size: 0.95em;
        }

        @media (max-width: 768px) {
          .section-introduction {
            padding: 15px;
            margin-bottom: 20px;
          }
          
          .intro-content p {
            font-size: 1em;
          }
        }
      `}</style>

      <div className="meeting-container">
        {/* Global Timer */}
        <div className={`timer-container ${isTimerExpanded ? "expanded" : "collapsed"}`} onClick={toggleTimerExpansion}>
          <div className="timer-display">{formatTime(globalTime)}</div>
          {isTimerExpanded && (
            <>
              <div className="timer-controls" onClick={handleControlClick}>
                <button
                  className={`timer-btn ${isGlobalTimerRunning ? "pause" : "start"}`}
                  onClick={handleGlobalStartPause}
                >
                  {isGlobalTimerRunning ? "Pausar" : "Iniciar"}
                </button>
                <button className="timer-btn reset" onClick={handleGlobalReset}>
                  Reiniciar
                </button>
              </div>
              <div className="font-control" onClick={handleControlClick}>
                <label htmlFor="fontSize">Tamaño:</label>
                <input type="range" id="fontSize" min="12" max="24" value={fontSize} onChange={handleFontSizeChange} />
                <span>{fontSize}px</span>
              </div>
            </>
          )}
          {!isTimerExpanded && <div className="expand-hint">👆 Toca para expandir</div>}
        </div>

        {/* Meeting Header */}
        <div className="meeting-header">
          <h1 className="meeting-title">REUNIONES</h1>
          <div className="meeting-date">MIÉRCOLES, 27 AGOSTO</div>
          <div className="meeting-time">7:00 p.m.</div>
          <div className="president-info">
            <strong>Presidente:</strong> Santiago Caballero Suárez
          </div>
        </div>

        {/* Opening */}
        <div className="section">
          <div className="song-prayer song">
            <strong>Canción:</strong> 150 - ¡Jehová será tu Salvador!
          </div>
          <div className="song-prayer prayer">
            <strong>Oración Inicial:</strong> Adoney Castro
          </div>
        </div>

        {/* Program Introduction */}
        <div className="section introduction-section">
          <div className="introduction-header">
            <h2 className="introduction-title">
              <span className="intro-icon">🎙️</span>
              INTRODUCCIÓN AL PROGRAMA
              <span className="section-time">7:03 p.m.</span>
            </h2>
          </div>

          <div className="introduction-content">
            <div className="introduction-text">
              <p className="greeting">
                <strong>Muy buenas noches, hermanos.</strong> Bienvenidos a nuestra reunión de entre semana. Hoy
                fortaleceremos nuestra fe con un programa muy edificante.
              </p>

              <div className="program-preview">
                <div className="preview-section">
                  <span className="preview-icon">💎</span>
                  <div className="preview-content">
                    <strong>En Tesoros de la Biblia</strong> veremos las diferencias entre el justo y el malvado y
                    hallaremos valiosas perlas espirituales.
                  </div>
                </div>

                <div className="preview-section">
                  <span className="preview-icon">🎯</span>
                  <div className="preview-content">
                    <strong>Después, en Seamos Mejores Maestros,</strong> aprenderemos cómo iniciar buenas
                    conversaciones en la predicación.
                  </div>
                </div>

                <div className="preview-section">
                  <span className="preview-icon">❤️</span>
                  <div className="preview-content">
                    <strong>En Nuestra Vida Cristiana</strong> analizaremos por qué Jehová odia la violencia y
                    recibiremos ánimo para participar en la campaña especial de septiembre. Terminaremos con nuestro
                    Estudio Bíblico de Congregación.
                  </div>
                </div>
              </div>

              <p className="closing-intro">
                <strong>Sin más, iniciemos nuestro programa.</strong>
              </p>
            </div>

            <div className="introduction-meta">
              <span className="introduction-duration">1 min</span>
              <div className="timer-controls-assignment">
                <button className="timer-btn-small start">▶</button>
                <button className="timer-btn-small reset">⏹</button>
              </div>
            </div>
          </div>
        </div>

        {/* Tesoros de la Biblia */}
        <div className="section">
          <h2 className="section-title">
            TESOROS DE LA BIBLIA
            <span className="section-time">7:04 p.m.</span>
          </h2>

          {assignments.slice(0, 3).map((assignment) => (
            <div key={assignment.id} className={`assignment ${assignment.isExpanded ? "expanded" : ""}`}>
              <div className="assignment-header">
                <div className="assignment-title" onClick={() => toggleAssignmentExpansion(assignment.id)}>
                  {assignment.expandableContent && (
                    <span className={`expand-icon ${assignment.isExpanded ? "expanded" : ""}`}>▶</span>
                  )}
                  {assignment.title}
                </div>
                <div className="assignment-meta">
                  {assignment.time && <span className="assignment-time">{assignment.time}</span>}
                  {assignment.duration && <span className="assignment-duration">{assignment.duration}</span>}
                  <div className="timer-controls-assignment">
                    <button
                      className={`timer-btn-small ${assignment.timerRunning ? "pause" : "start"}`}
                      onClick={() => startAssignmentTimer(assignment.id)}
                    >
                      {assignment.timerRunning ? "⏸" : "▶"}
                    </button>
                    <button className="timer-btn-small reset" onClick={() => resetAssignmentTimer(assignment.id)}>
                      ⏹
                    </button>
                    {(assignment.recordedTime || 0) > 0 && (
                      <span className="recorded-time">{formatTime(assignment.recordedTime || 0)}</span>
                    )}
                  </div>
                </div>
              </div>
              {assignment.participant && <div className="assignment-participant">{assignment.participant}</div>}
              {assignment.isExpanded && assignment.expandableContent && (
                <div
                  className="expandable-content"
                  dangerouslySetInnerHTML={{ __html: assignment.expandableContent }}
                />
              )}
            </div>
          ))}

          {/* Transición a Sala Auxiliar */}
          <div className="auxiliary-transition">
            <div className="auxiliary-content">
              <div className="auxiliary-icon">🚪</div>
              <div className="auxiliary-text">
                <p>
                  <strong>
                    Ahora, se les invita a todos los que tienen sus asignaciones en la sala auxiliar, dirigirse hacia
                    allá.
                  </strong>
                  Los estará recibiendo el hermano <strong>Adoney Castro</strong>.
                </p>
                <p>
                  Acá en la sala principal seguimos con una asignación importante en la reunión, la{" "}
                  <strong>intervención número 3, la lectura de la biblia</strong>, sigamos por favor la lectura de{" "}
                  <strong>Proverbios 28: 1 - 17</strong> que hará el hermano <strong>Álvaro Salas</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seamos Mejores Maestros */}
        <div className="section">
          <h2 className="section-title">
            SEAMOS MEJORES MAESTROS
            <span className="section-time">7:31 p.m.</span>
          </h2>

          <div className="section-introduction">
            <div className="intro-content">
              <p>
                <strong>En esta sección veremos 4 demostraciones</strong> y todas 4 tendrán un marco de circunstancia en
                común:
                <span className="highlight-text">"Hable del fin de la guerra y la violencia"</span>. Lo cual nos servirá
                para la campaña <strong>"Un mundo sin guerra es posible"</strong>.
              </p>
            </div>
          </div>

          {assignments.slice(3, 7).map((assignment) => (
            <div key={assignment.id} className={`assignment ${assignment.isExpanded ? "expanded" : ""}`}>
              <div className="assignment-header">
                <div className="assignment-title" onClick={() => toggleAssignmentExpansion(assignment.id)}>
                  {assignment.expandableContent && (
                    <span className={`expand-icon ${assignment.isExpanded ? "expanded" : ""}`}>▶</span>
                  )}
                  {assignment.title}
                </div>
                <div className="assignment-meta">
                  {assignment.time && <span className="assignment-time">{assignment.time}</span>}
                  {assignment.duration && <span className="assignment-duration">{assignment.duration}</span>}
                  <div className="timer-controls-assignment">
                    <button
                      className={`timer-btn-small ${assignment.timerRunning ? "pause" : "start"}`}
                      onClick={() => startAssignmentTimer(assignment.id)}
                    >
                      {assignment.timerRunning ? "⏸" : "▶"}
                    </button>
                    <button className="timer-btn-small reset" onClick={() => resetAssignmentTimer(assignment.id)}>
                      ⏹
                    </button>
                    {(assignment.recordedTime || 0) > 0 && (
                      <span className="recorded-time">{formatTime(assignment.recordedTime || 0)}</span>
                    )}
                  </div>
                </div>
              </div>
              {assignment.participant && <div className="assignment-participant">{assignment.participant}</div>}
              {assignment.isExpanded && assignment.expandableContent && (
                <div
                  className="expandable-content"
                  dangerouslySetInnerHTML={{ __html: assignment.expandableContent }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Nuestra Vida Cristiana */}
        <div className="section">
          <h2 className="section-title">
            NUESTRA VIDA CRISTIANA
            <span className="section-time">7:46 p.m.</span>
          </h2>

          <div className="song-prayer song">
            <strong>Canción:</strong> 112 - Jehová, el Dios de la paz
          </div>

          {assignments.slice(7).map((assignment) => (
            <div key={assignment.id} className={`assignment ${assignment.isExpanded ? "expanded" : ""}`}>
              <div className="assignment-header">
                <div className="assignment-title" onClick={() => toggleAssignmentExpansion(assignment.id)}>
                  {assignment.expandableContent && (
                    <span className={`expand-icon ${assignment.isExpanded ? "expanded" : ""}`}>▶</span>
                  )}
                  {assignment.title}
                </div>
                <div className="assignment-meta">
                  {assignment.time && <span className="assignment-time">{assignment.time}</span>}
                  {assignment.duration && <span className="assignment-duration">{assignment.duration}</span>}
                  <div className="timer-controls-assignment">
                    <button
                      className={`timer-btn-small ${assignment.timerRunning ? "pause" : "start"}`}
                      onClick={() => startAssignmentTimer(assignment.id)}
                    >
                      {assignment.timerRunning ? "⏸" : "▶"}
                    </button>
                    <button className="timer-btn-small reset" onClick={() => resetAssignmentTimer(assignment.id)}>
                      ⏹
                    </button>
                    {(assignment.recordedTime || 0) > 0 && (
                      <span className="recorded-time">{formatTime(assignment.recordedTime || 0)}</span>
                    )}
                  </div>
                </div>
              </div>
              {assignment.participant && <div className="assignment-participant">{assignment.participant}</div>}
              {assignment.isExpanded && assignment.expandableContent && (
                <div
                  className="expandable-content"
                  dangerouslySetInnerHTML={{ __html: assignment.expandableContent }}
                />
              )}
            </div>
          ))}

          {/* Additional items */}
          <div className="assignment">
            <div className="assignment-header">
              <div className="assignment-title">Lector</div>
            </div>
            <div className="assignment-participant">Wilberto Meza Frías</div>
          </div>
        </div>

        {/* Palabras de Conclusión */}
        <div className="section conclusion-section">
          <div className="conclusion-header">
            <h2 className="conclusion-title">
              <span className="intro-icon">🎯</span>
              PALABRAS DE CONCLUSIÓN
              <span className="section-time">8:32 p.m.</span>
            </h2>
          </div>

          <div className="conclusion-content">
            <div className="conclusion-text">
              <p className="greeting">
                <strong>Hermanos, hemos tenido un programa muy provechoso.</strong>
              </p>

              <div className="conclusion-summary">
                <div className="summary-section">
                  <span className="summary-icon">💎</span>
                  <div className="summary-content">
                    <strong>En Tesoros de la Biblia</strong> vimos las diferencias entre el justo y el malvado y cómo
                    confiar en Jehová.
                  </div>
                </div>

                <div className="summary-section">
                  <span className="summary-icon">🎯</span>
                  <div className="summary-content">
                    <strong>En Seamos Mejores Maestros</strong> aprendimos a usar tacto, interés sincero y naturalidad,
                    cualidades útiles para la campaña de septiembre.
                  </div>
                </div>

                <div className="summary-section">
                  <span className="summary-icon">❤️</span>
                  <div className="summary-content">
                    <strong>En Nuestra Vida Cristiana</strong> recordamos que Jehová odia la violencia y cómo
                    mantenernos libres de su influencia, apoyando al mismo tiempo la campaña.
                  </div>
                </div>

                <div className="summary-section">
                  <span className="summary-icon">📚</span>
                  <div className="summary-content">
                    <strong>Y en nuestro Estudio Bíblico</strong> vimos la importancia de acumular tesoros espirituales
                    y mantener la paz con los hermanos.
                  </div>
                </div>
              </div>

              <p className="closing-message">
                <strong>
                  Sigamos aplicando lo aprendido para fortalecer nuestra amistad con Jehová. Muchas gracias por su
                  atención.
                </strong>
              </p>
            </div>

            <div className="conclusion-meta">
              <span className="conclusion-duration">1 min</span>
              <div className="timer-controls-assignment">
                <button className="timer-btn-small start">▶</button>
                <button className="timer-btn-small reset">⏹</button>
              </div>
            </div>
          </div>
        </div>

        {/* Anuncios */}
        <div className="section announcements-section">
          <div className="announcements-header">
            <h2 className="announcements-title">
              <span className="intro-icon">📢</span>
              ANUNCIOS
              <span className="section-time">8:33 p.m.</span>
            </h2>
          </div>

          <div className="announcements-list">
            <div className="announcement-item">
              <h4>💰 Contribuciones</h4>
              <p>
                Apoyar las contribuciones: las del tablero son para los gastos del salón y las del lobby son para la
                obra mundial.
              </p>
            </div>

            <div className="announcement-item">
              <h4>🎯 Precursorado Auxiliar - Septiembre</h4>
              <p>Se anima a hacer el Precursorado auxiliar del mes de septiembre.</p>

              <div className="auxiliary-list">
                <h5>📋 Precursores auxiliares confirmados para septiembre:</h5>
                <ul>
                  <li>Leonardo Sotomayor</li>
                  <li>Valentina Sotomayor</li>
                  <li>Carolina Sotomayor</li>
                  <li>Jennie Briseño</li>
                  <li>Kerit Echenique</li>
                  <li>Luisa Echenique</li>
                  <li>Luis Díaz</li>
                  <li>Valeria Diaz</li>
                  <li>Liliana Pedroso</li>
                  <li>Juan Peinado</li>
                  <li>Shery Meza de continuo</li>
                </ul>
              </div>
            </div>

            <div className="announcement-item">
              <h4>🔧 Vigilancia y Mantenimiento</h4>
              <p>
                Para el día <strong>4 de diciembre (Jueves)</strong> hay vigilancia y mantenimiento. Quien desee ir,
                favor anotarse con el hermano Nehemías Caballero.
              </p>
            </div>

            <div className="announcement-item">
              <h4>💧 Bautismo - Asamblea</h4>
              <p>Quien tenga el deseo de bautizarse para esta asamblea, favor acercarse al hermano Luis Torres.</p>
            </div>

            <div className="announcement-item">
              <h4>🚤 Campaña Caño Del Oro</h4>
              <p>
                Para el <strong>21 de septiembre (Domingo)</strong> hay campaña para Caño Del Oro, con la revista "Un
                mundo sin guerra es posible" a las 7:00 pm en el muelle la bodeguita. Se anima a todos participar y
                animar a los hermanos de allá de Caño.
              </p>
            </div>
            <div className="announcement-item">
              <h4>🧹 Aseo Salón del Reino</h4>
              <p>
                Se ha programado para el día <strong>Domingo</strong>, un aseo general al salón. Se les invita a todos
                los hermanos a sacar un tiempo para apoyar este arreglo.
              </p>
              <p>
                <strong>Horario:</strong> [4: 00 PM]
              </p>
            </div>
          </div>
        </div>

        {/* Final Section */}
        <div className="section">
          <div className="song-prayer song" style={{ marginTop: "20px" }}>
            <strong>8:35 p.m. - Canción:</strong> 113 - La paz del pueblo de Dios
          </div>
          <div className="song-prayer prayer">
            <strong>Oración Final:</strong> Alberto Angulo
            <div style={{ marginTop: "10px", fontSize: "0.9em", fontWeight: "bold", color: "#666" }}>
              🕐 Finalización del programa: 8:35 p.m.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
