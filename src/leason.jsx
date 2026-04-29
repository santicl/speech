"use client";
import { useState, useEffect, useRef } from "react";

export default function DiscourseLessons80And81() {
  const [globalTime, setGlobalTime] = useState(0);
  const [globalRunning, setGlobalRunning] = useState(false);
  const [timerExpanded, setTimerExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (globalRunning) {
      intervalRef.current = setInterval(() => {
        setGlobalTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [globalRunning]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="page-wrapper" style={{ fontSize: `${fontSize}px` }}>
      {/* TIMER */}
      <div
        className={`timer-float ${timerExpanded ? "expanded" : "collapsed"}`}
        onClick={() => !timerExpanded && setTimerExpanded(true)}
      >
        <div className="timer-display">{formatTime(globalTime)}</div>
        {timerExpanded ? (
          <div className="timer-controls">
            <button
              className="timer-btn start"
              onClick={(e) => {
                e.stopPropagation();
                setGlobalRunning(!globalRunning);
              }}
            >
              {globalRunning ? "Pausar" : "Iniciar"}
            </button>
            <button
              className="timer-btn reset"
              onClick={(e) => {
                e.stopPropagation();
                setGlobalRunning(false);
                setGlobalTime(0);
              }}
            >
              Reiniciar
            </button>
            <div
              className="font-control"
              onClick={(e) => e.stopPropagation()}
            >
              <label>Fuente: {fontSize}px</label>
              <input
                type="range"
                min="12"
                max="28"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>
            <button
              className="timer-btn collapse"
              onClick={(e) => {
                e.stopPropagation();
                setTimerExpanded(false);
              }}
            >
              Minimizar
            </button>
          </div>
        ) : (
          <div className="timer-hint">Toca para expandir</div>
        )}
      </div>

      {/* CONTENT */}
      <div className="content-area">
        {/* TEMA GENERAL */}
        <div className="theme-card">
          <h2 className="theme-title">TEMA GENERAL</h2>
          <p className="theme-text">Ensenanzas de Jesus y aplicacion practica para los siervos de Jehova.</p>
        </div>

        {/* LESSON 80 */}
        <div className="lesson-card">
          <div className="lesson-header">
            <span className="lesson-number">80</span>
            <h1 className="lesson-title">Jesus elige a los 12 apostoles</h1>
          </div>

          <div className="intro-section">
            <p>Jesus paso toda la noche orando en una montana.</p>
            <p>A la manana siguiente reunio a algunos discipulos y eligio a 12 apostoles para una labor especial.</p>
          </div>

          <div className="section-label">Preguntas principales</div>

          <div className="main-question">
            <span className="q-badge main-badge">P1</span>
            <p>A quienes eligio Jesus para que fueran sus 12 apostoles?</p>
          </div>

          <div className="main-question">
            <span className="q-badge main-badge">P2</span>
            <p>Que les encargo Jesus a sus apostoles?</p>
          </div>

          <div className="section-label answer-label">Respuestas</div>

          <div className="answer-block">
            <div className="answer-header">Respuesta 1</div>
            <p>Jesus eligio a:</p>
            <div className="apostles-grid">
              <div className="apostle-item">1. Pedro</div>
              <div className="apostle-item">2. Andres</div>
              <div className="apostle-item">3. Santiago</div>
              <div className="apostle-item">4. Juan</div>
              <div className="apostle-item">5. Felipe</div>
              <div className="apostle-item">6. Bartolome</div>
              <div className="apostle-item">7. Tomas</div>
              <div className="apostle-item">8. Mateo</div>
              <div className="apostle-item">9. Santiago hijo de Alfeo</div>
              <div className="apostle-item">10. Tadeo</div>
              <div className="apostle-item">11. Simon</div>
              <div className="apostle-item">12. Judas Iscariote</div>
            </div>
          </div>

          <div className="answer-block">
            <div className="answer-header">Respuesta 2</div>
            <p>Jesus les encargo:</p>
            <ul className="task-list">
              <li>Viajar con el.</li>
              <li>Aprender de sus ensenanzas.</li>
              <li>Ser preparados para predicar.</li>
              <li>Ser enviados a predicar las buenas noticias.</li>
            </ul>
            <p>Jesus los preparo muy bien para su trabajo y estarian con el en momentos importantes de su vida, antes de su muerte y despues de su resurreccion.</p>
          </div>

          <div className="section-label additional-label">Textos para explicar y aplicar</div>

          <div className="bible-text">
            <div className="bible-ref">Juan 15:15</div>
            <p>Jesus llamo amigos a sus discipulos porque les enseno todo lo que habia aprendido de su Padre.</p>
            <div className="application-box">
              <strong>Aplicacion:</strong>
              <p>Jehova y Jesus valoran la amistad, la confianza y la ensenanza espiritual.</p>
            </div>
          </div>

          <div className="bible-text">
            <div className="bible-ref">Efesios 2:20-22</div>
            <p>La congregacion cristiana esta edificada sobre el fundamento de los apostoles y profetas, siendo Cristo la piedra angular.</p>
            <div className="application-box">
              <strong>Aplicacion:</strong>
              <p>Debemos valorar la organizacion de Jehova y mantenernos unidos espiritualmente.</p>
            </div>
          </div>

          <div className="reflection-section">
            <h3 className="reflection-title">¿Que nos ensena este relato acerca de Jehova?</h3>
            <ul className="reflection-list">
              <li>Jehova escucha las oraciones.</li>
              <li>Jehova guia decisiones importantes.</li>
              <li>Jehova confia responsabilidades a personas imperfectas.</li>
              <li>Jehova organiza a su pueblo con amor y sabiduria.</li>
            </ul>
          </div>

          <div className="lessons-section">
            <h3 className="lessons-title">¿Qué Lecciones practicas que podemos aprender de este relato?</h3>
            <ul className="lessons-list">
              <li>Orar antes de tomar decisiones importantes.</li>
              <li>Ser humildes y aceptar asignaciones.</li>
              <li>Prepararnos para servir mejor a Jehova.</li>
              <li>Ser fieles en cualquier responsabilidad.</li>
              <li>Valorar la amistad espiritual.</li>
            </ul>
          </div>

          <div className="lessons-section">
            <h3 className="lessons-title">¿Como se podria aplicar la informacion en la familia, la congregacion o predicacion?</h3>
          </div>
        </div>

        {/* LESSON 81 */}
        <div className="lesson-card">
          <div className="lesson-header">
            <span className="lesson-number">81</span>
            <h1 className="lesson-title">El Sermon del Monte</h1>
          </div>

          <div className="intro-section">
            <p>Jesus enseno a una multitud verdades profundas y practicas.</p>
            <p>Su manera de ensenar impacto a todos porque todo lo que ensenaba venia de Jehova.</p>
          </div>

          <div className="section-label">Preguntas principales</div>

          <div className="main-question">
            <span className="q-badge main-badge">P1</span>
            <p>Que tenemos que hacer para ser amigos de Jehova?</p>
          </div>

          <div className="main-question">
            <span className="q-badge main-badge">P2</span>
            <p>Como quiere Jehova que tratemos a los demas?</p>
          </div>

          <div className="main-question">
            <span className="q-badge main-badge">P3</span>
            <p>Cual es la fuente de la verdadera felicidad?</p>
          </div>

          <div className="section-label answer-label">Respuestas</div>

          <div className="answer-block">
            <div className="answer-header">Respuesta 1</div>
            <p>Para ser amigos de Jehova debemos:</p>
            <ul className="task-list">
              <li>Reconocer que necesitamos a Jehova.</li>
              <li>Aprender a amarlo.</li>
              <li>Amar a otras personas.</li>
              <li>Ser buenos y justos con todos.</li>
              <li>Amar incluso a nuestros enemigos.</li>
            </ul>
          </div>

          <div className="answer-block">
            <div className="answer-header">Respuesta 2</div>
            <p>Jehova quiere que:</p>
            <ul className="task-list">
              <li>Amemos a amigos y enemigos.</li>
              <li>Perdonemos de corazon.</li>
              <li>Pidamos perdon cuando sea necesario.</li>
              <li>Tratemos a los demas como queremos ser tratados.</li>
            </ul>
          </div>

          <div className="answer-block">
            <div className="answer-header">Respuesta 3</div>
            <p>La verdadera felicidad viene de:</p>
            <ul className="task-list">
              <li>Tener amistad con Jehova.</li>
              <li>Ser humildes.</li>
              <li>Ser pacificos.</li>
              <li>Hacer lo correcto.</li>
              <li>Poner primero lo espiritual.</li>
            </ul>
          </div>

          <div className="section-label additional-label">Textos para leer y aplicar</div>

          <div className="bible-text">
            <div className="bible-ref">Mateo 11:29</div>
            <p>Jesus invita a aprender de el porque es apacible y humilde.</p>
            <div className="application-box">
              <strong>Aplicacion:</strong>
              <p>Debemos imitar la humildad y bondad de Jesus.</p>
            </div>
          </div>

          <div className="bible-text">
            <div className="bible-ref">Mateo 7:28, 29</div>
            <p>La gente quedo impactada por su forma de ensenar.</p>
            <div className="application-box">
              <strong>Aplicacion:</strong>
              <p>Jesus ensenaba con autoridad porque transmitia la verdad de Jehova.</p>
            </div>
          </div>

          <div className="reflection-section">
            <h3 className="reflection-title">¿Que nos ensena este relato acerca de Jehova?</h3>
            <ul className="reflection-list">
              <li>Jehova desea que seamos felices.</li>
              <li>Jehova ensena amor, justicia y misericordia.</li>
              <li>Jehova valora la humildad.</li>
              <li>Jehova quiere paz entre las personas.</li>
            </ul>
          </div>

          <div className="lessons-section">
            <h3 className="lessons-title">¿Qué Lecciones practicas que podemos aprender de este relato?</h3>
            <ul className="lessons-list">
              <li>Amar a todos sin favoritismo.</li>
              <li>Perdonar rapidamente.</li>
              <li>Ser humildes.</li>
              <li>Tratar bien a los demas.</li>
              <li>Buscar primero lo espiritual.</li>
              <li>Imitar la forma de ensenar de Jesus.</li>
            </ul>
          </div>
          <div className="lessons-section">
            <h3 className="lessons-title">¿Como se podria aplicar la informacion en la familia, la congregacion o predicacion?</h3>
          </div>
        </div>

        {/* NECESIDADES LOCALES */}
        <div className="local-needs-card">
          <div className="local-needs-header">
            <span className="local-needs-icon">📍</span>
            <h2 className="local-needs-title">NECESIDADES LOCALES: TORICES</h2>
          </div>

          <div className="local-needs-question">
            <span className="q-badge local-badge">?</span>
            <p>Por que es necesario apoyar los grupos de salida?</p>
          </div>

          <div className="local-needs-answer">
            <p>Apoyar los grupos de salida:</p>
            <ul className="local-needs-list">
              <li>Fortalece la predicacion en el territorio.</li>
              <li>Ayuda a llegar a mas personas.</li>
              <li>Anima a los hermanos.</li>
              <li>Demuestra espiritu de cooperacion.</li>
              <li>Fortalece la unidad de la congregacion.</li>
              <li>Da buen ejemplo de apoyo a la organizacion de Jehova.</li>
            </ul>
          </div>
        </div>

        {/* RESUMEN FINAL */}
        <div className="summary-card">
          <h2 className="summary-title">RESUMEN FINAL</h2>

          <div className="summary-item">
            <span className="summary-number">80</span>
            <p>Jesus eligio y capacito a sus apostoles.</p>
          </div>

          <div className="summary-item">
            <span className="summary-number">81</span>
            <p>Jesus enseno como agradar a Jehova y como tratar a los demas.</p>
          </div>

          <div className="general-application">
            <h3>Aplicacion General</h3>
            <ul>
              <li>Orar siempre.</li>
              <li>Amar a Jehova.</li>
              <li>Amar al projimo.</li>
              <li>Servir con humildad.</li>
              <li>Apoyar la predicacion y la congregacion.</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 20px;
          padding-top: 80px;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          color: #e8e8e8;
          line-height: 1.7;
        }

        /* ========== TIMER ========== */
        .timer-float {
          position: fixed;
          top: 12px;
          right: 12px;
          z-index: 9999;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
        }
        .timer-float.collapsed {
          padding: 10px 20px;
        }
        .timer-float.collapsed:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 40px rgba(0,0,0,0.7);
        }
        .timer-float.expanded {
          padding: 16px 20px;
          cursor: default;
          min-width: 200px;
        }
        .timer-display {
          font-family: 'Courier New', monospace;
          font-size: 1.8em;
          font-weight: 700;
          color: #00e676;
          text-align: center;
          letter-spacing: 3px;
        }
        .timer-hint {
          color: #666;
          font-size: 0.65em;
          text-align: center;
          margin-top: 2px;
        }
        .timer-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }
        .timer-btn {
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.85em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .timer-btn.start {
          background: #00e676;
          color: #0a0a0a;
        }
        .timer-btn.start:hover {
          background: #00c853;
        }
        .timer-btn.reset {
          background: #ff5252;
          color: #fff;
        }
        .timer-btn.reset:hover {
          background: #d50000;
        }
        .timer-btn.collapse {
          background: #2a2a2a;
          color: #888;
        }
        .timer-btn.collapse:hover {
          background: #333;
        }
        .font-control {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .font-control label {
          color: #888;
          font-size: 0.75em;
        }
        .font-control input[type="range"] {
          width: 100%;
          accent-color: #00e676;
        }

        /* ========== CONTENT ========== */
        .content-area {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        /* ========== THEME CARD ========== */
        .theme-card {
          background: linear-gradient(135deg, #1a2a3a 0%, #0d1f2d 100%);
          border-radius: 16px;
          padding: 28px 32px;
          text-align: center;
          border: 2px solid #42a5f5;
          box-shadow: 0 4px 24px rgba(66, 165, 245, 0.2);
        }
        .theme-title {
          font-size: 1.2em;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #42a5f5;
          margin: 0 0 12px 0;
        }
        .theme-text {
          font-size: 1.1em;
          color: #b8d4f0;
          margin: 0;
          font-weight: 500;
        }

        /* ========== LESSON CARD ========== */
        .lesson-card {
          background: #141414;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
          border: 1px solid #2a2a2a;
        }
        .lesson-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 3px solid #00e676;
        }
        .lesson-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: #00e676;
          color: #0a0a0a;
          font-size: 1.5em;
          font-weight: 800;
          border-radius: 14px;
          flex-shrink: 0;
        }
        .lesson-title {
          font-size: 1.5em;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.3;
        }

        /* ========== INTRO SECTION ========== */
        .intro-section {
          background: #1a1a2e;
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 20px;
          border-left: 4px solid #7c8cf5;
        }
        .intro-section p {
          margin: 8px 0;
          color: #b8c0ff;
        }

        /* ========== SECTION LABELS ========== */
        .section-label {
          font-size: 0.8em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 6px 14px;
          border-radius: 6px;
          margin: 24px 0 14px 0;
          display: inline-block;
          background: #1b3a1b;
          color: #00e676;
        }
        .answer-label {
          background: #1a2a3a;
          color: #42a5f5;
        }
        .additional-label {
          background: #3a2a0a;
          color: #ffb74d;
        }

        /* ========== MAIN QUESTIONS ========== */
        .main-question {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          margin: 10px 0;
          background: #0d2818;
          border-left: 5px solid #00e676;
          border-radius: 0 12px 12px 0;
        }
        .main-question p {
          margin: 0;
          font-weight: 600;
          font-size: 1.05em;
          color: #00e676;
        }
        .q-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          border-radius: 10px;
          font-size: 0.75em;
          font-weight: 800;
          flex-shrink: 0;
        }
        .main-badge {
          background: #00e676;
          color: #0a0a0a;
        }

        /* ========== ANSWERS ========== */
        .answer-block {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 20px 24px;
          margin: 12px 0;
          border: 1px solid #2a2a2a;
        }
        .answer-header {
          font-weight: 700;
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #42a5f5;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 2px solid #1a2a3a;
        }
        .answer-block p {
          margin: 8px 0;
          text-align: left;
          color: #d0d0d0;
        }

        /* ========== APOSTLES GRID ========== */
        .apostles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 12px;
        }
        .apostle-item {
          background: #0d2818;
          border: 1px solid #00e676;
          border-radius: 8px;
          padding: 10px 14px;
          color: #00e676;
          font-weight: 500;
          font-size: 0.95em;
        }

        /* ========== TASK LIST ========== */
        .task-list {
          margin: 12px 0;
          padding-left: 20px;
        }
        .task-list li {
          margin: 8px 0;
          color: #d0d0d0;
          position: relative;
        }
        .task-list li::marker {
          color: #00e676;
        }

        /* ========== BIBLE TEXTS ========== */
        .bible-text {
          background: #0a1f1a;
          border-left: 5px solid #26a69a;
          border-radius: 0 14px 14px 0;
          padding: 20px 26px;
          margin: 18px 0;
        }
        .bible-ref {
          display: inline-block;
          background: #26a69a;
          color: #fff;
          font-size: 0.78em;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 6px;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }
        .bible-text p {
          margin: 8px 0;
          color: #80cbc4;
        }

        /* ========== APPLICATION BOX ========== */
        .application-box {
          background: #1a2a2a;
          border-radius: 8px;
          padding: 14px 18px;
          margin-top: 12px;
          border: 1px solid #26a69a;
        }
        .application-box strong {
          color: #26a69a;
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .application-box p {
          margin: 6px 0 0 0;
          color: #b8d4d0;
        }

        /* ========== REFLECTION SECTION ========== */
        .reflection-section {
          background: #1a1a2e;
          border-radius: 14px;
          padding: 24px 28px;
          margin: 24px 0;
          border: 1px solid #3a3a5e;
        }
        .reflection-title {
          color: #b8c0ff;
          font-size: 1.1em;
          font-weight: 700;
          margin: 0 0 16px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #7c8cf5;
        }
        .reflection-list {
          margin: 0;
          padding-left: 20px;
        }
        .reflection-list li {
          margin: 10px 0;
          color: #c8d0ff;
        }
        .reflection-list li::marker {
          color: #7c8cf5;
        }

        /* ========== LESSONS SECTION ========== */
        .lessons-section {
          background: #1b2a1b;
          border-radius: 14px;
          padding: 24px 28px;
          margin: 24px 0;
          border: 1px solid #2a4a2a;
        }
        .lessons-title {
          color: #81c784;
          font-size: 1.1em;
          font-weight: 700;
          margin: 0 0 16px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #4caf50;
        }
        .lessons-list {
          margin: 0;
          padding-left: 20px;
        }
        .lessons-list li {
          margin: 10px 0;
          color: #a5d6a7;
        }
        .lessons-list li::marker {
          color: #4caf50;
        }

        /* ========== LOCAL NEEDS CARD ========== */
        .local-needs-card {
          background: linear-gradient(135deg, #2a1a2a 0%, #1a0a1a 100%);
          border-radius: 16px;
          padding: 28px 32px;
          border: 2px solid #ce93d8;
          box-shadow: 0 4px 24px rgba(206, 147, 216, 0.2);
        }
        .local-needs-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #ce93d8;
        }
        .local-needs-icon {
          font-size: 1.5em;
        }
        .local-needs-title {
          font-size: 1.2em;
          font-weight: 800;
          color: #ce93d8;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .local-needs-question {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          margin: 16px 0;
          background: #3a1a3a;
          border-left: 5px solid #ce93d8;
          border-radius: 0 12px 12px 0;
        }
        .local-needs-question p {
          margin: 0;
          font-weight: 600;
          font-size: 1.05em;
          color: #e1bee7;
        }
        .local-badge {
          background: #ce93d8;
          color: #1a0a1a;
        }
        .local-needs-answer {
          background: #2a1a2a;
          border-radius: 12px;
          padding: 20px 24px;
          border: 1px solid #4a2a4a;
        }
        .local-needs-answer p {
          margin: 0 0 12px 0;
          color: #e1bee7;
        }
        .local-needs-list {
          margin: 0;
          padding-left: 20px;
        }
        .local-needs-list li {
          margin: 8px 0;
          color: #d4b5d8;
        }
        .local-needs-list li::marker {
          color: #ce93d8;
        }

        /* ========== SUMMARY CARD ========== */
        .summary-card {
          background: linear-gradient(135deg, #1a3a1a 0%, #0d2a0d 100%);
          border-radius: 16px;
          padding: 28px 32px;
          border: 2px solid #00e676;
          box-shadow: 0 4px 24px rgba(0, 230, 118, 0.2);
        }
        .summary-title {
          font-size: 1.3em;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #00e676;
          margin: 0 0 24px 0;
          text-align: center;
          padding-bottom: 16px;
          border-bottom: 2px solid #00e676;
        }
        .summary-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          margin: 12px 0;
          background: #0d2818;
          border-radius: 12px;
          border: 1px solid #1b4a2a;
        }
        .summary-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: #00e676;
          color: #0a0a0a;
          font-size: 1.2em;
          font-weight: 800;
          border-radius: 12px;
          flex-shrink: 0;
        }
        .summary-item p {
          margin: 0;
          color: #a5d6a7;
          font-weight: 500;
          font-size: 1.05em;
        }
        .general-application {
          background: #1a3a2a;
          border-radius: 12px;
          padding: 20px 24px;
          margin-top: 20px;
          border: 1px solid #2a5a3a;
        }
        .general-application h3 {
          color: #00e676;
          font-size: 1em;
          font-weight: 700;
          margin: 0 0 14px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .general-application ul {
          margin: 0;
          padding-left: 20px;
        }
        .general-application li {
          margin: 8px 0;
          color: #a5d6a7;
        }
        .general-application li::marker {
          color: #00e676;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 600px) {
          .page-wrapper {
            padding: 15px;
            padding-top: 70px;
          }
          .lesson-card,
          .theme-card,
          .local-needs-card,
          .summary-card {
            padding: 20px;
          }
          .lesson-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
          .lesson-number {
            width: 50px;
            height: 50px;
            font-size: 1.3em;
          }
          .lesson-title {
            font-size: 1.3em;
          }
          .apostles-grid {
            grid-template-columns: 1fr;
          }
          .timer-float.expanded {
            left: 12px;
            right: 12px;
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
}
