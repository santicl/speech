"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, Play, Pause, Square, Clock, User, Timer, Mic, Heart, BookOpen, Target, AlertCircle, Award } from "lucide-react"

export default function MeetingProgram() {
  const [globalTime, setGlobalTime] = useState(0)
  const [isGlobalTimerRunning, setIsGlobalTimerRunning] = useState(false)
  const [isTimerExpanded, setIsTimerExpanded] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  const [assignments, setAssignments] = useState([
    {
      id: "tesoros-1",
      title: "1. ¡Cuánto amamos nuestro paraíso espiritual!",
      participant: "Josue Briseño",
      time: "7:06 p.m.",
      duration: "10 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "tesoros-2",
      title: "2. Busquemos perlas escondidas",
      participant: "Samuel Banquez",
      time: "7:16 p.m.",
      duration: "10 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "tesoros-3",
      title: "3. Lectura de la Biblia",
      participant: "Alvaro Salas - Isaías 65:17-25",
      duration: "4 mins",
      expandableContent: `
        <div class="bible-reading">
          <div class="bible-verses">
            <p><strong>17</strong> “Porque, ¡miren!, voy a crear unos nuevos cielos y una nueva tierra; y las cosas del pasado no serán recordadas ni vendrán al corazón.</p>
            <p><strong>18</strong> Así que alégrense y estén felices para siempre por lo que voy a crear. Porque, ¡miren!, voy a crear a Jerusalén para que sea un motivo de alegría y a su pueblo para que sea un motivo de felicidad.</p>
            <p><strong>19</strong> Y me alegraré por Jerusalén y me sentiré feliz por mi pueblo; ya no se oirá más en ella el sonido del llanto ni los gritos de angustia”.</p>
            <p><strong>20</strong> “Allí ya no habrá bebés que vivan solo unos cuantos días ni viejos que no completen los días de su vejez. Porque al que muera con cien años de edad se le considerará un simple muchacho, y el pecador será maldecido, aunque tenga cien años.</p>
            <p><strong>21</strong> Construirán casas y vivirán en ellas; plantarán viñas y comerán su fruto.</p>
            <p><strong>22</strong> No construirán casas para que otros vivan en ellas ni plantarán para que otros coman. Porque los días de mi pueblo serán como los días de un árbol, y mis escogidos disfrutarán al máximo del fruto de su trabajo.</p>
            <p><strong>23</strong> No se esforzarán en vano ni traerán hijos al mundo para que sufran, porque son la descendencia compuesta por los que Jehová ha bendecido, ellos y sus descendientes.</p>
            <p><strong>24</strong> Incluso antes de que ellos llamen, yo responderé; mientras todavía estén hablando, yo los escucharé.</p>
            <p><strong>25</strong> El lobo y el cordero comerán juntos, el león comerá paja igual que el toro, y la serpiente se alimentará de polvo. No harán ningún daño ni destruirán nada en toda mi santa montaña”, dice Jehová.</p>
          </div>
         
          <div class="lesson-section">
            <div class="lesson-header">
              <h4>Lección 10 - Modular la voz</h4>
              <div class="lesson-reference">Proverbios 8:4, 7</div>
            </div>
            <div class="lesson-book">Seamos mejores lectores y maestros</div>
           
            <div class="lesson-summary">
              <h5>RESUMEN:</h5>
              <p>Varíe el volumen, el tono y el ritmo para transmitir claramente las ideas y despertar emociones.</p>
            </div>
           
            <div class="lesson-content">
              <h5>CÓMO HACERLO:</h5>
             
              <div class="lesson-point">
                <h6>Varíe el volumen</h6>
                <ul>
                  <li>Eleve la voz para destacar puntos principales y motivar a sus oyentes.</li>
                  <li>Haga lo mismo cuando lea una sentencia divina.</li>
                  <li>Baje la voz para generar expectación o expresar miedo o preocupación.</li>
                </ul>
                <div class="tip-box">
                  <strong>Sugerencia práctica:</strong> No eleve la voz constantemente, o sus oyentes creerán que los está regañando. Evite ser demasiado dramático para no llamar la atención hacia usted mismo.
                </div>
              </div>
             
              <div class="lesson-point">
                <h6>Varíe el tono</h6>
                <ul>
                  <li>Use un tono de voz más agudo para expresar alegría o para hablar de tamaños o distancias.</li>
                  <li>Utilice un tono de voz más grave para expresar tristeza o preocupación.</li>
                </ul>
              </div>
             
              <div class="lesson-point">
                <h6>Varíe el ritmo</h6>
                <ul>
                  <li>Hable más deprisa si desea transmitir entusiasmo.</li>
                  <li>Hable más despacio si va a mencionar un punto importante.</li>
                </ul>
                <div class="tip-box">
                  <strong>Sugerencia práctica:</strong> No cambie bruscamente de ritmo, o asustará a sus oyentes. No sacrifique la buena pronunciación por hablar demasiado rápido.
                </div>
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
      participant: "Rosa Salas | Delvis Cassiani",
      duration: "3 mins",
      time: "7:31 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>PREDICACIÓN INFORMAL</h4>
            <p><strong>Instrucción:</strong> Busque una manera natural de hacerle saber a la persona que usted es testigo de Jehová</p>
          </div>
         
          <div class="lesson-section">
            <div class="lesson-header">
              <h4>Tacto</h4>
              <div class="lesson-reference">lmd lección 5 punto 3</div>
            </div>
            <div class="lesson-book">Hacer discípulos: una obra de amor</div>
           
            <div class="lesson-content">
              <div class="lesson-point">
                <p><strong>3.</strong> Elija bien sus palabras. Por ejemplo, si habla con una persona que no tiene antecedentes cristianos, quizás tenga que referirse a la Biblia o a Jesús de forma diferente.</p>
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
      participant: "Vivian Caballero | Victoria Banquez",
      duration: "2 mins",
      time: "7:34 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>PREDICACIÓN PÚBLICA</h4>
            <p><strong>Instrucción:</strong> La persona quiere discutir con usted</p>
          </div>
         
          <div class="lesson-section">
            <div class="lesson-header">
              <h4>Humildad</h4>
              <div class="lesson-reference">lmd lección 4 punto 5</div>
            </div>
            <div class="lesson-book">Hacer discípulos: una obra de amor</div>
           
            <div class="lesson-content">
              <div class="lesson-point">
                <p><strong>5.</strong> Sea apacible. No se empeñe en demostrar que usted tiene la razón. Nuestro objetivo no es discutir. La humildad lo ayudará a mantener la calma y a saber cuándo es hora de retirarse (Prov. 17:14; Tito 3:2). Si usted responde de forma amable y muestra apacibilidad, puede que la persona esté dispuesta a conversar con nosotros en otra ocasión.</p>
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
      participant: "Alexandra Gomez | Samuel Gomez",
      duration: "3 mins",
      time: "7:36 p.m.",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>DE CASA EN CASA</h4>
            <p><strong>Instrucción:</strong> Use un tratado para empezar una conversación</p>
          </div>
         
          <div class="lesson-section">
            <div class="lesson-header">
              <h4>Interés sincero</h4>
              <div class="lesson-reference">lmd lección 1 punto 4</div>
            </div>
            <div class="lesson-book">Hacer discípulos: una obra de amor</div>
           
            <div class="lesson-content">
              <div class="lesson-point">
                <p><strong>4.</strong> Sea observador. Pregúntese:</p>
                <ul>
                  <li>"¿Qué está haciendo la persona en este momento? ¿En qué estará pensando?".</li>
                  <li>"¿Qué me dicen su ropa, su apariencia y su vivienda sobre sus creencias o su cultura?".</li>
                  <li>"¿Es un buen momento para conversar?".</li>
                </ul>
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
      title: "7. Explique sus creencias",
      participant: "Leider Mercado | Melani Meza",
      time: "7:39 p.m.",
      duration: "3 mins",
      expandableContent: `
        <div class="assignment-content">
          <div class="assignment-details">
            <h4>ESCENIFICACIÓN</h4>
            <p><strong>Tema:</strong> ¿Quién es el anticristo?</p>
            <p><strong>Referencia:</strong> ijwbq artículo 87</p>
          </div>
         
          <div class="lesson-section">
            <div class="lesson-header">
              <h4>Hablar con sencillez</h4>
              <div class="lesson-reference">th lección 17</div>
            </div>
            <div class="lesson-book">Seamos mejores lectores y maestros</div>
            <div class="lesson-scripture">1 Corintios 14:9</div>
           
            <div class="lesson-summary">
              <h5>RESUMEN:</h5>
              <p>Ayude a sus oyentes a entender lo que les está diciendo.</p>
            </div>
           
            <div class="lesson-content">
              <h5>CÓMO HACERLO:</h5>
             
              <div class="lesson-point">
                <h6>Estudie la información a fondo</h6>
                <p>Debe entender bien el tema para poder explicarlo con sencillez y en sus propias palabras.</p>
              </div>
             
              <div class="lesson-point">
                <h6>Use frases cortas y expresiones sencillas</h6>
                <p>Aunque no está mal usar frases largas, es mejor usar frases o expresiones cortas al mencionar un punto principal.</p>
                <div class="tip-box">
                  <strong>Sugerencia práctica:</strong> No añada detalles innecesarios que puedan confundir o abrumar a sus oyentes. Evite las expresiones complicadas. Es mejor usar un lenguaje sencillo.
                </div>
              </div>
             
              <div class="lesson-point">
                <h6>Explique los términos poco conocidos</h6>
                <p>Úselos lo menos posible. No olvide dar una explicación cuando mencione expresiones, personajes bíblicos, unidades de medida o costumbres de la antigüedad que sus oyentes no conozcan.</p>
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
      title: "8. ¿Tendrás tú una vida llena de cosas buenas?",
      participant: "Erwin Corrales",
      time: "7:42 p.m.",
      duration: "15 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "vida-2",
      title: "9. Preparados para las situaciones de emergencia: Esté listo para lo imprevisto",
      participant: "Angel Echenique",
      time: "7:57 p.m.",
      duration: "15 mins",
      isExpanded: false,
      timerRunning: false,
      recordedTime: 0,
    },
    {
      id: "vida-3",
      title: "10. Estudio bíblico de la congregación",
      participant: "Luis Diaz | Lector: José Salvador Castellanos",
      time: "8:12 p.m.",
      duration: "30 mins",
      description: "lfb lecciones 88, 89",
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

        /* Estilos mejorados para las asignaciones (especialmente 4 al 7) */
        .assignment {
          background: #ffffff;
          border-radius: 16px;
          padding: 1rem;
          margin-bottom: 1rem;
          border: 1px solid #e2e8f0;
          transition: all 0.25s ease;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }

        .assignment:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          transform: translateY(-1px);
        }

        .assignment.expanded {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-color: #3b82f6;
          box-shadow: 0 8px 20px rgba(59,130,246,0.12);
        }

        .assignment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .assignment-title {
          font-weight: 700;
          color: #0f172a;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          font-size: 1rem;
          transition: color 0.2s;
        }

        .assignment-title:hover {
          color: #3b82f6;
        }

        .expand-icon {
          display: inline-flex;
          transition: transform 0.2s ease;
          color: #3b82f6;
        }

        .expand-icon.expanded {
          transform: rotate(90deg);
        }

        .assignment-participant {
          color: #475569;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .assignment-meta {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .assignment-duration {
          background: #ef4444;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .assignment-time {
          background: #10b981;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .timer-controls-assignment {
          display: flex;
          gap: 0.25rem;
          align-items: center;
        }

        .timer-btn-small {
          padding: 0.25rem 0.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.7rem;
          font-weight: 600;
          transition: all 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: #e2e8f0;
          color: #1e293b;
        }

        .timer-btn-small.start {
          background-color: #10b981;
          color: white;
        }

        .timer-btn-small.pause {
          background-color: #f59e0b;
          color: white;
        }

        .timer-btn-small.reset {
          background-color: #ef4444;
          color: white;
        }

        .timer-btn-small:hover {
          transform: scale(1.02);
          filter: brightness(1.05);
        }

        .recorded-time {
          background: #64748b;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-family: "Courier New", monospace;
          font-weight: 500;
        }

        .expandable-content {
          margin-top: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          border-left: 3px solid #3b82f6;
          animation: slideDown 0.3s ease;
          line-height: 1.6;
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
            max-height: 2000px;
            padding-top: 1rem;
            padding-bottom: 1rem;
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
          background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
          border: 1px solid #e1e8ed;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 28px;
          max-height: 350px;
          overflow-y: auto;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .bible-verses::-webkit-scrollbar {
          width: 8px;
        }

        .bible-verses::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .bible-verses::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
        }

        .bible-verses p {
          margin: 12px 0;
          line-height: 1.8;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .bible-verses p:hover {
          background-color: rgba(102, 126, 234, 0.08);
        }

        .bible-verses strong {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 700;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 12px;
          font-size: 0.85em;
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
        }

        .lesson-section {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px;
          margin-top: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .lesson-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }

        .lesson-header {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .lesson-header h4 {
          color: #1a202c;
          margin: 0 0 12px 0;
          font-size: 1.4em;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .lesson-reference {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85em;
          display: inline-block;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
          letter-spacing: 0.02em;
        }

        .lesson-book {
          color: #6b46c1;
          font-style: italic;
          font-size: 0.95em;
          margin-top: 12px;
          text-align: center;
          font-weight: 500;
          padding: 8px 16px;
          background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
          border-radius: 10px;
          display: inline-block;
        }

        .lesson-scripture {
          color: #047857;
          font-weight: 700;
          font-size: 0.9em;
          text-align: center;
          margin-top: 10px;
          padding: 6px 14px;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border-radius: 8px;
          display: inline-block;
        }

        .tip-box {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border: 1px solid #fbbf24;
          border-left: 4px solid #f59e0b;
          border-radius: 12px;
          padding: 16px 20px;
          margin-top: 16px;
          font-size: 0.95em;
          position: relative;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
        }

        .tip-box::before {
          content: '💡';
          position: absolute;
          top: -10px;
          left: 16px;
          background: white;
          padding: 0 6px;
          font-size: 1.1em;
        }

        .tip-box strong {
          color: #d97706;
          font-weight: 700;
        }

        .lesson-summary {
          background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
          border-left: 4px solid #f97316;
          padding: 20px;
          margin-bottom: 24px;
          border-radius: 0 16px 16px 0;
          box-shadow: 0 2px 8px rgba(249, 115, 22, 0.1);
        }

        .lesson-summary h5 {
          color: #c2410c;
          margin: 0 0 12px 0;
          font-size: 1em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .lesson-summary p {
          color: #7c2d12;
          line-height: 1.7;
          margin: 0;
        }

        .lesson-content h5 {
          color: #1e40af;
          margin: 0 0 20px 0;
          font-size: 1.1em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding-bottom: 10px;
          border-bottom: 2px dashed #93c5fd;
        }

        .lesson-point {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #10b981;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }

        .lesson-point:hover {
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.15);
          transform: translateY(-2px);
        }

        .lesson-point h6 {
          color: #047857;
          margin: 0 0 12px 0;
          font-size: 1.1em;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lesson-point h6::before {
          content: '✦';
          color: #10b981;
          font-size: 0.8em;
        }

        .lesson-point p {
          color: #374151;
          line-height: 1.7;
          margin: 0;
        }

        .lesson-point ul {
          margin: 8px 0 0 0;
          padding-left: 0;
          list-style: none;
        }

        .lesson-point li {
          margin: 10px 0;
          line-height: 1.6;
          padding: 10px 12px 10px 36px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-radius: 10px;
          position: relative;
          color: #166534;
        }

        .lesson-point li::before {
          content: '→';
          position: absolute;
          left: 12px;
          color: #10b981;
          font-weight: bold;
        }

        .lesson-point em {
          color: #dc2626;
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          padding: 3px 8px;
          border-radius: 6px;
          font-style: normal;
          font-weight: 500;
        }

        .assignment-content {
          max-width: 100%;
        }

        .assignment-details {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          position: relative;
          overflow: hidden;
        }

        .assignment-details::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #06b6d4 0%, #0891b2 100%);
        }

        .assignment-details h4 {
          color: #0e7490;
          margin: 0 0 16px 0;
          font-size: 1.2em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .assignment-details h4::before {
          content: '📋';
        }

        .assignment-details p {
          margin: 10px 0;
          line-height: 1.7;
          padding: 10px 16px;
          background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);
          border-radius: 10px;
          color: #155e75;
        }

        .assignment-details p strong {
          color: #0e7490;
          font-weight: 700;
        }

        .lesson-description {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border-left: 4px solid #f59e0b;
          padding: 18px;
          margin: 18px 0;
          border-radius: 0 12px 12px 0;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.1);
        }

        .lesson-description em {
          color: #92400e;
          font-style: italic;
          line-height: 1.7;
        }

        .lesson-description ul {
          margin: 12px 0;
          padding-left: 0;
          list-style: none;
        }

        .lesson-description li {
          margin: 8px 0;
          padding-left: 24px;
          position: relative;
          color: #78350f;
        }

        .lesson-description li::before {
          content: '•';
          position: absolute;
          left: 8px;
          color: #f59e0b;
          font-weight: bold;
        }

        .evaluation-section {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
          border: 1px solid #bbf7d0;
          border-radius: 20px;
          padding: 28px;
          margin-top: 24px;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);
          position: relative;
          overflow: hidden;
        }

        .evaluation-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
        }

        .evaluation-section h5 {
          color: #166534;
          margin: 0 0 20px 0;
          text-align: center;
          font-size: 1.2em;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .evaluation-section h5::before {
          content: '📝';
        }

        .evaluation-options {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .evaluation-good {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 1px solid #86efac;
          border-left: 4px solid #22c55e;
          padding: 20px;
          border-radius: 0 16px 16px 0;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
        }

        .evaluation-good h6 {
          color: #166534;
          margin: 0 0 12px 0;
          font-size: 1em;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .evaluation-good h6::before {
          content: '✓';
          background: #22c55e;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75em;
          font-weight: bold;
        }

        .evaluation-improve {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border: 1px solid #fde047;
          border-left: 4px solid #eab308;
          padding: 20px;
          border-radius: 0 16px 16px 0;
          box-shadow: 0 2px 8px rgba(234, 179, 8, 0.1);
        }

        .evaluation-improve h6 {
          color: #854d0e;
          margin: 0 0 12px 0;
          font-size: 1em;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .evaluation-improve h6::before {
          content: '↗';
          background: #eab308;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75em;
          font-weight: bold;
        }

        .evaluation-good p, .evaluation-improve p {
          margin: 0;
          font-style: italic;
          line-height: 1.7;
          color: #374151;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
        }

        @media (max-width: 768px) {
          .evaluation-options {
            gap: 12px;
          }
         
          .evaluation-good, .evaluation-improve {
            padding: 16px;
          }

          .lesson-section {
            padding: 20px;
            border-radius: 16px;
          }

          .lesson-point {
            padding: 16px;
          }

          .bible-verses {
            padding: 16px;
            max-height: 280px;
          }

          .assignment-details {
            padding: 18px;
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
                  {isGlobalTimerRunning ? <Pause size={14} style={{ marginRight: 4 }} /> : <Play size={14} style={{ marginRight: 4 }} />}
                  {isGlobalTimerRunning ? "Pausar" : "Iniciar"}
                </button>
                <button className="timer-btn reset" onClick={handleGlobalReset}>
                  <Square size={14} style={{ marginRight: 4 }} /> Reiniciar
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
          <div className="meeting-date">25-31 DE MAYO | ISAÍAS 65, 66</div>
          <div className="meeting-time">7:00 p.m.</div>
          <div className="president-info">
            <strong>Presidente:</strong> Santiago Caballero Suárez
          </div>
        </div>

        {/* Opening */}
        <div className="section">
          <div className="song-prayer song">
            <Mic size={16} style={{ display: 'inline', marginRight: 8 }} />
            <strong>Canción:</strong> 24
          </div>
          <div className="song-prayer prayer">
            <Heart size={16} style={{ display: 'inline', marginRight: 8 }} />
            <strong>Oración Inicial:</strong> Santiago Caballero Suárez
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
                <button className="timer-btn-small start"><Play size={12} /></button>
                <button className="timer-btn-small reset"><Square size={12} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Tesoros de la Biblia */}
        <div className="section">
          <h2 className="section-title">
            <BookOpen size={20} />
            TESOROS DE LA BIBLIA
            <span className="section-time">7:04 p.m.</span>
          </h2>

          {assignments.slice(0, 3).map((assignment) => (
            <div key={assignment.id} className={`assignment ${assignment.isExpanded ? "expanded" : ""}`}>
              <div className="assignment-header">
                <div className="assignment-title" onClick={() => toggleAssignmentExpansion(assignment.id)}>
                  {assignment.expandableContent && (
                    <span className={`expand-icon ${assignment.isExpanded ? "expanded" : ""}`}>
                      {assignment.isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </span>
                  )}
                  {assignment.title}
                </div>
                <div className="assignment-meta">
                  {assignment.time && <span className="assignment-time"><Clock size={12} style={{ marginRight: 4 }} />{assignment.time}</span>}
                  {assignment.duration && <span className="assignment-duration"><Timer size={12} style={{ marginRight: 4 }} />{assignment.duration}</span>}
                  <div className="timer-controls-assignment">
                    <button
                      className={`timer-btn-small ${assignment.timerRunning ? "pause" : "start"}`}
                      onClick={() => startAssignmentTimer(assignment.id)}
                    >
                      {assignment.timerRunning ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                    <button className="timer-btn-small reset" onClick={() => resetAssignmentTimer(assignment.id)}>
                      <Square size={12} />
                    </button>
                    {(assignment.recordedTime || 0) > 0 && (
                      <span className="recorded-time">{formatTime(assignment.recordedTime || 0)}</span>
                    )}
                  </div>
                </div>
              </div>
              {assignment.participant && <div className="assignment-participant"><User size={14} style={{ marginRight: 6 }} />{assignment.participant}</div>}
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
            <Target size={20} />
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

          {assignments.slice(3, 7).map((assignment) => (
            <div key={assignment.id} className={`assignment ${assignment.isExpanded ? "expanded" : ""}`}>
              <div className="assignment-header">
                <div className="assignment-title" onClick={() => toggleAssignmentExpansion(assignment.id)}>
                  {assignment.expandableContent && (
                    <span className={`expand-icon ${assignment.isExpanded ? "expanded" : ""}`}>
                      {assignment.isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </span>
                  )}
                  {assignment.title}
                </div>
                <div className="assignment-meta">
                  {assignment.time && <span className="assignment-time"><Clock size={12} style={{ marginRight: 4 }} />{assignment.time}</span>}
                  {assignment.duration && <span className="assignment-duration"><Timer size={12} style={{ marginRight: 4 }} />{assignment.duration}</span>}
                  <div className="timer-controls-assignment">
                    <button
                      className={`timer-btn-small ${assignment.timerRunning ? "pause" : "start"}`}
                      onClick={() => startAssignmentTimer(assignment.id)}
                    >
                      {assignment.timerRunning ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                    <button className="timer-btn-small reset" onClick={() => resetAssignmentTimer(assignment.id)}>
                      <Square size={12} />
                    </button>
                    {(assignment.recordedTime || 0) > 0 && (
                      <span className="recorded-time">{formatTime(assignment.recordedTime || 0)}</span>
                    )}
                  </div>
                </div>
              </div>
              {assignment.participant && <div className="assignment-participant"><User size={14} style={{ marginRight: 6 }} />{assignment.participant}</div>}
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
            <Heart size={20} />
            NUESTRA VIDA CRISTIANA
            <span className="section-time">7:46 p.m.</span>
          </h2>

          <div className="song-prayer song">
            <Mic size={16} style={{ display: 'inline', marginRight: 8 }} />
            <strong>Canción:</strong> 80 - Prueben y vean que Jehová es bueno
          </div>

          {assignments.slice(7).map((assignment) => (
            <div key={assignment.id} className={`assignment ${assignment.isExpanded ? "expanded" : ""}`}>
              <div className="assignment-header">
                <div className="assignment-title" onClick={() => toggleAssignmentExpansion(assignment.id)}>
                  {assignment.expandableContent && (
                    <span className={`expand-icon ${assignment.isExpanded ? "expanded" : ""}`}>
                      {assignment.isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </span>
                  )}
                  {assignment.title}
                </div>
                <div className="assignment-meta">
                  {assignment.time && <span className="assignment-time"><Clock size={12} style={{ marginRight: 4 }} />{assignment.time}</span>}
                  {assignment.duration && <span className="assignment-duration"><Timer size={12} style={{ marginRight: 4 }} />{assignment.duration}</span>}
                  <div className="timer-controls-assignment">
                    <button
                      className={`timer-btn-small ${assignment.timerRunning ? "pause" : "start"}`}
                      onClick={() => startAssignmentTimer(assignment.id)}
                    >
                      {assignment.timerRunning ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                    <button className="timer-btn-small reset" onClick={() => resetAssignmentTimer(assignment.id)}>
                      <Square size={12} />
                    </button>
                    {(assignment.recordedTime || 0) > 0 && (
                      <span className="recorded-time">{formatTime(assignment.recordedTime || 0)}</span>
                    )}
                  </div>
                </div>
              </div>
              {assignment.participant && <div className="assignment-participant"><User size={14} style={{ marginRight: 6 }} />{assignment.participant}</div>}
              {assignment.isExpanded && assignment.expandableContent && (
                <div
                  className="expandable-content"
                  dangerouslySetInnerHTML={{ __html: assignment.expandableContent }}
                />
              )}
            </div>
          ))}
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
                <button className="timer-btn-small start"><Play size={12} /></button>
                <button className="timer-btn-small reset"><Square size={12} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Anuncios - ACTUALIZADOS SEGÚN SOLICITUD */}
        <div className="section announcements-section">
          <div className="announcements-header">
            <h2 className="announcements-title">
              <AlertCircle size={20} />
              ANUNCIOS
              <span className="section-time">8:33 p.m.</span>
            </h2>
          </div>

          <div className="announcements-list">
            <div className="announcement-item">
              <h4>1. Bienvenida a nuevo hermano bautizado</h4>
              <p>Le queremos dar la bienvenida al hermano Brandon Castillo como Testigo bautizado.</p>
            </div>

            <div className="announcement-item">
              <h4>2. Agradecimiento a voluntarios de la asamblea</h4>
              <p>El cuerpo de ancianos agradece a los hermanos que participaron en la asamblea como voluntarios. Gracias a su trabajo, las labores quedaron muy bien.</p>
            </div>

            <div className="announcement-item">
              <h4>3. Solicitud de precursores durante visita del superintendente de circuito:</h4>
              <p><strong>Solicitud de precursores durante visita del superintendente de circuito:</strong> Se invita a los hermanos que desean servir como precursores auxiliares o regulares en la visita del circuito en el mes de julio a pasar su solicitud al comité de servicio, compuesto por:</p>
              <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                <li>Nehemías Caballero</li>
                <li>Leonardo Sotomayor</li>
                <li>Elder Gómez</li>
              </ul>
            </div>

            <div className="announcement-item">
              <h4>4. Listas de alojamiento para asamblea regional</h4>
              <p>Ha llegado una carta con información sobre la Lista de alojamiento para la asamblea regional y un documento titulado <strong>"Puntos a recordar al reservar hotel para la asamblea regional (CO-39)"</strong>. Se pondrán en el tablero de anuncios cuando termine esta reunión. En la carta se explica cómo acceder a la lista de hoteles y cuándo se pueden empezar a hacer las reservas.</p>
            </div>

            <div className="announcement-item">
              <h4>5. Solicitudes de publicaciones anuales</h4>
              <p>Cada año se hace una solicitud para publicaciones como: <strong>Examinando las Escrituras</strong>, <strong>Índice de las publicaciones Watchtower 2026</strong>, <strong>Volúmenes 2026</strong>. Invitamos a quienes usan estas publicaciones en físico a que hagan su pedido con el hermano Juan Peinado y Carlos Tafur. La cantidad solicitada a la sucursal corresponde a la cantidad real pedida por los publicadores. La fecha límite para hacer este pedido es el <strong>29 de mayo, este viernes</strong>.</p>
            </div>

            <div className="announcement-item">
              <h4>6. Lectura de una carta</h4>
              <p>Se procederá a leer una carta.</p>
            </div>
          </div>
        </div>

        {/* Final Section */}
        <div className="section">
          <div className="song-prayer song" style={{ marginTop: "20px" }}>
            <Mic size={16} style={{ display: 'inline', marginRight: 8 }} />
            <strong>8:35 p.m. - Canción:</strong> 55 - No los temas
          </div>
          <div className="song-prayer prayer">
            <Heart size={16} style={{ display: 'inline', marginRight: 8 }} />
            <strong>Oración Final:</strong> Victor Santiz
            <div style={{ marginTop: "10px", fontSize: "0.9em", fontWeight: "bold", color: "#666" }}>
              🕐 Finalización del programa: 8:35 p.m.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}