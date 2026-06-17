import { useState, useEffect, useRef } from "react";

export default function DiscourseHolySpirit() {
    const [globalTime, setGlobalTime] = useState(0);
    const [globalRunning, setGlobalRunning] = useState(false);
    const [timerExpanded, setTimerExpanded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
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
        <div className={`page-wrapper ${darkMode ? "dark" : ""}`} style={{ fontSize: `${fontSize}px` }}>
            {/* DARK MODE TOGGLE */}
            <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                aria-label={darkMode ? "Activar modo dia" : "Activar modo noche"}
            >
                {darkMode ? "☀ Modo dia" : "☾ Modo noche"}
            </button>
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
                {/* SECTION INTRO */}
                <div className="lesson-card intro-card">
                    <div className="lesson-header">
                        <span className="lesson-number">14</span>
                        <h1 className="lesson-title">Introduccion a la seccion numero 14</h1>
                    </div>

                    <div className="section-label">Que analizara esta seccion?</div>

                    <div className="section-text">
                        <p>Los primeros cristianos llevaron las buenas noticias del Reino hasta las partes más lejanas de la Tierra. Jesús los dirigió para que supieran dónde predicar. También los capacitó de forma milagrosa para enseñar la verdad en los idiomas que hablaba la gente. Jehová les dio valor y fuerzas para aguantar cruel persecución.</p>
                        <p>Jesús dio al apóstol Juan una visión de la gloria de Jehová. En otra visión, le mostró cómo vence el Reino de los cielos a Satanás y acaba para siempre con su dominio. Juan vio a Jesús como Rey y a 144.000 gobernando con él. También vio que la Tierra entera se convierte en un paraíso y que todos adoran a Jehová en paz y unidad.</p>
                    </div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P2</span>
                        <p>Que lecciones encontraremos?</p>
                    </div>

                    <div className="answer-block">
                        <div className="answer-header">Respuesta fiel numero 2</div>
                        <ul className="answer-list">
                            <li><strong>a)</strong> Jehova nos encargo darle gloria.</li>
                            <li><strong>b)</strong> Dedicar nuestra vida mediante la oracion.</li>
                            <li><strong>c)</strong> Demostraremos que apoyamos su gobierno.</li>
                        </ul>
                    </div>
                </div>

                {/* TOPIC - DISCIPULOS RECIBEN ESPIRITU SANTO */}
                <div className="lesson-card">
                    <div className="topic-banner">
                        <span className="topic-label">Tema</span>
                        <h2 className="topic-title"><strong>LECCIÓN 94</strong> Los discipulos reciben espiritu santo</h2>
                    </div>

                    <div className="section-text">
                        <p>Ya habían pasado 10 días desde que Jesús había regresado al cielo. Entonces los discípulos de Jesús recibieron espíritu santo. Era la Fiesta de Pentecostés del año 33, y gente de muchos lugares había llegado a Jerusalén para celebrarla. Unos 120 discípulos de Jesús se habían reunido en la habitación de la parte de arriba de una casa cuando, de repente, pasó una cosa asombrosa. Algo como una llama de fuego apareció sobre la cabeza de cada discípulo, y todos empezaron a hablar en diferentes idiomas. Además, se oyó el ruido de un viento fuerte por toda la casa.</p>
                        <p>La gente que había viajado de otros países a Jerusalén oyó el ruido y corrió hacia la casa para ver qué pasaba. Se sorprendieron mucho cuando oyeron a los discípulos hablando en otros idiomas. Decían: “Estas personas son de Galilea, ¿cómo es que pueden hablar en nuestros propios idiomas?”.</p>
                        <p>Entonces Pedro y los demás apóstoles se pusieron de pie enfrente de todos. Pedro les explicó: “Ustedes mataron a Jesús, pero Jehová lo resucitó. Ahora Jesús está en el cielo al lado derecho de Dios. Y nos ha dado el espíritu santo que nos había prometido. Por eso es que han visto y oído estos milagros”.</p>
                        <p>La gente se quedó muy impresionada. Las palabras de Pedro les habían tocado el corazón, por eso preguntaron: “¿Qué debemos hacer?”. Él les respondió: “Arrepiéntanse de sus pecados y bautícense en el nombre de Jesús. Después también recibirán el regalo del espíritu santo”. Unas 3.000 personas se bautizaron ese día. Desde ese momento, empezó a haber cada vez más discípulos en Jerusalén. Los apóstoles formaron más congregaciones con la ayuda del espíritu santo. Así pudieron enseñar a los discípulos todas las cosas que Jesús les había mandado.</p>
                    </div>

                    <div className="section-label">Preguntas principales</div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P1</span>
                        <p>Que paso en las fiestas del Pentecostes del ano 33?</p>
                    </div>

                    <div className="answer-block">
                        <div className="answer-header">Respuesta 1</div>
                        <p>120 discipulos se habian reunido. Ocurrio algo asombroso: alli recibieron espiritu santo.</p>
                    </div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P2</span>
                        <p>Por que se bautizaron tantas personas?</p>
                    </div>

                    <div className="answer-block">
                        <div className="answer-header">Respuesta 2</div>
                        <p>Pedro les explico que se les daria espiritu santo, asegurando la resurreccion a pesar de todo.</p>
                    </div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P3</span>
                        <p>Como podemos aplicar Romanos 10:9?</p>
                    </div>

                    <div className="bible-text">
                        <div className="bible-ref">Romanos 10:9 (leer y explicar)</div>
                        <p>"Porque, si declaras publicamente esa palabra que esta en tu propia boca, que Jesus es Senor, y demuestras fe en tu corazon de que Dios lo levanto de entre los muertos, seras salvado".</p>
                    </div>

                    <div className="reflection-section">
                        <h3 className="reflection-title">Leamos Juan 15:26</h3>
                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R1</span>
                            <p>Que nos ensena este relato acerca de Jehova?</p>
                        </div>
                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R2</span>
                            <p>Que lecciones practicas podemos aprender de este relato?</p>
                        </div>
                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R3</span>
                            <p>Como podemos aplicarlo en la congregacion Torices?</p>
                        </div>
                    </div>
                </div>

                {/* LESSON 95 */}
                <div className="lesson-card">

                    <div className="topic-banner">
                        <span className="topic-label">Tema</span>
                        <h2 className="topic-title"><strong>LECCIÓN 95</strong> Nada los detiene</h2>
                    </div>

                    <div className="section-text">
                        <p>Un hombre que no podía caminar se sentaba a pedir limosna todos los días en la puerta del templo. Una tarde, vio a Pedro y a Juan llegando al templo y les dijo: “Por favor, denme algo”. Pedro le contestó: “Puedo darte algo que es mejor que el dinero. En el nombre de Jesús, ¡levántate y camina!”. Entonces Pedro lo ayudó a levantarse, y el hombre empezó a caminar. La gente se emocionó tanto al ver este milagro que muchos se hicieron creyentes.</p>
                        <p>Pero los sacerdotes y los saduceos se pusieron furiosos. Agarraron a los apóstoles, los llevaron al tribunal de líderes religiosos, que se llamaba Sanedrín, y les preguntaron: “¿Quién les dio el poder para curar a ese hombre?”. Pedro les respondió: “El poder nos lo dio Jesucristo, el hombre que ustedes mataron”. Los líderes religiosos les gritaron: “¡Dejen de hablar de Jesús!”. Los apóstoles dijeron: “Tenemos que hablar de él. No vamos a callarnos”.</p>
                        <p>Entonces liberaron a Pedro y a Juan, y ellos enseguida fueron a contarles a los demás discípulos lo que había pasado. Todos juntos oraron a Jehová: “Por favor, ayúdanos a ser valientes para seguir hablando de ti”. Jehová les dio espíritu santo, y así pudieron seguir predicando y haciendo curaciones. Más y más personas se hacían creyentes. Los saduceos tenían tanta envidia que metieron a los apóstoles en la cárcel. Pero, esa noche, Jehová envió a un ángel que les abrió las puertas de la cárcel y les dijo a los apóstoles: “Vayan otra vez al templo y prediquen allí”.</p>
                        <p>A la mañana siguiente, alguien fue a decirle al Sanedrín: “¡La cárcel está cerrada con llave, pero los hombres que ustedes arrestaron ya no están dentro! ¡Están en el templo predicando!”. Así que arrestaron a los apóstoles de nuevo y los llevaron al Sanedrín. El sumo sacerdote dijo: “¡Ya les ordenamos que no hablaran más de Jesús!”. Pedro respondió: “Tenemos que obedecer a Dios como gobernante más bien que a los hombres”.</p>
                        <p>Los líderes religiosos estaban tan enfadados que querían matar a los apóstoles. Entonces un fariseo llamado Gamaliel se puso de pie y dijo: “¡Tengan cuidado! Quizás Dios está con estos hombres. ¿De verdad quieren luchar contra Dios?”. Ellos le hicieron caso. Los dejaron libres, aunque primero los golpearon con varas y les ordenaron otra vez que dejaran de predicar. Pero eso no detuvo a los apóstoles. Continuaron predicando con valor en el templo y de casa en casa.</p>
                    </div>

                    <div className="section-label">Preguntas principales</div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P1</span>
                        <p>Por que no dejaron de predicar los discipulos?</p>
                    </div>

                    <div className="answer-block">
                        <div className="answer-header">Respuesta 1</div>
                        <p>Porque oraron a Jehova para que los ayudara a ser valientes ante las necesidades ya vistas.</p>
                    </div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P2</span>
                        <p>Como los ayudo Jehova?</p>
                    </div>

                    <div className="answer-block">
                        <div className="answer-header">Respuesta 2</div>
                        <p>Los ayudo con su espiritu santo. Dios lo ha demostrado...</p>
                    </div>

                    <div className="bible-text large">
                        <div className="bible-ref">Hechos 5:29, 30 (leer)</div>
                        <p><sup>29</sup> "En respuesta, Pedro y los demas apostoles dijeron: 'Tenemos que obedecer a Dios como gobernante mas bien que a los hombres. <sup>30</sup> El Dios de nuestros antepasados resucito a Jesus, a quien ustedes mataron colgandolo en un madero'".</p>
                    </div>

                    <div className="main-question">
                        <span className="q-badge main-badge">P3</span>
                        <p>Que nos ensena Hechos 5:29?</p>
                    </div>

                    <div className="reflection-section">
                        <h3 className="reflection-title">Reflexion / Aplicacion - Leccion 95</h3>
                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R1</span>
                            <p>Que nos ensena este relato acerca de Jehova?</p>
                        </div>
                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R2</span>
                            <p>Que lecciones practicas podemos aprender de este relato?</p>
                        </div>
                        <div className="main-question reflection-q">
                            <span className="q-badge main-badge">R3</span>
                            <p>Como aplicarlo en la congregacion?</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
          padding: 20px;
          padding-top: 80px;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          color: #2d3748;
          line-height: 1.7;
        }

        /* ========== TIMER ========== */
        .timer-float {
          position: fixed;
          top: 12px;
          right: 12px;
          z-index: 9999;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid #cbd5e0;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }
        .timer-float.collapsed {
          padding: 10px 20px;
        }
        .timer-float.collapsed:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 40px rgba(0,0,0,0.18);
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
          color: #38a169;
          text-align: center;
          letter-spacing: 3px;
        }
        .timer-hint {
          color: #a0aec0;
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
          background: #38a169;
          color: #fff;
        }
        .timer-btn.start:hover {
          background: #2f855a;
        }
        .timer-btn.reset {
          background: #e53e3e;
          color: #fff;
        }
        .timer-btn.reset:hover {
          background: #c53030;
        }
        .timer-btn.collapse {
          background: #edf2f7;
          color: #718096;
        }
        .timer-btn.collapse:hover {
          background: #e2e8f0;
        }
                  /* ========== THEME TOGGLE ========== */
        .theme-toggle {
          position: fixed;
          top: 12px;
          left: 12px;
          z-index: 9999;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid #cbd5e0;
          border-radius: 14px;
          padding: 10px 18px;
          font-size: 0.85em;
          font-weight: 600;
          color: #2d3748;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }
        .theme-toggle:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 40px rgba(0,0,0,0.18);
        }
        .font-control {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .section-text {
          display: flex;
          justify-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
        }
        .font-control label {
          color: #718096;
          font-size: 0.75em;
        }
        .font-control input[type="range"] {
          width: 100%;
          accent-color: #38a169;
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
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .intro-card {
          border-top: 5px solid #38a169;
        }
        .lesson-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 3px solid #38a169;
        }
        .lesson-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: #38a169;
          color: #ffffff;
          font-size: 1.5em;
          font-weight: 800;
          border-radius: 14px;
          flex-shrink: 0;
        }
        .lesson-title {
          font-size: 1.5em;
          font-weight: 700;
          color: #1a202c;
          margin: 0;
          line-height: 1.3;
        }

        /* ========== TOPIC BANNER ========== */
        .topic-banner {
          background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
          border-radius: 14px;
          padding: 22px 26px;
          margin-bottom: 24px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(56, 161, 105, 0.25);
        }
        .topic-label {
          display: inline-block;
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          font-size: 0.7em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 4px 14px;
          border-radius: 20px;
          margin-bottom: 10px;
        }
        .topic-title {
          margin: 0;
          color: #ffffff;
          font-size: 1.5em;
          font-weight: 800;
          line-height: 1.3;
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
          background: #e6f4ea;
          color: #2f855a;
        }

        /* ========== MAIN QUESTIONS ========== */
        .main-question {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          margin: 10px 0;
          background: #f0fdf4;
          border-left: 5px solid #38a169;
          border-radius: 0 12px 12px 0;
        }
        .main-question p {
          margin: 0;
          font-weight: 600;
          font-size: 1.05em;
          color: #2f855a;
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
          background: #38a169;
          color: #ffffff;
        }

        /* ========== ANSWERS ========== */
        .answer-block {
          background: #f7fafc;
          border-radius: 12px;
          padding: 20px 24px;
          margin: 12px 0;
          border: 1px solid #e2e8f0;
        }
        .answer-header {
          font-weight: 700;
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #3182ce;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e2eef9;
        }
        .answer-block p {
          margin: 8px 0;
          text-align: left;
          color: #4a5568;
        }
        .answer-list {
          margin: 8px 0 0 0;
          padding-left: 0;
          list-style: none;
        }
        .answer-list li {
          margin: 10px 0;
          padding: 12px 16px;
          background: #ffffff;
          border-radius: 10px;
          border-left: 4px solid #38a169;
          color: #4a5568;
          line-height: 1.6;
        }
        .answer-list li strong {
          color: #2f855a;
          margin-right: 4px;
        }

        /* ========== BIBLE TEXTS ========== */
        .bible-text {
          background: #e6fffa;
          border-left: 5px solid #319795;
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
          background: #319795;
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
          color: #285e61;
          font-size: 1.05em;
          line-height: 1.8;
          text-align: left;
        }
        .bible-text p sup {
          color: #319795;
          font-weight: 700;
          font-size: 0.75em;
          margin-right: 2px;
        }

        /* ========== REFLECTION ========== */
        .reflection-section {
          margin-top: 28px;
          padding: 24px;
          background: #f7fafc;
          border-radius: 14px;
          border: 2px solid #e2e8f0;
        }
        .reflection-title {
          font-size: 1.05em;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 18px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #cbd5e0;
        }
        .reflection-q {
          margin: 10px 0;
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
          .topic-title {
            font-size: 1.2em;
          }
          .timer-float.expanded {
            right: 8px;
            left: 8px;
            min-width: auto;
          }
          .main-question {
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
          .main-question {
            flex-direction: column;
            gap: 8px;
          }
          .q-badge {
            align-self: flex-start;
          }
          .answer-block {
            padding: 14px 16px;
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
                  /* ========== DARK MODE ========== */
        .page-wrapper.dark {
          background: linear-gradient(135deg, #1a202c 0%, #171923 100%);
          color: #e2e8f0;
        }
        .page-wrapper.dark .theme-toggle {
          background: rgba(45, 55, 72, 0.98);
          border-color: #4a5568;
          color: #e2e8f0;
        }
        .page-wrapper.dark .timer-float {
          background: rgba(45, 55, 72, 0.98);
          border-color: #4a5568;
        }
        .page-wrapper.dark .timer-display {
          color: #68d391;
        }
        .page-wrapper.dark .timer-hint {
          color: #718096;
        }
        .page-wrapper.dark .timer-btn.collapse {
          background: #4a5568;
          color: #cbd5e0;
        }
        .page-wrapper.dark .timer-btn.collapse:hover {
          background: #5a6678;
        }
        .page-wrapper.dark .font-control label {
          color: #a0aec0;
        }
        .page-wrapper.dark .lesson-card {
          background: #2d3748;
          border-color: #4a5568;
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
        }
        .page-wrapper.dark .lesson-title {
          color: #f7fafc;
        }
        .page-wrapper.dark .section-label {
          background: #22543d;
          color: #9ae6b4;
        }
        .page-wrapper.dark .main-question {
          background: #22372b;
        }
        .page-wrapper.dark .main-question p {
          color: #9ae6b4;
        }
        .page-wrapper.dark .answer-block {
          background: #283141;
          border-color: #4a5568;
        }
        .page-wrapper.dark .answer-header {
          color: #63b3ed;
          border-bottom-color: #3a455a;
        }
        .page-wrapper.dark .answer-block p {
          color: #cbd5e0;
        }
        .page-wrapper.dark .answer-list li {
          background: #2d3748;
          color: #cbd5e0;
        }
        .page-wrapper.dark .answer-list li strong {
          color: #9ae6b4;
        }
        .page-wrapper.dark .bible-text {
          background: #1d3535;
        }
        .page-wrapper.dark .bible-text p {
          color: #b2f5ea;
        }
        .page-wrapper.dark .reflection-section {
          background: #283141;
          border-color: #4a5568;
        }
        .page-wrapper.dark .reflection-title {
          color: #f7fafc;
          border-bottom-color: #4a5568;
        }
      `}</style>
        </div>
    );
}