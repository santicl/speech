import { useState, useEffect, useRef } from "react";
import Imagen1 from '../src/img/1.jpg';
import Imagen2 from '../src/img/2.jpg';
import Imagen3 from '../src/img/3.jpg';

export default function DiscourseKingdomForever() {
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
                {/* LESSON 60 */}
                <div className="lesson-card">
                    <div className="lesson-header">
                        <span className="lesson-number">60</span>
                        <h1 className="lesson-title">El Reino que durara para siempre</h1>
                    </div>

                    <div className="lesson-image-section">
                        <img src={Imagen1} alt="Imagen leccion 60 - El Reino que durara para siempre" className="lesson-image" />
                    </div>

                    <div className="section-label">Preguntas principales</div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P1</span>
                        <p>Como supo Daniel lo que significaba el sueno de Nabucodonosor?</p>
                    </div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P2</span>
                        <p>Que significaba el sueno?</p>
                    </div>

                    <div className="section-label answer-label">Respuestas</div>

                    <div className="answer-block">
                        <div className="answer-header">Respuesta 1</div>
                        <p>Llamo a los magos y les dijo: <strong>"Expliquenme el sueno que tuve"</strong>.</p>
                        <p>Pero Daniel pidio tiempo al rey. Entonces el y sus amigos oraron a Jehova para que los ayudara.</p>
                        <p>Jehova le mostro el sueno de Nabucodonosor a Daniel en una vision.</p>
                    </div>

                    <div className="answer-block">
                        <div className="answer-header">Respuesta 2</div>
                        <p>Daniel dijo:</p>
                        <div className="quote-block">
                            <p><strong>"El sueno significa esto: tu reino es la cabeza de oro.</strong></p>
                            <p>La parte de plata es un reino que habra despues del tuyo.</p>
                            <p>El cobre representa otro reino, que vendra despues, y que gobernara sobre toda la Tierra.</p>
                            <p>Al final habra un reino dividido que tendra partes fuertes como el hierro y partes debiles como el barro.</p>
                            <p><strong>La piedra que se convierte en una montana es el Reino de Dios, que destruira a todos los demas reinos y durara para siempre".</strong></p>
                        </div>
                    </div>

                    <div className="section-label additional-label">Preguntas adicionales</div>

                    <div className="additional-question">
                        <span className="q-badge additional-badge">Opcional</span>
                        <p>Que ayuda usaron Daniel y sus 3 amigos?</p>
                    </div>

                    <div className="bible-text">
                        <div className="bible-ref">Apocalipsis 16:16</div>
                        <p>"Reunieron a los reyes en el lugar que en hebreo se llama Armagedon".</p>
                    </div>

                    <div className="additional-question">
                        <span className="q-badge additional-badge">Adicional</span>
                        <p>A quienes representa esos reyes que menciona Apocalipsis 16:16? (Leer)</p>
                    </div>

                    <div className="additional-question">
                        <span className="q-badge additional-badge">Adicional</span>
                        <p>Esto que menciona Apocalipsis 16:16 ocurrira en que parte de la estatua?</p>
                    </div>

                    <div className="bible-text large">
                        <div className="bible-ref">Daniel 2:44, 45 (leer y explicar)</div>
                        <p><sup>44</sup> "En los dias de esos reyes, el Dios del cielo establecera un reino que nunca sera destruido ni pasara a manos de ningun otro pueblo. Este reino hara anicos y pondra fin a todos esos reinos, y sera el unico que permanecera para siempre, <sup>45</sup> tal como viste que pasaba cuando se corto una piedra de la montana, aunque no con manos humanas, y la piedra hizo anicos el hierro, el cobre, el barro, la plata y el oro. El Gran Dios le ha revelado al rey lo que sucedera en el futuro. El sueno es verdadero y su interpretacion es digna de confianza".</p>
                    </div>

                    <div className="prophecy-section">
                        <h3 className="prophecy-title">Profecia y cumplimiento</h3>
                        <div className="prophecy-grid">
                            <div className="prophecy-card prophecy">
                                <h4>Profecia</h4>
                                <ul>
                                    <li>El jinete del "caballo blanco" completa "su victoria" al destruir a Gog y su ejercito.</li>
                                    <li>Se arroja a "la bestia salvaje" en el "lago de fuego" y se hace anicos a la estatua gigante.</li>
                                </ul>
                            </div>
                            <div className="prophecy-card fulfillment">
                                <h4>Cumplimiento</h4>
                                <ul>
                                    <li>Jesus, el Rey del Reino de Dios, sale en defensa del pueblo de Jehova.</li>
                                    <li>Junto con los 144.000 y los angeles, destruye a la coalicion de naciones.</li>
                                    <li>Asi acaba el mundo de Satanas.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="reflection-section">
                        <h3 className="reflection-title">Reflexion / Aplicacion - Leccion 60</h3>
                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R1</span>
                            <p>Que nos ensena este relato sobre Jehova?</p>
                        </div>
                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R2</span>
                            <p>Que lecciones practicas podemos aprender?</p>
                        </div>
                        <div className="optional-apply">
                            <span className="optional-tag">Opcional</span>
                            <p>Como aplicar:</p>
                            <ul>
                                <li>En la congregacion</li>
                                <li>En la familia</li>
                                <li>En la predicacion?</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* LESSON 61 */}
                <div className="lesson-card">
                    <div className="lesson-header">
                        <span className="lesson-number">61</span>
                        <h1 className="lesson-title">No se inclinan delante de la estatua</h1>
                    </div>

                    <div className="lesson-image-section">
                        <img src={Imagen2} alt="Imagen leccion 61 - No se inclinan delante de la estatua" className="lesson-image" />
                    </div>

                    <div className="section-label">Preguntas principales</div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P1</span>
                        <p>Que fue lo que no hicieron Sadrac, Mesac y Abednego?</p>
                    </div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P2</span>
                        <p>Que hizo Jehova para salvarlos?</p>
                    </div>

                    <div className="section-label answer-label">Respuestas</div>

                    <div className="answer-block">
                        <div className="answer-header">Respuesta 1</div>
                        <p>El rey ordeno:</p>
                        <div className="quote-block">
                            <p>"Cuando oigan el sonido de trompetas, arpas y gaitas, deben inclinarse ante la estatua.</p>
                            <p><strong>Cualquiera que no lo haga sera castigado en el horno de fuego".</strong></p>
                        </div>
                    </div>

                    <div className="answer-block">
                        <div className="answer-header">Respuesta 2</div>
                        <p><strong>"Envio a su angel para salvarlos. No hay otro dios como el de ellos".</strong></p>
                    </div>

                    <div className="narrative-block">
                        <p>Los tres hebreos no estan adorando tu estatua.</p>
                        <p>Nabucodonosor mando llamar a los tres jovenes y les dijo:</p>
                        <div className="quote-block threat">
                            <p>"Voy a darles otra oportunidad para que adoren la estatua.</p>
                            <p>Si no lo hacen, los echare en el horno de fuego.</p>
                            <p><strong>Ningun dios podra salvarlos".</strong></p>
                        </div>
                    </div>

                    <div className="reflection-section">
                        <h3 className="reflection-title">Reflexion / Aplicacion - Leccion 61</h3>
                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R1</span>
                            <p>Que nos ensena este relato sobre Jehova?</p>
                        </div>

                        <div className="lesson-image-section">
                            <img src={Imagen3} alt="Imagen leccion 61 - No se inclinan delante de la estatua" className="lesson-image" />
                        </div>

                        <div className="bible-text">
                            <div className="bible-ref">Mateo 4:10</div>
                            <p>"Adora a Jehova tu Dios y sirvele solo a el"</p>
                        </div>

                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R2</span>
                            <p>Que lecciones practicas podemos aprender?</p>
                        </div>

                        <div className="optional-apply">
                            <span className="optional-tag">Opcional</span>
                            <p>Como aplicar:</p>
                            <ul>
                                <li>En la congregacion</li>
                                <li>En la familia</li>
                                <li>En la predicacion?</li>
                            </ul>
                        </div>

                        <div className="personal-apply">
                            <h4>Aplicacion personal (Opcional)</h4>
                            <ul>
                                <li>Como aplicar este principio en el colegio?</li>
                                <li>Como aplicarlo en el trabajo?</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 20px;
          padding-top: 80px;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          color: #1a1a2e;
          line-height: 1.7;
        }

        /* ========== TIMER ========== */
        .timer-float {
          position: fixed;
          top: 12px;
          right: 12px;
          z-index: 9999;
          background: #1a1a2e;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
        }
        .timer-float.collapsed {
          padding: 10px 20px;
        }
        .timer-float.collapsed:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
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
          color: #4fc3f7;
          text-align: center;
          letter-spacing: 3px;
        }
        .timer-hint {
          color: #8892b0;
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
          background: #4fc3f7;
          color: #1a1a2e;
        }
        .timer-btn.start:hover {
          background: #29b6f6;
        }
        .timer-btn.reset {
          background: #ef5350;
          color: #fff;
        }
        .timer-btn.reset:hover {
          background: #e53935;
        }
        .timer-btn.collapse {
          background: #37474f;
          color: #b0bec5;
        }
        .timer-btn.collapse:hover {
          background: #455a64;
        }
        .font-control {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .font-control label {
          color: #8892b0;
          font-size: 0.75em;
        }
        .font-control input[type="range"] {
          width: 100%;
          accent-color: #4fc3f7;
        }

        /* ========== CONTENT ========== */
        .content-area {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        /* ========== LESSON CARD ========== */
        .lesson-card {
          background: #fff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          border: 1px solid #e8ecf1;
        }
        .lesson-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 3px solid #1a1a2e;
        }
        .lesson-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: #1a1a2e;
          color: #4fc3f7;
          font-size: 1.5em;
          font-weight: 800;
          border-radius: 14px;
          flex-shrink: 0;
        }
        .lesson-title {
          font-size: 1.5em;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
          line-height: 1.3;
        }

        /* ========== LESSON IMAGE ========== */
        .lesson-image-section {
          margin: 0 0 24px 0;
          text-align: center;
        }
        .lesson-image {
          width: 100%;
          max-height: 400px;
          object-fit: contain;
          border-radius: 14px;
          border: 1px solid #e0e6ed;
          background: #fafafa;
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
          background: #e8f5e9;
          color: #2e7d32;
        }
        .answer-label {
          background: #e3f2fd;
          color: #1565c0;
        }
        .additional-label {
          background: #fff3e0;
          color: #e65100;
        }

        /* ========== MAIN QUESTIONS ========== */
        .main-question {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          margin: 10px 0;
          background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
          border-left: 5px solid #43a047;
          border-radius: 0 12px 12px 0;
        }
        .main-question p {
          margin: 0;
          font-weight: 600;
          font-size: 1.05em;
          color: #1b5e20;
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
          background: #2e7d32;
          color: #fff;
        }

        /* ========== ADDITIONAL QUESTIONS ========== */
        .additional-question {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 18px;
          margin: 10px 0;
          background: #fff8e1;
          border-left: 4px solid #ffa726;
          border-radius: 0 10px 10px 0;
        }
        .additional-question p {
          margin: 0;
          font-weight: 500;
          color: #e65100;
          font-size: 0.95em;
        }
        .additional-badge {
          background: #f57c00;
          color: #fff;
          font-size: 0.6em;
          padding: 0 6px;
          min-width: auto;
        }

        /* ========== ANSWERS ========== */
        .answer-block {
          background: #f5f7fa;
          border-radius: 12px;
          padding: 20px 24px;
          margin: 12px 0;
          border: 1px solid #e0e6ed;
        }
        .answer-header {
          font-weight: 700;
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #1565c0;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 2px solid #bbdefb;
        }
        .answer-block p {
          margin: 8px 0;
          text-align: left;
          color: #2c3e50;
        }

        /* ========== QUOTE BLOCKS ========== */
        .quote-block {
          background: #e8eaf6;
          border-left: 4px solid #5c6bc0;
          border-radius: 0 10px 10px 0;
          padding: 16px 20px;
          margin: 12px 0;
        }
        .quote-block p {
          margin: 6px 0;
          color: #283593;
        }
        .quote-block.threat {
          background: #fce4ec;
          border-left-color: #e53935;
        }
        .quote-block.threat p {
          color: #b71c1c;
        }

        /* ========== BIBLE TEXTS ========== */
        .bible-text {
          background: linear-gradient(135deg, #e0f2f1, #e8f5e9);
          border-left: 5px solid #00897b;
          border-radius: 0 14px 14px 0;
          padding: 20px 26px;
          margin: 18px 0;
        }
        .bible-text.large {
          padding: 24px 28px;
        }
        .bible-text.large p {
          font-size: 1.1em;
        }
        .bible-ref {
          display: inline-block;
          background: #00897b;
          color: #fff;
          font-size: 0.78em;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 6px;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }
        .bible-text p {
          margin: 8px 0 0 0;
          color: #1a3c34;
          font-size: 1.05em;
          line-height: 1.8;
          text-align: left;
        }
        .bible-text p sup {
          color: #00897b;
          font-weight: 700;
          font-size: 0.75em;
          margin-right: 2px;
        }

        /* ========== PROPHECY ========== */
        .prophecy-section {
          margin: 24px 0;
        }
        .prophecy-title {
          font-size: 1.1em;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 16px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #cfd8dc;
        }
        .prophecy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .prophecy-card {
          border-radius: 12px;
          padding: 20px;
        }
        .prophecy-card h4 {
          margin: 0 0 12px 0;
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .prophecy-card ul {
          margin: 0;
          padding-left: 18px;
        }
        .prophecy-card li {
          margin: 8px 0;
          line-height: 1.6;
          text-align: left;
        }
        .prophecy-card.prophecy {
          background: #ede7f6;
          border: 1px solid #b39ddb;
        }
        .prophecy-card.prophecy h4 {
          color: #4527a0;
        }
        .prophecy-card.prophecy li {
          color: #311b92;
        }
        .prophecy-card.fulfillment {
          background: #e8f5e9;
          border: 1px solid #a5d6a7;
        }
        .prophecy-card.fulfillment h4 {
          color: #2e7d32;
        }
        .prophecy-card.fulfillment li {
          color: #1b5e20;
        }

        /* ========== NARRATIVE ========== */
        .narrative-block {
          background: #f5f5f5;
          border-radius: 12px;
          padding: 20px 24px;
          margin: 14px 0;
          border: 1px solid #e0e0e0;
        }
        .narrative-block p {
          margin: 8px 0;
          text-align: left;
          color: #37474f;
        }

        /* ========== REFLECTION ========== */
        .reflection-section {
          margin-top: 28px;
          padding: 24px;
          background: #fafafa;
          border-radius: 14px;
          border: 2px solid #e0e0e0;
        }
        .reflection-title {
          font-size: 1.05em;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 18px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #bdbdbd;
        }
        .reflection-q {
          margin: 10px 0;
        }

        /* ========== OPTIONAL APPLY ========== */
        .optional-apply {
          background: #fff8e1;
          border: 1px dashed #ffb74d;
          border-radius: 10px;
          padding: 16px 20px;
          margin: 14px 0;
        }
        .optional-tag {
          display: inline-block;
          background: #ff9800;
          color: #fff;
          font-size: 0.7em;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 5px;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .optional-apply p {
          margin: 6px 0;
          color: #e65100;
          font-weight: 600;
        }
        .optional-apply ul {
          margin: 6px 0 0 0;
          padding-left: 20px;
        }
        .optional-apply li {
          color: #bf360c;
          margin: 4px 0;
          text-align: left;
        }

        /* ========== PERSONAL APPLY ========== */
        .personal-apply {
          background: #e8eaf6;
          border: 1px dashed #7986cb;
          border-radius: 10px;
          padding: 16px 20px;
          margin: 14px 0;
        }
        .personal-apply h4 {
          margin: 0 0 10px 0;
          color: #283593;
          font-size: 0.9em;
        }
        .personal-apply ul {
          margin: 0;
          padding-left: 20px;
        }
        .personal-apply li {
          color: #3949ab;
          margin: 6px 0;
          text-align: left;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .page-wrapper {
            padding: 12px;
            padding-top: 75px;
          }
          .lesson-card {
            padding: 20px 16px;
            border-radius: 12px;
          }
          .lesson-header {
            gap: 12px;
          }
          .lesson-number {
            width: 44px;
            height: 44px;
            font-size: 1.2em;
          }
          .lesson-title {
            font-size: 1.2em;
          }
          .prophecy-grid {
            grid-template-columns: 1fr;
          }
          .timer-float.expanded {
            right: 8px;
            left: 8px;
            min-width: auto;
          }
          .main-question,
          .additional-question {
            padding: 12px 14px;
          }
          .bible-text {
            padding: 16px 18px;
          }
          .bible-text.large p {
            font-size: 1em;
          }
        }

        @media (max-width: 480px) {
          .lesson-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .lesson-title {
            font-size: 1.1em;
          }
          .main-question,
          .additional-question {
            flex-direction: column;
            gap: 8px;
          }
          .q-badge {
            align-self: flex-start;
          }
          .answer-block {
            padding: 14px 16px;
          }
          .quote-block {
            padding: 12px 14px;
          }
          .reflection-section {
            padding: 16px;
          }
        }

        @media (min-width: 1024px) {
          .content-area {
            max-width: 860px;
          }
          .lesson-card {
            padding: 40px;
          }
          .bible-text.large p {
            font-size: 1.15em;
          }
        }
      `}</style>
        </div>
    );
}
