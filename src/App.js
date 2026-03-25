import { useState, useEffect } from "react"

export default function MeetingProgram() {
  const [globalTime, setGlobalTime] = useState(0)
  const [isGlobalTimerRunning, setIsGlobalTimerRunning] = useState(false)
  const [isTimerExpanded, setIsTimerExpanded] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  const [assignments, setAssignments] = useState([
    {
      id: "tesoros-1",
      title: "1. Si le prestamos atención a Jehová, nos irá bien",
      participant: "Samuel Banquez Martinez",
      time: "7:06 p.m.",
      duration: "10 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "tesoros-2",
      title: "2. Busquemos perlas escondidas",
      participant: "Nehemias Caballero Arellano",
      time: "7:16 p.m.",
      duration: "10 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "tesoros-3",
      title: "3. Lectura de la Biblia",
      participant: "Jose Salvador Castellanos - Isaias 48:9-20",
      duration: "4 mins",
      expandableContent: `
        <div class="bible-reading">
          <div class="bible-verses">
            <p><strong>9</strong> Pero por causa de mi nombre reprimire mi furia; para mi propia alabanza, me refrenare y no acabare contigo.</p>
            <p><strong>10</strong> Mira! Te he refinado, pero no como a la plata. Te he probado en el horno de la afliccion.</p>
            <p><strong>11</strong> Por mi, por mi actuare, porque como voy a dejar que me profanen? Mi gloria no se la doy a nadie.</p>
            <p><strong>12</strong> Escuchame, oh, Jacob, y tu, Israel, a quien he llamado. Yo soy el mismo. Yo soy el primero, y tambien soy el ultimo.</p>
            <p><strong>13</strong> Mi propia mano coloco los cimientos de la tierra, y mi mano derecha extendio los cielos. Cuando los llamo, todos ellos se presentan.</p>
            <p><strong>14</strong> Juntense, todos ustedes, y escuchen. Quien entre ellos ha anunciado estas cosas? Aquel a quien Jehova ha amado cumplira su voluntad contra Babilonia, y su brazo caera sobre los caldeos.</p>
            <p><strong>15</strong> Yo mismo he hablado y lo he llamado. Lo he traido, y el triunfara en su mision.</p>
            <p><strong>16</strong> Acerquense a mi y oigan esto. Desde el comienzo, yo nunca he hablado en secreto. Cuando ocurrio, yo estaba alli". Y ahora el Senor Soberano Jehova me ha enviado a mi, y tambien su espiritu.</p>
            <p><strong>17</strong> Esto es lo que dice Jehova, tu Recomprador, el Santo de Israel: "Yo, Jehova, soy tu Dios, el que te ensena por tu propio bien, el que te guia por el camino en que debes andar.</p>
            <p><strong>18</strong> Si tan solo prestaras atencion a mis mandamientos! Entonces, tu paz llegaria a ser igual que un rio, y tu justicia, como las olas del mar.</p>
            <p><strong>19</strong> Tu descendencia llegaria a ser como la arena, y tus descendientes, tan numerosos como los granos de arena. El nombre de ellos nunca seria eliminado ni quitado de mi vista".</p>
            <p><strong>20</strong> Salgan de Babilonia! Huyan de los caldeos! Anuncienlo gritando de alegria! Proclamenlo! Denlo a conocer hasta los confines de la tierra. Digan: "Jehova ha recomprado a su siervo Jacob.</p>
          </div>
          
          <div class="lesson-section">
            <div class="lesson-header">
              <h4>Leccion 11 - Hablar con entusiasmo</h4>
              <div class="lesson-reference">Romanos 12:11</div>
            </div>
            
            <div class="lesson-summary">
              <h5>RESUMEN:</h5>
              <p>Hable con el corazon para motivar a sus oyentes.</p>
            </div>
            
            <div class="lesson-content">
              <h5>COMO HACERLO:</h5>
              
              <div class="lesson-point">
                <h6>Prepare el corazon</h6>
                <ul>
                  <li>Al prepararse, medite en la importancia de su mensaje.</li>
                  <li>Estudie bien la informacion para que pueda expresarse con conviccion.</li>
                </ul>
              </div>
              
              <div class="lesson-point">
                <h6>Piense en sus oyentes</h6>
                <ul>
                  <li>Reflexione en el buen efecto que tendra en los demas lo que les va a decir o leer.</li>
                  <li>Piense en como presentar la informacion para que sus oyentes la comprendan mejor y la valoren mas.</li>
                </ul>
              </div>
              
              <div class="lesson-point">
                <h6>Haga que su mensaje cobre vida</h6>
                <ul>
                  <li>Hable con el corazon.</li>
                  <li>Muestre lo que siente mediante expresiones faciales que transmitan sinceridad y ademanes que sean naturales.</li>
                  <li>Procure no distraer a sus oyentes haciendo continuamente el mismo gesto.</li>
                  <li>Sus gestos y sus palabras deben estar relacionados.</li>
                  <li>Transmita entusiasmo sobre todo al analizar los puntos principales o al motivar a sus oyentes a actuar.</li>
                  <li>Si habla siempre con demasiado entusiasmo, terminara cansando a sus oyentes.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="evaluation-section">
            <h5>EVALUACION - Hermano Jose Salvador</h5>
            <div class="evaluation-options">
              <div class="evaluation-good">
                <h6>Si lo hizo bien:</h6>
                <p>"Jose Salvador, hablaste con entusiasmo y se noto que preparaste el corazon. Tus expresiones faciales y ademanes transmitieron sinceridad y ayudaron a que el mensaje cobrara vida."</p>
              </div>
              <div class="evaluation-improve">
                <h6>Si debe mejorar:</h6>
                <p>"Jose Salvador, la lectura fue clara. Seria muy provechoso anadir mas expresividad y variedad en el tono para transmitir aun mas entusiasmo al presentar los puntos clave."</p>
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
      participant: "Josue Briseño | Dorley Briseño",
      duration: "3 mins",
      time: "7:31 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>PREDICACION INFORMAL</h4>
            <p><strong>Tema:</strong> Invite a un familiar inactivo al discurso especial y a la Conmemoracion</p>
            <p><strong>Leccion:</strong> lmd leccion 5 punto 3 - Tacto</p>
            <div class="lesson-description">
              <p><em>Elija bien sus palabras. Por ejemplo, si habla con una persona que no tiene antecedentes cristianos, quizas tenga que referirse a la Biblia o a Jesus de forma diferente.</em></p>
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
      title: "5. Haga revisitas",
      participant: "Dormelina Martinez | Denis Alicia Frias Jimenez",
      duration: "4 mins",
      time: "7:34 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>PREDICACION INFORMAL</h4>
            <p><strong>Tema:</strong> La persona esta pensando en asistir a la Conmemoracion. Expliquele como sera esta reunion</p>
            <p><strong>Leccion:</strong> lmd leccion 9 punto 3 - Empatia</p>
            <div class="lesson-description">
              <p><em>Escuche con atencion. Deje que la persona hable y no la interrumpa. Si tiene alguna objecion o le expresa sus sentimientos y preocupaciones, no la ignore. Si le presta atencion, la persona vera que a usted realmente le interesa lo que ella piensa.</em></p>
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
      title: "6. Haga revisitas",
      participant: "Yohema Diaz Torres | Yanina Diaz Pasos",
      duration: "5 mins",
      time: "7:38 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>PREDICACION INFORMAL</h4>
            <p><strong>Tema:</strong> Al terminar la Conmemoracion, responda las preguntas que le hayan surgido a algun invitado</p>
            <p><strong>Leccion:</strong> lmd leccion 8 punto 3 - Paciencia</p>
            <div class="lesson-description">
              <p><em>Intente algo diferente. Si al principio la persona no quiere aceptar un curso biblico, no la presione. Pero, si lo ve apropiado, use videos o articulos para mostrarle como son nuestros cursos biblicos y como le ayudaria aceptar uno.</em></p>
            </div>
          </div>
        </div>
      `,
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "vida-2",
      title: "7. Aproveche bien el dia mas importante del año",
      participant: "Luis Diaz Torres",
      time: "7:43 p.m.",
      duration: "15 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "vida-3",
      title: "8. Estudio biblico de congregacion",
      participant: "Angel Echenique | Lector: Willian Bustos Montalvo",
      time: "7:58 p.m.",
      duration: "30 mins",
      description: "lfb lecciones 72, 73",
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
  <strong>Cancion:</strong> 89 - Jehova bendice al que escucha y obedece
  </div>
  <div className="song-prayer prayer">
  <strong>Oracion Inicial:</strong> Santiago Caballero Suarez
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
                <strong>Muy buenas noches, hermanos.</strong> Bienvenidos a nuestra reunion de entre semana. Hoy fortaleceremos nuestra fe con un programa muy edificante.
              </p>

              <div className="program-preview">
                <div className="preview-section">
                  <span className="preview-icon">💎</span>
                  <div className="preview-content">
                    <strong>En Tesoros de la Biblia</strong> veremos como si le prestamos atencion a Jehova, nos ira bien y hallaremos valiosas perlas espirituales.
                  </div>
                </div>

                <div className="preview-section">
                  <span className="preview-icon">🎯</span>
                  <div className="preview-content">
                    <strong>Despues, en Seamos Mejores Maestros,</strong> aprenderemos como iniciar conversaciones e invitar a las personas al discurso especial y a la Conmemoracion.
                  </div>
                </div>

                <div className="preview-section">
                  <span className="preview-icon">❤️</span>
                  <div className="preview-content">
                    <strong>En Nuestra Vida Cristiana</strong> analizaremos como aprovechar bien el dia mas importante del ano. Terminaremos con nuestro Estudio Biblico de Congregacion.
                  </div>
                </div>
              </div>

              <p className="closing-intro">
                <strong>Sin mas, iniciemos nuestro programa.</strong>
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
  Los estara recibiendo el hermano <strong>Santiago Caballero Suarez</strong>.
  </p>
  <p>
  Aca en la sala principal seguimos con una asignacion importante en la reunion, la{" "}
  <strong>intervencion numero 3, la lectura de la biblia</strong>, que hara el hermano <strong>Jose Salvador Castellanos</strong>.
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
  <strong>En esta seccion veremos 3 demostraciones</strong> enfocadas en invitar a las personas al discurso especial y a la Conmemoracion. Aprenderemos sobre el tacto, la empatia y la paciencia al conversar con las personas.
  </p>
  </div>
          </div>

          {assignments.slice(3, 6).map((assignment) => (
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
  <strong>Cancion:</strong> 107 - Dios nos enseno a amar
  </div>

          {assignments.slice(6).map((assignment) => (
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
                  {/*  <strong>En Tesoros de la Biblia</strong>*/} Hoy aprendimos que para que nos vaya bien, debemos prestarle atención a Jehová, tambien vimos 3 cualidades para poner en practica a la hora de invitar a la conmemoracion y finalmente, aprendimos lecciones importantes en el estudio del libro
                  </div>
                </div>

                {/*

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
                */}
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
              <h4>1. Horario de la Conmemoracion</h4>
              <p>
                Les pedimos con carino que recuerden asistir en el horario que les fue asignado. No es una regla, pero respetar ese horario nos ayuda a que todo fluya bien y evitara sobrepasar el aforo permitido.
              </p>
            </div>

            <div className="announcement-item">
              <h4>2. Limpieza y decoracion - Jueves festivo a las 7:45 a.m.</h4>
              <p>
                Los invitamos a unirse! Ese dia prepararemos el Salon del Reino para la Conmemoracion. Comenzaremos con el programa especial de adoracion matutina y despues, entre todos, nos organizaremos para la limpieza y la decoracion. Sera un momento bonito de trabajar juntos.
              </p>
            </div>

            <div className="announcement-item">
              <h4>3. Programa de adoracion matutina - 2 de abril</h4>
              <p>
                Para el dia de la Conmemoracion hay un programa especial de adoracion matutina que dura solo <strong>17 minutos</strong>. Los animamos a verlo ese dia. Pueden encontrarlo facilmente en <strong>JW.org</strong> o en la aplicacion <strong>JW Library</strong>.
              </p>
            </div>

            <div className="announcement-item">
              <h4>4. Informe de cuentas</h4>
              <p>
                A continuacion se leera el informe de cuentas de la congregacion.
              </p>
            </div>

            <div className="announcement-item">
              <h4>5. Reunion entre semana para la Conmemoracion</h4>
              <p>
                Durante la semana de la Conmemoracion, la unica reunion sera el <strong>sabado 4 de abril</strong>. No habra reunion entre semana para esa fecha.
              </p>
            </div>

            <div className="announcement-item">
              <h4>6. Repaso de la asamblea - Miercoles 11 de abril</h4>
              <p>
                Si tienen sus notas de la ultima asamblea, traiganlas! Ese miercoles haremos juntos un repaso de todo lo que aprendimos. Ademas, en lugar de la parte habitual de "Necesidades de la congregacion", se presentara el <strong>Informe 2 de 2026</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Final Section */}
        <div className="section">
          <div className="song-prayer song" style={{ marginTop: "20px" }}>
  <strong>8:35 p.m. - Cancion:</strong> 134 - Los hijos son un regalo de Dios
  </div>
  <div className="song-prayer prayer">
  <strong>Oracion Final:</strong> Alfonso Orlando Ortiz B
            <div style={{ marginTop: "10px", fontSize: "0.9em", fontWeight: "bold", color: "#666" }}>
              🕐 Finalización del programa: 8:35 p.m.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
