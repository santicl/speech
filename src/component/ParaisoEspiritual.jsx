import React, { useState } from 'react'

export default function DiscourseSpiritualParadise() {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="discourse-container">
      <style jsx>{`
        .discourse-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
          min-height: 100vh;
        }

        .discourse-header {
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
          color: white;
          padding: 35px 30px;
          border-radius: 20px;
          margin-bottom: 30px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(30, 58, 95, 0.3);
          position: relative;
          overflow: hidden;
        }

        .discourse-header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        .discourse-header h1 {
          margin: 0 0 10px 0;
          font-size: 1.8em;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .discourse-header .theme-label {
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.9em;
          display: inline-block;
          position: relative;
          z-index: 1;
        }

        .discourse-header .scripture-ref {
          margin-top: 12px;
          font-size: 0.95em;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }

        .intro-section {
          background: white;
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border-left: 5px solid #3498db;
        }

        .intro-question {
          font-size: 1.25em;
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .intro-text {
          color: #555;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .intro-reasons {
          background: linear-gradient(135deg, #e8f4fc 0%, #d6eaf8 100%);
          border-radius: 12px;
          padding: 20px 24px;
          margin: 20px 0;
        }

        .intro-reasons h4 {
          color: #2980b9;
          margin: 0 0 14px 0;
          font-size: 1.05em;
        }

        .intro-reasons ol {
          margin: 0;
          padding-left: 24px;
          color: #34495e;
        }

        .intro-reasons li {
          margin: 10px 0;
          line-height: 1.6;
          padding-left: 8px;
        }

        .definition-box {
          background: linear-gradient(135deg, #fef9e7 0%, #fcf3cf 100%);
          border: 1px solid #f4d03f;
          border-left: 5px solid #f1c40f;
          border-radius: 12px;
          padding: 22px 26px;
          margin: 24px 0;
        }

        .definition-box h4 {
          color: #9a7b0a;
          margin: 0 0 12px 0;
          font-size: 1.1em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .definition-box h4::before {
          content: '?';
          background: #f1c40f;
          color: white;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9em;
        }

        .definition-box p {
          color: #7d6608;
          line-height: 1.7;
          margin: 0;
        }

        .reason-section {
          background: white;
          border-radius: 20px;
          margin-bottom: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .reason-section:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .reason-header {
          background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
          color: white;
          padding: 20px 26px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .reason-header.reason-2 {
          background: linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%);
        }

        .reason-header.reason-3 {
          background: linear-gradient(135deg, #e67e22 0%, #f39c12 100%);
        }

        .reason-header:hover {
          filter: brightness(1.05);
        }

        .reason-number {
          background: rgba(255, 255, 255, 0.25);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3em;
          font-weight: 700;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .reason-title {
          flex: 1;
          font-size: 1.15em;
          font-weight: 600;
        }

        .expand-icon {
          font-size: 1.5em;
          transition: transform 0.3s ease;
        }

        .expand-icon.expanded {
          transform: rotate(180deg);
        }

        .reason-content {
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .reason-content.expanded {
          padding: 26px;
          max-height: 2000px;
        }

        .scripture-box {
          background: linear-gradient(135deg, #eaf2f8 0%, #d4e6f1 100%);
          border-radius: 14px;
          padding: 22px;
          margin-bottom: 22px;
          border-left: 4px solid #3498db;
        }

        .scripture-reference {
          color: #2471a3;
          font-weight: 700;
          font-size: 1.05em;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .scripture-reference::before {
          content: '';
          width: 8px;
          height: 8px;
          background: #3498db;
          border-radius: 50%;
        }

        .scripture-text {
          color: #1a5276;
          line-height: 1.8;
          font-style: italic;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
        }

        .scripture-text .verse-num {
          color: #e74c3c;
          font-weight: 700;
          font-style: normal;
          margin-right: 4px;
        }

        .explanation-text {
          color: #444;
          line-height: 1.8;
          margin: 18px 0;
          padding: 16px 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .highlight-box {
          background: linear-gradient(135deg, #e8f8f5 0%, #d1f2eb 100%);
          border-left: 4px solid #1abc9c;
          padding: 18px 22px;
          border-radius: 0 12px 12px 0;
          margin: 18px 0;
        }

        .highlight-box p {
          color: #0e6655;
          line-height: 1.7;
          margin: 0;
        }

        .image-description {
          background: linear-gradient(135deg, #fdfefe 0%, #f4f6f6 100%);
          border: 1px solid #e5e8e8;
          border-radius: 14px;
          padding: 24px;
          margin: 20px 0;
        }

        .image-description h5 {
          color: #2c3e50;
          margin: 0 0 18px 0;
          font-size: 1.05em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .image-description h5::before {
          content: '';
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
          border-radius: 6px;
        }

        .image-point {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          margin: 10px 0;
          background: white;
          border-radius: 10px;
          border: 1px solid #eaecee;
          transition: all 0.2s ease;
        }

        .image-point:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateX(4px);
        }

        .image-point-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.85em;
          flex-shrink: 0;
        }

        .image-point-icon.top-left { background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); }
        .image-point-icon.top-right { background: linear-gradient(135deg, #e67e22 0%, #f39c12 100%); }
        .image-point-icon.bottom-left { background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%); }
        .image-point-icon.bottom-right { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); }

        .image-point p {
          color: #555;
          line-height: 1.7;
          margin: 0;
        }

        .conclusion-box {
          background: linear-gradient(135deg, #d5f5e3 0%, #abebc6 100%);
          border-radius: 12px;
          padding: 20px 24px;
          margin-top: 20px;
          border: 1px solid #82e0aa;
        }

        .conclusion-box p {
          color: #1e8449;
          line-height: 1.7;
          margin: 0;
          font-weight: 500;
        }

        .application-section {
          background: white;
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          border-top: 5px solid #e74c3c;
        }

        .application-section h3 {
          color: #c0392b;
          margin: 0 0 22px 0;
          font-size: 1.25em;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .application-section h3::before {
          content: '';
          width: 8px;
          height: 30px;
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          border-radius: 4px;
        }

        .application-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .application-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px 20px;
          margin: 12px 0;
          background: linear-gradient(135deg, #fdf2f2 0%, #fce4e4 100%);
          border-radius: 12px;
          border-left: 4px solid #e74c3c;
          transition: all 0.2s ease;
        }

        .application-item:hover {
          transform: translateX(6px);
          box-shadow: 0 4px 16px rgba(231, 76, 60, 0.15);
        }

        .application-number {
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .application-text {
          color: #922b21;
          line-height: 1.7;
        }

        .final-conclusion {
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
          color: white;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(30, 58, 95, 0.3);
        }

        .final-conclusion p {
          font-size: 1.1em;
          line-height: 1.8;
          margin: 0;
        }

        @media (max-width: 768px) {
          .discourse-container {
            padding: 20px 15px;
          }

          .discourse-header {
            padding: 25px 20px;
          }

          .discourse-header h1 {
            font-size: 1.4em;
          }

          .intro-section,
          .application-section {
            padding: 22px 18px;
          }

          .reason-header {
            padding: 16px 18px;
          }

          .reason-content.expanded {
            padding: 20px 18px;
          }

          .image-point {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="discourse-header">
        <div className="theme-label">Discurso 1</div>
        <h1>Cuanto amamos nuestro paraiso espiritual!</h1>
        <div className="scripture-ref">Basado en Isaias 65:13, 14, 17, 25</div>
      </div>

      {/* Introduccion */}
      <div className="intro-section">
        <p className="intro-question">Si una persona te pregunta... Por que amas a tus padres? Que responderias?</p>
        <p className="intro-text">La respuesta es mucho mas profunda de lo que llegamos a imaginar. Hay razones de peso para amar a nuestros Padres.</p>
        
        <div className="intro-reasons">
          <h4>Por lo menos hay 3 valiosas razones:</h4>
          <ol>
            <li>Siempre velaban por nuestro alimento, que no nos faltara nada.</li>
            <li>En las situaciones mas dificiles o importantes siempre estan alli.</li>
            <li>Nos dan una sensacion seguridad y paz.</li>
          </ol>
        </div>

        <p className="intro-text">Ahora, pasa algo muy similar con el paraiso espiritual que nos ha regalado Jehova. Sabe usted porque lo ama tanto?</p>
        <p className="intro-text">Bueno, hoy veremos <strong>3 valiosas razones</strong> por las que somos tan felices en este paraiso espiritual. Y para ello debemos definir que es exactamente el paraiso espiritual.</p>

        <div className="definition-box">
          <h4>Que es el paraiso espiritual?</h4>
          <p>Se define como el ambiente en el que adoramos a Jehova. En el, disfrutamos de amistad y paz con Jehova y las personas que le sirven.</p>
        </div>

        <p className="intro-text">Y del ambiente en el que adoramos a Jehova se encuentran esas 3 razones.</p>
      </div>

      {/* Razon 1 */}
      <div className="reason-section">
        <div 
          className="reason-header"
          onClick={() => toggleSection('reason1')}
        >
          <div className="reason-number">1</div>
          <div className="reason-title">Abundancia en alimento espiritual</div>
          <span className={`expand-icon ${expandedSections['reason1'] ? 'expanded' : ''}`}>&#9660;</span>
        </div>
        <div className={`reason-content ${expandedSections['reason1'] ? 'expanded' : ''}`}>
          <div className="scripture-box">
            <div className="scripture-reference">Isaias 65:13</div>
            <div className="scripture-text">
              <span className="verse-num">13</span> Por lo tanto, esto es lo que dice el Senor Soberano Jehova: "Miren! Mis siervos comeran, pero ustedes pasaran hambre. Miren! Mis siervos beberan, pero ustedes pasaran sed. Miren! Mis siervos se alegraran, pero ustedes pasaran verguenza.
            </div>
          </div>

          <div className="explanation-text">
            Esto que menciona Isaias tiene un cumplimiento en sentido espiritual en la actualidad. Pero note que hay un <strong>contraste</strong>... Mientras quienes no son siervos de Jehova dicen que pasan hambre, nosotros que le servimos, tenemos abundancia.
          </div>

          <div className="highlight-box">
            <p>Eso lo vemos mediante las reuniones como estas, las publicaciones, la biblioteca en linea o las asambleas.</p>
          </div>
        </div>
      </div>

      {/* Razon 2 */}
      <div className="reason-section">
        <div 
          className="reason-header reason-2"
          onClick={() => toggleSection('reason2')}
        >
          <div className="reason-number">2</div>
          <div className="reason-title">Nos da lo necesario</div>
          <span className={`expand-icon ${expandedSections['reason2'] ? 'expanded' : ''}`}>&#9660;</span>
        </div>
        <div className={`reason-content ${expandedSections['reason2'] ? 'expanded' : ''}`}>
          <div className="scripture-box">
            <div className="scripture-reference">Isaias 65:14, 17</div>
            <div className="scripture-text">
              <span className="verse-num">14</span> Miren! Mis siervos gritaran de alegria por lo bien que se siente su corazon, pero ustedes gritaran por el dolor de su corazon y lloraran por tener destrozado el espiritu. <span className="verse-num">17</span> Porque, miren!, voy a crear unos nuevos cielos y una nueva tierra; y las cosas del pasado no seran recordadas ni vendran al corazon.
            </div>
          </div>

          <div className="highlight-box">
            <p>Note la primer parte del versiculo 14: <em>"Miren! Mis siervos gritaran de alegria por lo bien que se siente su corazon."</em></p>
          </div>

          <div className="explanation-text">
            Es cierto que mientras vivimos en este sistema, podemos pasar dificultades que nos lleven al desanimo, dolor o angustia. Pero el paraiso nos da lo que se muestra en la imagen...
          </div>

          <div className="image-description">
            <h5>Analisis de la imagen</h5>
            
            <div className="image-point">
              <div className="image-point-icon top-left">1</div>
              <p><strong>Superior izquierda:</strong> Vemos a los hermanos puede ser al final de la reunion o antes de que empiece. Tanto en esos momentos como durante la reunion hace que momentaneamente se olviden de sus problemas.</p>
            </div>

            <div className="image-point">
              <div className="image-point-icon top-right">2</div>
              <p><strong>Superior derecha:</strong> Como parte de su adoracion, colaboran alegremente en labores de mantenimiento y se les ve, alegre a los hermanos.</p>
            </div>

            <div className="image-point">
              <div className="image-point-icon bottom-left">3</div>
              <p><strong>Inferior izquierda:</strong> Dos hermanos de distinta edad estan en la carcel por su fe. Pero gracias a esas carticas de los demas hermanos, se les nota felices aun en esa situacion.</p>
            </div>

            <div className="image-point">
              <div className="image-point-icon bottom-right">4</div>
              <p><strong>Inferior derecha:</strong> Vemos una hermana enferma en cama. Pero estos hermanos le brindan consuelo y ayuda en esos momentos tan dificiles.</p>
            </div>
          </div>

          <div className="conclusion-box">
            <p>El paraiso espiritual aun en situaciones como la carcel o una enfermedad nos da lo necesario para aguantar.</p>
          </div>
        </div>
      </div>

      {/* Razon 3 */}
      <div className="reason-section">
        <div 
          className="reason-header reason-3"
          onClick={() => toggleSection('reason3')}
        >
          <div className="reason-number">3</div>
          <div className="reason-title">Paz y seguridad, transformacion</div>
          <span className={`expand-icon ${expandedSections['reason3'] ? 'expanded' : ''}`}>&#9660;</span>
        </div>
        <div className={`reason-content ${expandedSections['reason3'] ? 'expanded' : ''}`}>
          <div className="scripture-box">
            <div className="scripture-reference">Isaias 65:25</div>
            <div className="scripture-text">
              <span className="verse-num">25</span> El lobo y el cordero comeran juntos, el leon comera paja igual que el toro, y la serpiente se alimentara de polvo. No haran ningun dano ni destruiran nada en toda mi santa montana", dice Jehova.
            </div>
          </div>

          <div className="explanation-text">
            Aunque aqui habla de animales. Tambien se refiere personas.
          </div>

          <div className="highlight-box">
            <p>Han habido hermanos que antes de ser testigos de Jehova su personalidad era como la de un lobo, un leon o fiera. Pero han hecho cambios en su personalidad y hoy dia se siguen esforzando por agradar a Jehova.</p>
          </div>

          <div className="conclusion-box">
            <p>Que valiosas razones tenemos para amar nuestro paraiso dado por Jehova.</p>
          </div>
        </div>
      </div>

      {/* Aplicacion */}
      <div className="application-section">
        <h3>Como hacer mas hermoso el paraiso espiritual</h3>
        <p className="intro-text">Ahora, cada uno de nosotros podemos hacer mas hermoso este paraiso espiritual.</p>
        
        <ul className="application-list">
          <li className="application-item">
            <div className="application-number">1</div>
            <div className="application-text">Asistiendo a las reuniones y saludando con carino a los hermanos.</div>
          </li>
          <li className="application-item">
            <div className="application-number">2</div>
            <div className="application-text">Ayudando los hermanos que necesiten ayuda, ya sea emocional, espiritual, economico.</div>
          </li>
          <li className="application-item">
            <div className="application-number">3</div>
            <div className="application-text">Sigamos mejorando nuestras cualidades cristianas.</div>
          </li>
        </ul>
      </div>

      {/* Conclusion Final */}
      <div className="final-conclusion">
        <p>Si tenemos en cuenta estas razones pero ademas lo hacemos mas hermoso, demostraremos <strong>cuanto amamos nuestro paraiso espiritual.</strong></p>
      </div>
    </div>
  )
}
