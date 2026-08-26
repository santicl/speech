import { useState, useEffect, useRef } from "react";

export default function DiscourseAbrahamWar() {
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
                {/* THEME */}
                <div className="theme-card">
                    <h2 className="theme-title">RELATO BÍBLICO</h2>
                    <p className="theme-text">El primer hombre que peleó una guerra justa</p>
                </div>

                {/* READING TEXT */}
                <div className="lesson-card">
                    <div className="section-label">Texto de lectura</div>

                    <div className="reading-text">
                        <p>El primer hombre que peleó una guerra justa. JEHOVÁ le hizo una promesa muy especial a su amigo Abrahán, una promesa que cambiaría el rumbo de la historia. Le dijo: “Te convertiré en una gran nación”. También le mostró a Abrahán la hermosa tierra en la que viviría esa gran nación (Gén. 12:2; 13:14, 15). Pero, incluso antes de que llegara a formarse, Satanás ya estaba decidido a eliminarla. ¿Por qué? Porque el Diablo sabía que de esa nación saldría la “descendencia” predicha que acabaría con él y su malvado gobierno (Gén. 3:15).</p>

                        <p>Entonces Abrahán y su familia se convirtieron en el blanco de Satanás. Uno de los que recibió un duro golpe fue su sobrino Lot. ¿Qué pasó? Abrahán le había dejado a Lot que eligiera en qué parte de la Tierra Prometida quería vivir. Y Lot escogió la zona más rica y fértil. Se quedó cerca de la ciudad de Sodoma, donde la gente era “muy mala y cometía graves pecados contra Jehová” (Gén. 13:8-13). Resulta que el rey de Sodoma estaba aliado con cuatro reyes cananeos y, como todos estaban hartos de pagarle tributo al rey de Elam, se rebelaron contra él. Entonces, el rey de Elam se alió con tres reyes de tierras muy lejanas. Bajaron juntos desde el norte y derrotaron al rey de Sodoma y a sus aliados. Después, los vencedores volvieron a sus tierras y se llevaron muchas cosas y a muchos cautivos, entre quienes estaban Lot y su familia.</p>

                        <div className="image-caption">
                            <span className="image-caption-tag">COMENTARIO</span>
                            <p>Abrahán reunió a un grupo de 318 hombres para perseguir y atacar a los ejércitos de cuatro reyes poderosos que estaban aliados</p>
                        </div>

                        <p>¿Qué haría Abrahán? Podría haber pensado que Lot se lo había buscado; él había escogido esa zona. O podría haber pensado que ir a rescatar a Lot sería muy peligroso, porque tendría que luchar con esos reyes. Abrahán llevaba una vida nómada; más que un guerrero, era un pastor. ¿Cómo iba él a derrotar una alianza de cuatro reyes tan poderosos? Y justo uno de esos reyes era el rey de Sinar, de donde venía Abrahán, pues Ur estaba en la tierra de Sinar. Cualquier otro podría haber pensado: “¿Cómo voy a luchar contra él si algún día quiero volver a las comodidades de Ur?”. Pero Abrahán no pensaba así. Decidió rescatar a Lot, seguro de que Jehová estaría con él y le daría la victoria.</p>

                        <p>Para ese entonces, Abrahán y los de su casa quizás ya eran más de 1.000. Así que reunió a sus 318 hombres adiestrados para pelear, y se prepararon para el combate. Fueron al norte con algunos aliados hasta llegar a la región de Dan y allí se encontraron con el ejército enemigo. En la noche, Abrahán dividió a sus siervos, y se lanzaron al ataque. Es cierto que su ejército era mucho más pequeño, pero vencieron a aquellos bandidos e hicieron que salieran corriendo. Huyeron hacia el norte, pero Abrahán siguió persiguiéndolos. Y cuando llegaron a Hobá, que está al norte de Damasco, finalmente los derrotaron y recuperaron todo lo que se habían llevado de Canaán. ¡Lot y su familia volvían a ser libres!</p>

                        <div className="image-caption">
                            <span className="image-caption-tag">IMAGEN</span>
                            <img src="" alt="" srcset="" />
                        </div>

                        <p>¿Le agradó a Jehová ver el valor y la fe de Abrahán? Jehová mismo dejó claro lo que pensaba cuando Abrahán pasó cerca de Salem. Melquisedec —que era rey de esa ciudad y sacerdote de Jehová— salió para encontrarse con Abrahán y darle la bendición de Jehová. Abrahán le dio la décima parte de lo mejor del botín. Así reconoció con humildad que el mérito no era suyo, sino de Dios.</p>

                        <p>Sin duda, esa guerra era de Dios, no de los hombres. De hecho, la Biblia habla del “Libro de las Guerras de Jehová” (Núm. 21:14). Quizás esta guerra que Abrahán peleó fue la primera que se registró en este libro. Siglos después, cuando los descendientes de Abrahán lucharon contra los cananeos malvados que vivían en la Tierra Prometida, Jehová le dio a su pueblo fiel una victoria tras otra.</p>

                        <p>Pero, cuando el pueblo de Dios le daba la espalda, él dejaba de protegerlos. Y, como al final rechazaron a su Hijo —el Mesías—, Jehová los rechazó y dejó de bendecir a esta nación física. Más bien, empezó a bendecir a una nación espiritual bajo el gobierno de Cristo, quien les prohibió a sus súbditos participar en guerras físicas (Mat. 26:52). Eso sí, Jesús les enseñó a participar en una guerra espiritual. Y, con su ejemplo, demostró que esta guerra también exige mucho valor.</p>
                    </div>

                    {/* LEA EL RELATO BÍBLICO */}
                    <div className="section-label additional-label">Lea el relato bíblico</div>
                    <div className="bible-refs-row">
                        <span className="bible-ref">Génesis 14:1-24</span>
                        <span className="bible-ref">Hebreos 7:1-24</span>
                    </div>

                    {/* MAIN QUESTION */}
                    <div className="main-question">
                        <span className="q-badge main-badge">P</span>
                        <p>¿De qué maneras demostró valor Abraham durante esta etapa de su vida?</p>
                    </div>
                </div>

                {/* INVESTIGUE UN POCO MÁS */}
                <div className="lesson-card">
                    <div className="section-label answer-label">Investigue un poco más</div>

                    <div className="qa-block">
                        <div className="qa-question">
                            <span className="q-badge investigate-badge">1</span>
                            <p>¿Cómo demuestra la arqueología la exactitud de este relato?</p>
                        </div>
                        <div className="qa-answer">
                            <p>Los elamitas, según la arqueología, se revelan como una nación guerrera.</p>
                        </div>
                    </div>

                    <div className="qa-block">
                        <div className="qa-question">
                            <span className="q-badge investigate-badge">2</span>
                            <p>De acuerdo con la descripción que hace la Biblia, ¿dónde se encontraban posiblemente Sodoma y Gomorra? ¿Qué pruebas hay de ello?</p>
                        </div>
                        <div className="qa-answer">
                            <p>Cerca del extremo sur del Mar Salado, entre la llanura baja de Sidim, es decir, el Mar Salado.</p>
                        </div>
                    </div>

                    <div className="qa-block">
                        <div className="qa-question">
                            <span className="q-badge investigate-badge">3</span>
                            <p>Melquisedec fue sacerdote y rey de Salem. ¿Dónde se encontraba Salem?</p>
                        </div>
                        <div className="qa-answer">
                            <p>Se encontraba en la llanura baja, cerca de Jerusalén, la capital del reino.</p>
                            <p>Por autoridad de Jehová, no por linaje.</p>
                            <p>Pacto davídico: Jesús como Rey y Sacerdote, como Melquisedec.</p>
                        </div>
                    </div>

                    <div className="qa-block">
                        <div className="qa-question">
                            <span className="q-badge investigate-badge">4</span>
                            <p>¿Cómo representó Melquisedec a Jesús?</p>
                        </div>
                        <div className="qa-answer">
                            <p>Para representar el poder de Jehová Dios para siempre jamás.</p>
                        </div>
                    </div>
                </div>

                {/* PIENSE EN LAS LECCIONES */}
                <div className="lesson-card">
                    <div className="section-label">Piense en las lecciones</div>

                    <div className="intro-section">
                        <p>Abraham permitió que Lot se quedara con la mejor tierra. 🌎</p>
                        <p>¿Cómo podemos imitar a Abraham cuando tratamos con la familia, con los hermanos y con otras personas? 👥</p>
                    </div>

                    <div className="image-caption">
                        <span className="image-caption-tag">IMAGEN C</span>
                    </div>

                    <div className="qa-block">
                        <div className="qa-question">
                            <span className="q-badge think-badge">❓</span>
                            <p>¿Qué aprendemos de que Abraham estuviera dispuesto a arriesgarse tanto para rescatar a su sobrino?</p>
                        </div>
                        <div className="qa-answer">
                            <p>Su amor a Jehová y a su familia. El ejemplo que le dio su padre.</p>
                        </div>
                    </div>

                    <div className="qa-block">
                        <div className="qa-question">
                            <span className="q-badge think-badge">❓</span>
                            <p>¿De qué otra manera puede usted copiar el ejemplo de valor de Abraham?</p>
                        </div>
                        <div className="qa-answer">
                            <p>Sin importar si nuestra vida está en peligro, buscaremos la mejor forma de ayudar a nuestro hermano.</p>
                        </div>
                    </div>
                </div>

                {/* VER EL CUADRO COMPLETO */}
                <div className="summary-card">
                    <h2 className="summary-title">Ver el cuadro completo</h2>

                    <div className="overview-question">
                        <span className="q-badge overview-badge">?</span>
                        <p>¿Qué me enseña este RELATO sobre Jehová?</p>
                    </div>

                    <div className="overview-question">
                        <span className="q-badge overview-badge">?</span>
                        <p>¿Cómo se relaciona este relato con el propósito de Jehová y el tema principal de la Biblia?</p>
                    </div>

                    <div className="overview-question">
                        <span className="q-badge overview-badge">?</span>
                        <p>¿Qué me gustaría preguntarle a Abraham y a Lot cuando resuciten?</p>
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
          background: linear-gradient(135deg, #3a2a1a 0%, #2d1f0d 100%);
          border-radius: 16px;
          padding: 28px 32px;
          text-align: center;
          border: 2px solid #ffb74d;
          box-shadow: 0 4px 24px rgba(255, 183, 77, 0.2);
        }
        .theme-title {
          font-size: 1.2em;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #ffb74d;
          margin: 0 0 12px 0;
        }
        .theme-text {
          font-size: 1.25em;
          color: #f0d9b8;
          margin: 0;
          font-weight: 600;
        }

        /* ========== LESSON CARD ========== */
        .lesson-card {
          background: #141414;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
          border: 1px solid #2a2a2a;
        }

        /* ========== READING TEXT ========== */
        .reading-text p {
          margin: 16px 0;
          color: #d8d8d8;
          text-align: justify;
        }

        /* ========== IMAGE CAPTION ========== */
        .image-caption {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #1a1a2e;
          border-left: 4px solid #7c8cf5;
          border-radius: 0 12px 12px 0;
          padding: 16px 20px;
          margin: 22px 0;
        }
        .image-caption-tag {
          background: #7c8cf5;
          color: #0a0a0a;
          font-size: 0.7em;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .image-caption p {
          margin: 0;
          color: #b8c0ff;
          font-style: italic;
          font-size: 0.95em;
        }

        /* ========== SECTION LABELS ========== */
        .section-label {
          font-size: 0.8em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 6px 14px;
          border-radius: 6px;
          margin: 0 0 18px 0;
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
          margin-top: 28px;
        }

        /* ========== BIBLE REFS ========== */
        .bible-refs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 8px;
        }
        .bible-ref {
          display: inline-block;
          background: #26a69a;
          color: #fff;
          font-size: 0.85em;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 8px;
          letter-spacing: 0.5px;
        }

        /* ========== MAIN QUESTION ========== */
        .main-question {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          margin: 20px 0 0 0;
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
        .investigate-badge {
          background: #42a5f5;
          color: #0a0a0a;
        }
        .think-badge {
          background: #ffb74d;
          color: #0a0a0a;
        }

        /* ========== QA BLOCKS ========== */
        .qa-block {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 20px 24px;
          margin: 14px 0;
          border: 1px solid #2a2a2a;
        }
        .qa-question {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 14px;
        }
        .qa-question p {
          margin: 0;
          font-weight: 600;
          font-size: 1.02em;
          color: #ffffff;
        }
        .qa-answer {
          background: #0d1f2d;
          border-left: 4px solid #42a5f5;
          border-radius: 0 10px 10px 0;
          padding: 14px 18px;
          margin-left: 8px;
        }
        .qa-answer p {
          margin: 6px 0;
          color: #b8d4f0;
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
        .overview-question {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          margin: 12px 0;
          background: #0d2818;
          border-radius: 12px;
          border: 1px solid #1b4a2a;
        }
        .overview-question p {
          margin: 0;
          color: #a5d6a7;
          font-weight: 500;
          font-size: 1.05em;
        }
        .overview-badge {
          background: #00e676;
          color: #0a0a0a;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 600px) {
          .page-wrapper {
            padding: 15px;
            padding-top: 70px;
          }
          .lesson-card,
          .theme-card,
          .summary-card {
            padding: 20px;
          }
          .reading-text p {
            text-align: left;
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
