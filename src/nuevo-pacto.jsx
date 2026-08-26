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

                    <div className="topic-banner">
                        <span className="topic-label">Tema</span>
                        <h2 className="topic-title">"Haré un nuevo pacto"</h2>
                    </div>

                    <div className="section-text">
                        <p>
                            Piense por un momento que tiene un trabajo y su jefe le dice: “Quiero ofrecerle un nuevo contrato, con mejores beneficios para usted”.
                        </p>
                        <p>
                            Antes de firmarlo, seguramente querría conocer sus condiciones y beneficios.
                        </p>
                        <p>
                            Algo parecido ocurrió en tiempos de Jeremías. Jehová anunció que reemplazaría el pacto de la Ley por “un nuevo pacto”.
                        </p>
                        <p>
                            Por eso, veremos tres preguntas: <strong>¿Por qué era necesario? ¿Entre quiénes se hizo? Y cómo nos beneficia hoy?</strong>
                        </p>
                    </div>

                    <div className="section-label">1. ¿Por qué era necesario un nuevo pacto?</div>

                    <div className="section-text">
                        <p>
                            Pongamos un ejemplo.
                        </p>
                        <p>
                            Imagine que está viendo televisión y comienza a llover. Pero justo donde está sentado hay una gotera.
                        </p>
                        <p>
                            Usted coloca un balde para recoger el agua. Eso puede solucionar el problema por esa noche, pero no es una solución permanente. Lo que realmente necesita es reparar el techo.
                        </p>
                        <p>
                            Algo parecido ocurría con el pacto de la Ley.
                        </p>
                        <p>
                            Jehová lo había establecido y era perfecto, justo y bueno. El problema no estaba en la Ley, sino en los israelitas, porque ellos rompieron el pacto.
                        </p>
                    </div>

                    <div className="bible-text">
                        <div className="bible-ref">Leamos Jeremías 31:31, 32:</div>
                        <p>
                            31 “Mira, se acercan los días —afirma Jehová— en que haré un nuevo pacto con la casa de Israel y con la casa de Judá.
                            32 No será como el pacto que hice con sus antepasados el día que los tomé de la mano para sacarlos de la tierra de Egipto, ‘el pacto mío que ellos rompieron, aunque yo era su verdadero amo’, afirma Jehová”.
                        </p>
                    </div>

                    <div className="section-text">
                        <p>
                            Además, todos habían heredado el pecado de Adán. Por eso, ningún israelita podía obedecer la Ley perfectamente.
                        </p>
                        <p>
                            Los sacrificios de animales permitían mantener una relación especial con Jehová, pero no eliminaban el pecado.
                        </p>
                        <p>
                            Por eso Jehová prometió un nuevo pacto, uno que permitiría solucionar de manera permanente el problema del pecado.
                        </p>
                    </div>

                    <div className="section-label">2. ¿Entre quiénes se hizo el nuevo pacto?</div>

                    <div className="section-text">
                        <p>
                            Una de las partes es Jehová. Pero, ¿quiénes forman la otra parte?
                        </p>

                        <div className="bible-text">
                            <div className="bible-ref">Leamos Jeremías 31:33, 34.</div>
                            <p>
                                33 “Pues el pacto que haré con la casa de Israel después de esos días —afirma Jehová— es este. Pondré mi ley dentro de ellos y la escribiré en su corazón. Yo seré su Dios y ellos serán mi pueblo”.
                                34 “Y ya nadie le enseñará a su prójimo ni a sus hermanos diciéndoles ‘¡Conozcan a Jehová!’, porque todos me conocerán, desde el menor hasta el mayor —afirma Jehová—. Y yo perdonaré su error y no me acordaré más de su pecado”.
                            </p>
                        </div>

                        <p>
                            Aunque aquí se menciona a Israel, la nación de Israel había roto el pacto. Por eso Jehová formó una nueva nación: el Israel espiritual,<strong> compuesto por cristianos ungidos por espíritu santo, un grupo de 144.000.</strong>
                        </p>
                        <p>
                            Pero para que Jehová pudiera perdonar sus pecados, <strong> debía existir una base legal. </strong>
                        </p>

                        <p>
                            Su amor lo motivó a establecer este pacto, pero su justicia exigía un sacrificio perfecto, equivalente a lo que Adán era antes de pecar.
                        </p>

                        <p>
                            Fijémonos en la imagen.
                        </p>
                        <p>
                            A la derecha vemos los sacrificios de animales que se ofrecían bajo el pacto de la Ley.
                        </p>
                        <p>
                            Pero a la izquierda vemos un sacrificio mucho mejor: el sacrificio de Jesús.
                        </p>
                        <p>
                            Gracias a ese sacrificio, Jehová puede perdonar los pecados de quienes forman parte del Israel espiritual.
                        </p>
                    </div>

                    <div className="section-label">3. ¿Cómo nos beneficia a nosotros?</div>

                    <div className="section-text">
                        <p>
                            La mayoría de los que estamos aquí no somos parte del Israel espiritual. <strong> Entonces, ¿cómo nos beneficia este pacto?</strong>
                        </p>
                        <p>
                            Pensemos en algo que ocurrió cuando Salomón inauguró el templo.
                        </p>

                        <p>
                            En su oración, Salomón no solo pidió por Israel. También mencionó a los extranjeros.
                        </p>

                        <div className="bible-text">
                            <div className="bible-ref">Leamos 1 Reyes 8:41-43.</div>
                            <p>
                                41 Además, respecto al extranjero que no es parte de tu pueblo Israel y que viene de una tierra distante por tu nombre
                                42 (porque oirán de tu gran nombre, tu poderosa mano y tu poderoso brazo), y viene y ora hacia esta casa,
                                43 escúchalo desde los cielos, desde tu morada, y haz todo lo que el extranjero te pida, para que todos los pueblos de la tierra conozcan tu nombre, te teman —como lo hace tu pueblo Israel— y sepan que tu nombre ha sido invocado sobre esta casa que he construido.
                            </p>
                        </div>

                        <p>
                            Nosotros somos como esos extranjeros. No formamos parte del Israel espiritual, pero podemos acercarnos a Jehová y él escucha nuestras oraciones.
                        </p>
                        <p>
                            Además, esperamos con mucha ilusión las bendiciones que Jehová ha prometido para el Paraíso.
                        </p>

                        <p>
                            Es como cuando alguien prepara un mango. Lo vemos cortarlo, echarle sal, pimienta y finalmente limón. Aunque todavía no lo hemos probado, casi podemos imaginar su sabor.
                        </p>

                        <p>
                            De manera parecida, aunque todavía no vivimos en el Paraíso, ya podemos saborear algunas de sus bendiciones gracias al paraíso espiritual.
                        </p>
                    </div>

                    <div className="section-label">Conclusión</div>

                    <div className="section-text">
                        <p>
                            Durante este discurso vimos que todo lo que Jehová hace está motivado por amor.
                        </p>
                        <p>
                            Mediante el nuevo pacto, hizo posible el perdón de los pecados y nos permite disfrutar de muchas bendiciones, tanto a los ungidos como a nosotros.
                        </p>

                        <p>
                            Y gracias a Jehová, en el nuevo mundo disfrutaremos de bendiciones permanentes, para siempre.
                        </p>
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
          font-weight: 500;
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