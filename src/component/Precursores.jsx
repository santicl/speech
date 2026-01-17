import React, { useState, useEffect } from 'react';

export default function DiscoursePioneers() {
  const [globalTime, setGlobalTime] = useState(0);
  const [isGlobalRunning, setIsGlobalRunning] = useState(false);
  const [isTimerExpanded, setIsTimerExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(16);

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

  const handleTimerClick = (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
      setIsTimerExpanded(!isTimerExpanded);
    }
  };

  const handleControlClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="discourse-container" style={{ fontSize: `${fontSize}px` }}>
      {/* Timer */}
      <div 
        className={`timer ${isTimerExpanded ? 'expanded' : 'collapsed'}`}
        onClick={handleTimerClick}
      >
        <div className="timer-display">{formatTime(globalTime)}</div>
        {!isTimerExpanded && <span className="timer-hint">Toca para expandir</span>}
        {isTimerExpanded && (
          <div className="timer-controls" onClick={handleControlClick}>
            <div className="timer-buttons">
              <button onClick={() => setIsGlobalRunning(!isGlobalRunning)}>
                {isGlobalRunning ? 'Pausar' : 'Iniciar'}
              </button>
              <button onClick={() => { setGlobalTime(0); setIsGlobalRunning(false); }}>
                Reiniciar
              </button>
            </div>
            <div className="font-control">
              <label>Tamaño: {fontSize}px</label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="discourse-content">
        <header className="discourse-header">
          <h1>Reunión Anual de Precursores y Ancianos</h1>
          <p className="subtitle">Los llevamos en el corazón</p>
        </header>

        {/* Bienvenida */}
        <section className="section welcome-section">
          <h2>Bienvenida</h2>
          <p>Queridos precursores, bienvenidos a la reunión anual de precursores y Ancianos.</p>
          <p>Queremos expresarles agradecimiento por todo lo que trabajan para Jehová.</p>
          <p>Siéntanse libres para comentar en las preguntas que se hagan. Si usted piensa que tiene la respuesta a la pregunta, no tenga pena de responderla o expresarse. No vamos a estar calificando las respuestas ni mucho menos. Más bien deseamos escucharlos.</p>
          <p>En una ocasión, el apóstol Pablo al escribir una carta a una congregación, dijo algo muy bonito y que nosotros como cuerpo de Ancianos queremos que ustedes sepan.</p>
          
          <div className="bible-text">
            <span className="bible-ref">Filipenses 1:7A</span>
            <p><sup>7</sup> Es totalmente correcto que yo piense así de todos ustedes, pues los llevo en el corazón.</p>
          </div>

          <div className="bible-text">
            <span className="bible-ref">Filipenses 4:1</span>
            <p><sup>4</sup> Así que, hermanos, a los que amo y estoy deseando ver, que son mi felicidad y corona, manténganse firmes en el Señor como les he dicho, amados míos.</p>
          </div>

          <p>Las palabras que Pablo puso en esta carta, refleja el amor que sentía por esta congregación... Es una carta que destila amor.</p>
          
          <div className="illustration">
            <p>De hecho, pensemos en esa frase... <strong>Destilar amor.</strong></p>
            <p>Me hizo pensar en el proceso con el que se obtienen los mejores licores: una mezcla común se expone al calor, pasa por fuego, se somete a presión… y de allí surge un líquido más puro, más concentrado y más valioso.</p>
            <p>De manera similar, cuando alguien pone primero el Reino, atraviesa sacrificios, pruebas y desafíos que, aunque duelan, actúan como ese calor que purifica. Y al final, lo que sale es un amor genuino, refinado, el tipo de amor que realmente agrada a Jehová.</p>
          </div>

          <p>Para esta reunión, estaremos analizando como ustedes precursores han imitado a los fieles que se menciona en la carta a los Filipenses. Y examinaremos 3 formas:</p>
          
          <div className="main-points-overview">
            <div className="main-point-item">1. Apoyan diligentemente los intereses del Reino</div>
            <div className="main-point-item">2. Se preocupan sinceramente por las personas en el campo</div>
            <div className="main-point-item">3. Apoyan con cariño a los hermanos</div>
          </div>
        </section>

        {/* Punto 1 */}
        <section className="section main-point">
          <div className="point-header">
            <span className="point-number">1</span>
            <h2>Apoyan Diligentemente los Intereses del Reino</h2>
          </div>

          <p>Precisamente el apóstol Pablo elogió a esta congregación de Filipos de la siguiente forma:</p>

          <div className="bible-text">
            <span className="bible-ref">Filipenses 1:5</span>
            <p><sup>5</sup> debido a la contribución que ustedes han hecho a las buenas noticias desde el primer día hasta este momento.</p>
          </div>

          <p>Pablo los estaba felicitando porque estos hermanos se desgastaban por las buenas noticias desde el primer día. Posiblemente los hermanos de Filipos al leer esta carta, les hizo recordar esa primera vez que predicaron. Les habrá recordado como se sentían en ese día.</p>

          <p>Bueno queridos precursores, ustedes no se quedan atrás, porque ustedes hacen lo mismo, han apoyado diligentemente los intereses del Reino... Predicando las buenas noticias.</p>

          <p className="question">De hecho, en el versículo dice "desde el primer día"... ¿Cuándo fue su primera predicación? ¿Fue siendo precursores?</p>

          <p>Verdad que no, el que hoy sea precursor es por el resultado del amor a Jehová y por poner primero los intereses del Reino.</p>

          <div className="key-point">
            <p>Ahora, haga un pequeño ejercicio... Recuerde la primera vez que usted predicó. ¿Qué sentimiento tenía en ese momento hacia la predicación?</p>
            <p>Quizá nervioso pero alegre, tenía fiebre por la predicación.</p>
          </div>

          <p className="question">Pregúntese... ¿Es el mismo sentimiento que tiene hacia la predicación hoy día?</p>

          <p>Seguramente es el mismo sentimiento y si no es así, le puede pedir ayuda a Jehová para recuperarlo.</p>

          <p>También apoyan los intereses del Reino, cuando al predicar aplican la forma en la que predicamos hoy. La de no mostrar directamente un texto bíblico, sino iniciar conversaciones.</p>

          <h3>El ejemplo de Lidia</h3>

          <p>Ahora, hay otra manera en la que los Filipenses apoyaban los intereses del Reino. Por ejemplo, en esa congregación, había una hermana llamada Lidia.</p>

          <p className="question">¿A qué se dedicaba la hermana Lidia?</p>
          <p>Se dedicaba a vender púrpura.</p>

          <p className="question">¿Qué condición económica tenía la hermana?</p>
          <p>Estaba bien económicamente.</p>

          <p>Pero se le recuerda más por la hospitalidad que mostró al apóstol Pablo y sus compañeros. Inclusive, ella hizo algo más por los hermanos:</p>

          <div className="bible-text">
            <span className="bible-ref">Hechos 16:40</span>
            <p><sup>40</sup> Pero, cuando Pablo y Silas salieron de la prisión, se dirigieron a la casa de Lidia, donde vieron a los hermanos y los animaron. Después se fueron.</p>
          </div>

          <p>Pablo y Silas eran como Superintendentes de Circuito, salen de prisión y se dirigen hacia la casa de Lidia y allí estaban los hermanos de la congregación. Allí Pablo y Silas hacen una especie de reunión donde animan a estos hermanos.</p>

          <div className="key-point">
            <p>Ella ofreció su casa para la reunión de la nueva congregación.</p>
          </div>

          <p className="question">¿Cómo ustedes pueden demostrar hospitalidad al igual que Lidia?</p>

          <p>Cuando nos visite el Superintendente de Circuito, podría apuntarse para brindarle hospitalidad.</p>

          <div className="example-box">
            <p>En la Atalaya del 15 de Enero de 1986 se muestra el ejemplo de una hermana de Hong Kong llamada <strong>Dip Yee</strong>, esta hermana junto a su esposo que es Anciano de congregación invitaban a su grupo de estudio y la hermana cocinaba algo sencillo pero le hacía feliz, ver que los hermanos disfrutaban de esas reuniones.</p>
          </div>

          <p>Ahora, no se necesita estar muy bien económicamente para ser hospitalarios.</p>

          <p>Recordemos, Lidia tenía una buena situación económica. Pero la situación económica de los hermanos de la congregación de Filipos era distinta. Note lo que dice:</p>

          <div className="bible-text">
            <span className="bible-ref">2 Corintios 8:2</span>
            <p><sup>2</sup> Durante una dura prueba en la que ellos sufrieron mucho, dieron con gran alegría a pesar de ser muy pobres. Esto reveló que eran muy generosos.</p>
          </div>

          <p>En esta carta Pablo les anima a los Corintios a terminar las labores de Socorro hacia Judea, y toma como ejemplo a Filipos y Tesalónica, diciendo... A pesar de ser muy pobres, dieron mucho.</p>

          <p className="question">Ahora hermanos, aunque no tenga la situación económica muy favorable... ¿Cómo podría demostrar hospitalidad a los hermanos?</p>

          <p>Otra manera en que puede ser hospitalario con sus hermanos es si llega temprano y aprovecha eso para darle la bienvenida a los demás hermanos. Algo sencillo.</p>

          <p>Y es cierto que a muchos de ustedes quizá la afronten situaciones económicas difíciles. Muchos precursores en el mundo pasan por circunstancias similares.</p>

          <div className="video-section">
            <h4>Video: Sean Valientes, precursores</h4>
            <p>Veamos un vídeo de una precursora, note el reto que tiene, cómo la ayuda Jehová y qué lecciones aprende usted.</p>
            
            <div className="video-questions">
              <p className="question">1. ¿A qué dificultades se enfrentó Emma en su nueva asignación?</p>
              <p className="question">2. ¿Cómo bendijo Jehová su arduo trabajo y persistencia?</p>
              <p className="question">3. ¿Qué podemos aprender de su experiencia?</p>
            </div>
          </div>

          <p>La hermanita del vídeo tuvo en cuenta el siguiente versículo:</p>

          <div className="bible-text">
            <span className="bible-ref">Malaquías 3:10</span>
            <p><sup>10</sup> Traigan el diezmo completo al almacén, para que haya alimento en mi casa. Por favor, pónganme a prueba en esto —dice Jehová de los ejércitos— y verán que les abro las compuertas de los cielos y derramo sobre ustedes bendiciones hasta que no les falte nada".</p>
          </div>

          <div className="song-reference">
            <p>Que es ese diezmo simbolico que usted puede dar y que recibira de Jehova...</p>
            <p>Bueno, Diríjase a la canción que cantamos al principio. En el cancionero ubíquense en la <strong>canción 100</strong>, enfóquese en la primera estrofa en la parte final.</p>
            <p className="song-quote">IDice: "Quien muestra compasión y fiel abnegación recibe recompensas de Dios."</p>
          </div>

          <p>Sus energías para la predicación, reunirse y al final Jehová la bendijo con un trabajo a la medida.</p>
        </section>

        {/* Punto 2 */}
        <section className="section main-point">
          <div className="point-header">
            <span className="point-number">2</span>
            <h2>Se Preocupan Sinceramente por las Personas en el Campo</h2>
          </div>

          <p>Así como Pablo amaba los hermanos de la congregación en Filipos, también sentía un amor más profundo hacia Timoteo, pero no era un amor por las habilidades que él tuviera, pero sí era por algo que Timoteo hacía.</p>
          <p>Leamos por favor Filipenses 2: 19, 20</p>

          <div className="bible-text">
            <span className="bible-ref">Filipenses 2:19, 20</span>
            <p><sup>19</sup> Ahora espero en el Señor Jesús enviarles pronto a Timoteo para que yo me anime cuando me lleguen noticias de ustedes. <sup>20</sup> Porque no tengo a nadie más con una actitud como la de él, alguien que sinceramente se preocupe por ustedes.</p>
          </div>

          <div className="key-point">
            <p>Era una persona que se interesaba sinceramente en las personas. Ama a Jehová principalmente pero amaba mucho a la gente.</p>
          </div>

          <p>De hecho, Timoteo se encontraba en Roma, y para llegar a Filipos, eran unos 40 días a pie y para devolverse otros 40 días. Literalmente se desgastaba para ayudar a los hermanos en sentido espiritual.</p>

          <p>Ustedes de igual manera imitan ese mismo amor por las personas que tenía Timoteo. Leamos cómo ustedes lo hacen: Dirijase a Romanos</p>

          <div className="bible-text">
            <span className="bible-ref">Romanos 10:13-15</span>
            <p><sup>13</sup> Porque "todo el que invoque el nombre de Jehová será salvado". <sup>14</sup> Sin embargo, ¿cómo lo invocarán si no han puesto su fe en él? ¿Y cómo pondrán su fe en él si no han oído hablar de él? ¿Y cómo oirán sin alguien que predique? <sup>15</sup> ¿Y cómo predicarán si no han sido enviados? Tal como está escrito: "¡Qué hermosos son los pies de los que declaran buenas noticias de cosas buenas!".</p>
          </div>

          <p>El amor sincero que sienten por las personas en el campo los impulsa a hacer algo más que cumplir con un requisito de horas.</p>

          <div className="reflection-box">
            <p><strong>Imagine que usted se sienta y comienza a pensar...</strong></p>
            <p className="question">¿Qué problemas tendrán a quienes voy a predicar?</p>
            <p>Pero... ¿Cómo tendrán una esperanza si no saben que existe una? Y ¿Cómo podrán pedirle ayuda a Jehová si no saben cómo orar? Y ¿Cómo van a orar si no hay nadie que les enseñe?</p>
            <p>Usted se coloca en los zapatos de los amos de casa. Y su finalidad es... <strong>Debo salir a predicar, las personas necesitan tener conocimiento de Jehová y sus promesas.</strong></p>
            <p>Usted se hace esa mentalidad y el deseo de ayudar a otros va a crecer.</p>
          </div>

          <div className="video-section">
            <h4>Video: ¿Por qué son buenas noticias eternas? - Ris y Suélen</h4>
            <p>Algo similar les pasó a unas hermanas llamadas: Ris y Suélen. Veamos qué hicieron estas hermanas.</p>
            
            <div className="video-questions">
              <p className="question">1. ¿Qué retos afrontó Suélen en su territorio?</p>
              <p className="question">2. ¿Cómo demostró verdadero interés en Ris?</p>
              <p className="question">3. ¿Cómo podemos ver a las personas del territorio como las ve Jehová?</p>
            </div>
          </div>

          <div className="bible-text">
            <span className="bible-ref">Juan 4:23B</span>
            <p>Pero viene la hora —de hecho, ha llegado ya— en que los auténticos adoradores del Padre lo adorarán con espíritu y con verdad. Porque el Padre sin duda está buscando a personas así para que lo adoren.</p>
          </div>

          <p className="question">¿Notó lo que dice el versículo?</p>

          <div className="key-point">
            <p>Jehová sin duda, está buscando a personas como yo para que lo adoren.</p>
            <p>Usted tiene el espíritu Santo de Jehová y además tiene la verdad, el conocimiento exacto que viene de su palabra la Biblia.</p>
          </div>

          <p>Por eso los animamos a sigan mostrando ese interés sincero por las personas en el campo.</p>
        </section>

        {/* Punto 3 */}
        <section className="section main-point">
          <div className="point-header">
            <span className="point-number">3</span>
            <h2>Apoyan con Cariño a los Hermanos</h2>
          </div>

          <div className="speaker-note">
            <p>Esta parte la estará considerando con ustedes el hermano <strong>Nehemías Caballero</strong>.</p>
          </div>
        </section>

      </div>

      <style jsx>{`
        .discourse-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 20px;
          padding-top: 100px;
          font-family: 'Georgia', 'Times New Roman', serif;
          line-height: 1.7;
          color: #2d3748;
        }

        /* Timer Styles */
        .timer {
          position: fixed;
          top: 15px;
          right: 15px;
          background: linear-gradient(145deg, #1a365d, #2c5282);
          color: white;
          padding: 15px 20px;
          border-radius: 12px;
          z-index: 1000;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(26, 54, 93, 0.4);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .timer.collapsed {
          padding: 12px 18px;
        }

        .timer.collapsed:hover {
          transform: scale(1.05);
        }

        .timer.expanded {
          padding: 20px;
          min-width: 200px;
        }

        .timer-display {
          font-size: 2em;
          font-weight: bold;
          text-align: center;
          font-family: 'Courier New', monospace;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .timer-hint {
          display: block;
          text-align: center;
          font-size: 0.7em;
          opacity: 0.8;
          margin-top: 5px;
        }

        .timer-controls {
          margin-top: 15px;
        }

        .timer-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .timer-buttons button {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .timer-buttons button:first-child {
          background: #48bb78;
          color: white;
        }

        .timer-buttons button:last-child {
          background: #fc8181;
          color: white;
        }

        .timer-buttons button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .font-control {
          background: rgba(255,255,255,0.1);
          padding: 10px;
          border-radius: 8px;
        }

        .font-control label {
          display: block;
          font-size: 0.85em;
          margin-bottom: 8px;
          text-align: center;
        }

        .font-control input[type="range"] {
          width: 100%;
          cursor: pointer;
        }

        /* Content Styles */
        .discourse-content {
          max-width: 850px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .discourse-header {
          background: linear-gradient(135deg, #1a365d, #2c5282);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }

        .discourse-header h1 {
          font-size: 1.8em;
          margin: 0 0 10px 0;
          font-weight: 700;
        }

        .discourse-header .subtitle {
          font-size: 1.1em;
          opacity: 0.9;
          margin: 0;
          font-style: italic;
        }

        .section {
          padding: 30px;
          border-bottom: 1px solid #e2e8f0;
        }

        .section:last-child {
          border-bottom: none;
        }

        .section h2 {
          color: #1a365d;
          font-size: 1.4em;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
          border-bottom: 3px solid #3182ce;
        }

        .section h3 {
          color: #2c5282;
          font-size: 1.2em;
          margin: 25px 0 15px 0;
        }

        .section p {
          margin: 0 0 15px 0;
          text-align: left;
        }

        /* Welcome Section */
        .welcome-section {
          background: linear-gradient(to bottom, #f0f7ff, white);
        }

        /* Main Points */
        .main-point {
          background: white;
        }

        .point-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 3px solid #3182ce;
        }

        .point-number {
          background: linear-gradient(135deg, #3182ce, #2c5282);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5em;
          font-weight: bold;
          flex-shrink: 0;
        }

        .point-header h2 {
          margin: 0;
          padding: 0;
          border: none;
          font-size: 1.3em;
        }

        /* Main Points Overview */
        .main-points-overview {
          background: #f0f7ff;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }

        .main-point-item {
          padding: 12px 15px;
          margin: 8px 0;
          background: white;
          border-radius: 8px;
          border-left: 4px solid #3182ce;
          font-weight: 600;
          color: #1a365d;
        }

        /* Bible Text */
        .bible-text {
          background: linear-gradient(to right, #f0fff4, #f7fafc);
          border-left: 5px solid #38a169;
          padding: 20px 25px;
          margin: 20px 0;
          border-radius: 0 12px 12px 0;
          font-size: 1.1em;
        }

        .bible-ref {
          display: inline-block;
          background: #38a169;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85em;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .bible-text p {
          margin: 0;
          font-style: italic;
          color: #2d3748;
        }

        .bible-text sup {
          color: #38a169;
          font-weight: bold;
          margin-right: 3px;
        }

        /* Questions */
        .question {
          background: linear-gradient(to right, #fffbeb, #fef3c7);
          border-left: 4px solid #d97706;
          padding: 15px 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
          color: #92400e;
          font-weight: 600;
        }

        /* Key Points */
        .key-point {
          background: linear-gradient(to right, #fef2f2, #fee2e2);
          border-left: 4px solid #dc2626;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 12px 12px 0;
        }

        .key-point p {
          margin: 0 0 10px 0;
          color: #991b1b;
        }

        .key-point p:last-child {
          margin-bottom: 0;
        }

        /* Illustration */
        .illustration {
          background: #f8fafc;
          border: 2px dashed #cbd5e0;
          padding: 20px;
          margin: 20px 0;
          border-radius: 12px;
        }

        .illustration p {
          color: #4a5568;
        }

        /* Example Box */
        .example-box {
          background: #e0f2fe;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
          border: 1px solid #7dd3fc;
        }

        .example-box p {
          margin: 0;
          color: #0c4a6e;
        }

        /* Video Section */
        .video-section {
          background: linear-gradient(135deg, #1e1b4b, #312e81);
          color: white;
          padding: 25px;
          margin: 25px 0;
          border-radius: 12px;
        }

        .video-section h4 {
          margin: 0 0 15px 0;
          font-size: 1.1em;
          color: #c7d2fe;
        }

        .video-section > p {
          color: #e0e7ff;
          margin-bottom: 20px;
        }

        .video-questions {
          background: rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 8px;
        }

        .video-questions .question {
          background: rgba(255,255,255,0.15);
          border-left-color: #fbbf24;
          color: #fef3c7;
          margin: 10px 0;
        }

        /* Song Reference */
        .song-reference {
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          color: white;
          padding: 20px;
          margin: 20px 0;
          border-radius: 12px;
          text-align: center;
        }

        .song-reference p {
          color: #ede9fe;
        }

        .song-quote {
          font-size: 1.15em;
          font-style: italic;
          color: #fef3c7 !important;
          margin-top: 15px !important;
          padding-top: 15px;
          border-top: 1px solid rgba(255,255,255,0.2);
        }

        /* Reflection Box */
        .reflection-box {
          background: #fefce8;
          border: 2px solid #facc15;
          padding: 25px;
          margin: 25px 0;
          border-radius: 12px;
        }

        .reflection-box p {
          color: #713f12;
        }

        .reflection-box .question {
          background: rgba(250, 204, 21, 0.3);
        }

        /* Speaker Note */
        .speaker-note {
          background: linear-gradient(135deg, #065f46, #047857);
          color: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
        }

        .speaker-note p {
          margin: 0;
          font-size: 1.1em;
          color: #d1fae5;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .discourse-container {
            padding: 15px;
            padding-top: 90px;
          }

          .timer {
            top: 10px;
            right: 10px;
            left: 10px;
          }

          .timer.expanded {
            min-width: auto;
          }

          .discourse-header {
            padding: 30px 20px;
          }

          .discourse-header h1 {
            font-size: 1.4em;
          }

          .section {
            padding: 20px;
          }

          .point-header {
            flex-direction: column;
            text-align: center;
          }

          .point-number {
            width: 45px;
            height: 45px;
            font-size: 1.3em;
          }

          .bible-text {
            padding: 15px 18px;
            font-size: 1em;
          }

          .main-point-item {
            font-size: 0.95em;
          }
        }

        @media (max-width: 480px) {
          .discourse-header h1 {
            font-size: 1.2em;
          }

          .section h2 {
            font-size: 1.2em;
          }

          .timer-display {
            font-size: 1.6em;
          }
        }
      `}</style>
    </div>
  );
}
