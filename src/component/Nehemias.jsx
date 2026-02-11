import { useState, useEffect } from 'react';

export default function DiscourseSupportBrothers() {
  const [globalTime, setGlobalTime] = useState(0);
  const [isGlobalRunning, setIsGlobalRunning] = useState(false);
  const [isTimerExpanded, setIsTimerExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    let interval = null;
    if (isGlobalRunning) {
      interval = setInterval(() => {
        setGlobalTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGlobalRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleGlobalTimer = () => setIsGlobalRunning(!isGlobalRunning);
  const resetGlobalTimer = () => {
    setIsGlobalRunning(false);
    setGlobalTime(0);
  };

  return (
    <div className="discourse-container" style={{ fontSize: `${fontSize}px` }}>
      {/* Timer */}
      <div 
        className={`timer-widget ${isTimerExpanded ? 'expanded' : 'collapsed'}`}
        onClick={() => !isTimerExpanded && setIsTimerExpanded(true)}
      >
        <div className="timer-display">{formatTime(globalTime)}</div>
        {!isTimerExpanded && <span className="timer-hint">Toca para expandir</span>}
        {isTimerExpanded && (
          <div className="timer-controls" onClick={(e) => e.stopPropagation()}>
            <div className="timer-buttons">
              <button onClick={toggleGlobalTimer} className="btn-timer">
                {isGlobalRunning ? 'Pausar' : 'Iniciar'}
              </button>
              <button onClick={resetGlobalTimer} className="btn-timer btn-reset">
                Reiniciar
              </button>
            </div>
            <div className="font-control">
              <label>Tamano: {fontSize}px</label>
              <input
                type="range"
                min="14"
                max="28"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>
            <button 
              className="btn-collapse"
              onClick={() => setIsTimerExpanded(false)}
            >
              Minimizar
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="discourse-content">
        <h1 className="main-title">Apoyan con Carino a los Hermanos</h1>

        {/* Seccion 1 */}
        <section className="section">
          <p className="paragraph">
            Pablo amaba a los filipenses en sus cadenas de prision.
          </p>

          <div className="bible-text">
            <span className="bible-ref">Filipenses 2:7</span>
            <p>No, mas bien dejo todo lo que tenia y tomo la forma de un esclavo y se convirtio en un ser humano.</p>
            <span className="read-indicator">Leer</span>
          </div>

          <p className="paragraph">
            Les enviaron regalos y les ayudaron por medio de <strong>Epafrodito</strong>.
          </p>

          <div className="bible-text">
            <span className="bible-ref">Filipenses 2:25</span>
            <p>Pero por ahora veo necesario enviarles a Epafrodito, mi hermano, colaborador y companero de armas, a quien ustedes enviaron para que me ayudara en lo que necesitara.</p>
            <span className="read-indicator">Leer</span>
          </div>
        </section>

        {/* Seccion 2 */}
        <section className="section">
          <h2 className="section-title">Los precursores apoyan a los hermanos de la congregacion</h2>
          
          <p className="paragraph">Los impulsa el amor:</p>

          <div className="bible-text">
            <span className="bible-ref">Romanos 12:15, 16</span>
            <p>Alegrense con los que se alegran; lloren con los que lloran. Tengan hacia los demas la misma actitud que tienen hacia ustedes mismos; no se concentren en cosas grandiosas, sino dejense llevar por cosas humildes. No se vuelvan sabios a sus propios ojos.</p>
          </div>

          <div className="video-indicator">VIDEO</div>
        </section>

        {/* Seccion 3 */}
        <section className="section">
          <h2 className="section-title">Sus actos de bondad</h2>

          <div className="bible-text">
            <span className="bible-ref">Filipenses 4:18</span>
            <p>Sin embargo, tengo todo lo que me hace falta y mucho mas. Tengo todo lo que necesito, pues Epafrodito me entrego lo que ustedes me enviaron: un sacrificio de dulce aroma, que Dios acepta con agrado.</p>
            <span className="read-indicator">Leer</span>
          </div>
        </section>

        {/* Preguntas */}
        <section className="section questions-section">
          <h2 className="section-title">Preguntas</h2>
          
          <div className="question">
            <span className="question-number">1</span>
            <p>Que apoyo amoroso recibio Filipenses?</p>
          </div>

          <div className="question">
            <span className="question-number">2</span>
            <p>Como puede un texto bien dirigido ayudar a alguien desanimado?</p>
          </div>

          <div className="question">
            <span className="question-number">3</span>
            <p>Que te gusto de esta experiencia?</p>
          </div>
        </section>

        {/* Nota importante */}
        <div className="important-note">
          <p>Tenga la seguridad: aunque no se conozcan sus actos de bondad, Jehova lo considera como un dulce o algo agradable.</p>
          <span className="time-indicator">15 minutos</span>
        </div>

        {/* Necesidades Locales */}
        <section className="section local-needs">
          <h2 className="section-title">Necesidades Locales de los Precursores</h2>
          
          <p className="highlight-text">Elogios a los precursores regulares por su duro trabajo.</p>

          <div className="points-list">
            <div className="point">
              <span className="point-letter">a)</span>
              <p>Ocupados pero sacan tiempo: hijos, padres, madres solteros.</p>
            </div>
            <div className="point">
              <span className="point-letter">b)</span>
              <p>Actividad: Exhibidor, casa en casa informal, Cartas, Telefono.</p>
            </div>
          </div>

          <div className="bible-text">
            <span className="bible-ref">Mateo 24:14</span>
            <p>Y las buenas noticias del Reino se predicaran en toda la tierra habitada para testimonio a todas las naciones, y entonces vendra el fin.</p>
          </div>

          <div className="bible-text">
            <span className="bible-ref">Mateo 28:19, 20</span>
            <p>Asi que vayan y hagan discipulos de gente de todas las naciones. Bauticenlos en el nombre del Padre, del Hijo y del espiritu santo. Enseneles a obedecer todo lo que yo les he mandado. Y, recuerden, estare con ustedes todos los dias hasta la conclusion del sistema.</p>
          </div>

          <div className="numbered-points">
            <div className="numbered-point">
              <span className="number">1</span>
              <p>La organizacion de horarios personales, incluye la llegada temprano a las actividades espirituales, verificar promedio de horas.</p>
            </div>
            <div className="numbered-point">
              <span className="number">2</span>
              <div>
                <p>Conducir por lo menos un curso biblico y ayudar a otros publicadores a conseguir un curso biblico. Amor, sentimientos puros.</p>
                <ul className="sub-points">
                  <li>a) Tomar medidas.</li>
                  <li>b) Motivar para seguir trabajando.</li>
                  <li>c) Llegar temprano para dar hospitalidad.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="section conclusion">
          <h2 className="section-title">Conclusion</h2>
          
          <p className="paragraph">Demos Gracias a Jehova</p>

          <div className="bible-text conclusion-bible">
            <span className="bible-ref">Filipenses 1:3, 4</span>
            <p>Siempre le doy gracias a mi Dios cuando me acuerdo de ustedes, en cada uno de mis ruegos por todos ustedes. Hago estos ruegos con alegria.</p>
            <span className="read-indicator">Leer</span>
          </div>

          <p className="highlight-text">El los ama.</p>
          <p className="paragraph">Acudir a los ancianos.</p>
          <p className="paragraph">Rogar que Jehova los cuide.</p>

          <div className="bible-text conclusion-bible">
            <span className="bible-ref">Filipenses 4:6, 7</span>
            <p>No se angustien por nada. Mas bien, en cualquier situacion, mediante oraciones y ruegos y dando gracias, haganle saber a Dios sus peticiones, y la paz de Dios, que esta mas alla de lo que ningun ser humano puede entender, protegera sus corazones y sus mentes por medio de Cristo Jesus.</p>
            <span className="read-indicator">Leer</span>
          </div>

          <p className="end-text">Fin</p>
        </section>
      </div>

      <style jsx>{`
        .discourse-container {
          min-height: 100vh;
          background-color: #0a0a0a;
          color: #ffffff;
          padding: 20px;
          padding-top: 80px;
          font-family: 'Georgia', 'Times New Roman', serif;
          line-height: 1.7;
        }

        /* Timer Styles */
        .timer-widget {
          position: fixed;
          top: 15px;
          right: 15px;
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          border: 1px solid #444;
          border-radius: 12px;
          padding: 12px 16px;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease;
        }

        .timer-widget.collapsed {
          cursor: pointer;
        }

        .timer-widget.collapsed:hover {
          transform: scale(1.05);
          border-color: #666;
        }

        .timer-widget.expanded {
          padding: 16px 20px;
        }

        .timer-display {
          font-family: 'Courier New', monospace;
          font-size: 28px;
          font-weight: bold;
          color: #00ff88;
          text-align: center;
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        .timer-hint {
          display: block;
          font-size: 10px;
          color: #888;
          text-align: center;
          margin-top: 4px;
        }

        .timer-controls {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .timer-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-timer {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          background: #00ff88;
          color: #000;
          transition: all 0.2s;
        }

        .btn-timer:hover {
          background: #00cc6a;
        }

        .btn-reset {
          background: #ff4444;
          color: #fff;
        }

        .btn-reset:hover {
          background: #cc3333;
        }

        .font-control {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .font-control label {
          font-size: 11px;
          color: #aaa;
        }

        .font-control input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #333;
          cursor: pointer;
        }

        .btn-collapse {
          padding: 6px;
          background: transparent;
          border: 1px solid #555;
          border-radius: 4px;
          color: #888;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-collapse:hover {
          border-color: #888;
          color: #fff;
        }

        /* Content Styles */
        .discourse-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .main-title {
          font-size: 2em;
          text-align: center;
          margin-bottom: 40px;
          color: #00ff88;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
        }

        .section {
          margin-bottom: 35px;
          padding: 25px;
          background: #111;
          border-radius: 10px;
          border-left: 4px solid #00ff88;
        }

        .section-title {
          font-size: 1.3em;
          color: #00ff88;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #333;
        }

        .paragraph {
          margin-bottom: 15px;
          text-align: left;
          color: #e0e0e0;
        }

        /* Bible Text */
        .bible-text {
          background: #1a2a1a;
          border: 1px solid #2d4a2d;
          border-left: 4px solid #00ff88;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          font-size: 1.1em;
        }

        .bible-ref {
          display: inline-block;
          background: #00ff88;
          color: #000;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8em;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .bible-text p {
          color: #c0ffc0;
          font-style: italic;
          line-height: 1.8;
          margin: 0;
        }

        .read-indicator {
          display: inline-block;
          margin-top: 10px;
          color: #888;
          font-size: 0.85em;
          font-style: normal;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Video Indicator */
        .video-indicator {
          background: linear-gradient(145deg, #ff4444, #cc0000);
          color: #fff;
          padding: 12px 24px;
          border-radius: 8px;
          text-align: center;
          font-weight: bold;
          font-size: 1.1em;
          letter-spacing: 2px;
          margin: 20px 0;
        }

        /* Questions */
        .questions-section {
          border-left-color: #ffaa00;
        }

        .questions-section .section-title {
          color: #ffaa00;
        }

        .question {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          background: #1a1a0a;
          border: 1px solid #4a4a2d;
          border-radius: 8px;
          padding: 15px 20px;
          margin-bottom: 12px;
        }

        .question-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          background: #ffaa00;
          color: #000;
          border-radius: 50%;
          font-weight: bold;
          flex-shrink: 0;
        }

        .question p {
          margin: 0;
          color: #ffe066;
          font-size: 1.05em;
        }

        /* Important Note */
        .important-note {
          background: linear-gradient(145deg, #2d1a2d, #1a0a1a);
          border: 2px solid #ff66ff;
          border-radius: 10px;
          padding: 25px;
          margin: 30px 0;
          text-align: center;
        }

        .important-note p {
          color: #ffccff;
          font-size: 1.15em;
          margin: 0 0 15px 0;
        }

        .time-indicator {
          display: inline-block;
          background: #ff66ff;
          color: #000;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9em;
        }

        /* Local Needs */
        .local-needs {
          border-left-color: #6699ff;
        }

        .local-needs .section-title {
          color: #6699ff;
        }

        .highlight-text {
          color: #66ccff;
          font-weight: bold;
          font-size: 1.1em;
          margin-bottom: 15px;
        }

        .points-list {
          margin: 20px 0;
        }

        .point {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          padding: 12px 15px;
          background: #0a1a2a;
          border-radius: 6px;
        }

        .point-letter {
          color: #6699ff;
          font-weight: bold;
          font-size: 1.1em;
        }

        .point p {
          margin: 0;
          color: #cce0ff;
        }

        .numbered-points {
          margin-top: 25px;
        }

        .numbered-point {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          padding: 20px;
          background: #0a1520;
          border-radius: 8px;
          border: 1px solid #1a3050;
        }

        .numbered-point .number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          background: #6699ff;
          color: #000;
          border-radius: 50%;
          font-weight: bold;
          font-size: 1.1em;
          flex-shrink: 0;
        }

        .numbered-point p {
          margin: 0 0 10px 0;
          color: #cce0ff;
        }

        .sub-points {
          margin: 10px 0 0 0;
          padding-left: 20px;
          list-style: none;
        }

        .sub-points li {
          color: #99ccff;
          margin-bottom: 8px;
          padding: 8px 12px;
          background: #0a2040;
          border-radius: 4px;
        }

        /* Conclusion */
        .conclusion {
          background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
          border: 2px solid #00ff88;
          border-left: 4px solid #00ff88;
        }

        .conclusion .section-title {
          text-align: center;
          font-size: 1.5em;
        }

        .conclusion-bible {
          background: #0a2010;
          border-color: #00cc66;
        }

        .end-text {
          text-align: center;
          font-size: 1.5em;
          color: #00ff88;
          margin-top: 30px;
          font-weight: bold;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .discourse-container {
            padding: 15px;
            padding-top: 90px;
          }

          .timer-widget {
            left: 50%;
            transform: translateX(-50%);
            right: auto;
          }

          .timer-widget.collapsed:hover {
            transform: translateX(-50%) scale(1.05);
          }

          .main-title {
            font-size: 1.5em;
          }

          .section {
            padding: 20px 15px;
          }

          .bible-text {
            padding: 15px;
          }

          .question {
            padding: 12px 15px;
          }
        }

        @media (max-width: 480px) {
          .discourse-container {
            padding: 10px;
            padding-top: 100px;
          }

          .main-title {
            font-size: 1.3em;
            letter-spacing: 1px;
          }

          .section {
            padding: 15px 12px;
            margin-bottom: 25px;
          }

          .timer-display {
            font-size: 24px;
          }

          .numbered-point {
            flex-direction: column;
            gap: 10px;
          }

          .point {
            flex-direction: column;
            gap: 8px;
          }
        }

        @media (min-width: 1024px) {
          .discourse-content {
            max-width: 900px;
          }

          .section {
            padding: 30px 35px;
          }

          .bible-text {
            padding: 25px 30px;
            font-size: 1.15em;
          }
        }
      `}</style>
    </div>
  );
}
