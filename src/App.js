import './App.css';
import JobImg from './img/job.jpg';
import Hermana from './img/hermana.jpg';
import Cronometer from './component/Cronometer';

function App() {
  return (
    <div className="App-speech">
      <header className="App-speech__content">

      </header>

      <Cronometer />

      <section className="App-speech__content-speech">

        <div className="Content-speech">
          <h1>¿Tiene usted una reputación como la de Job?</h1>

          <p>
          Piense por un momento que, cada palabra que dices y cada cosa que haces es una frase o verso de una canción, cuando la gente vuelva a escuchar tal canción <strong>¿Con que sentimientos la recordarían?</strong>.
          </p>

          <p>
          Nuestra reputación se asemeja a una melodía.
          </p>

          <p>
          No le ha pasado que cuando escucha una canción puede decir: <strong>"Me recuerda a una época bonita de mi vida" o aveces todo lo contrario</strong>.
          </p>

          <p>
          Es decir, nuestra reputación puede causar sentimientos negativos o positivos en otros.
          </p>

          <p>
          Por ejemplo, <strong>¿qué sientes al escuchar el nombre Judas Iscariote?</strong> Seguramente, emociones negativas. Ahora, <strong>¿qué sientes al oír el nombre Job?</strong> Probablemente, pensamientos positivos como integridad y compasión.
          </p>

          <p>
          Es por eso que en este discurso analizaremos si tenemos una buena reputación como la de Job y sino como ganarla...
          </p>

          <h2>Primero analicemos cuando vale una buena reputación...</h2>

          <h3>Proverbios 22: 1:</h3> 
          <p>
           Es preferible una buena reputación a grandes riquezas; ser respetado es mejor que tener plata y oro
          </p>

          <p>
          <strong>¿Porque Salomón llegó a esta conclusión?</strong>
          </p>

          <p>
          Quizás tomara en cuenta los comienzos de su padre, que era un simple pastor de ovejas, pero <strong>¿Porque como llegó a ser Rey?</strong> Porque tenía una buena reputación ante Jehová.
          </p>

          <p>
          Eso es en la antigüedad... Y hoy día <strong>¿Que tan valiosa es nuestra reputación?</strong>
          </p>

          <p>
          Es tan valioso que existen leyes que la protejen, <strong>por ejemplo, en Colombia por dañar el buen nombre de una persona, puede llevar a 4 años y 5 meses en prisión, además de una multa que va desde 13 a 1.500 salarios mensuales</strong>.... Saque cuentas...
          </p>

          <p>

          Ya sabiendo lo valioso que es nuestra reputación... analicemos si tenemos una reputación como la de Job.
          </p>

          <p>
          Y para esto <strong>vamos a ver 3 puntos en la que se muestra lo que sentían y veían de Job</strong>...
          </p>

          <h2>Comencemos con el primer punto:</h2>

          <h3>Job 29: 7, 8, 11</h3>

          <p>

          7 Cuando yo salía a la puerta de la ciudad y ocupaba mi asiento en la plaza,8 los jóvenes me veían y me abrían paso, y hasta los ancianos se levantaban y se quedaban de pie. 11 Todo el que me oía hablaba bien de mí y los que me veían testificaban a mi favor.
          </p>

          <h4>¿Que sentían hacia Job las demás personas según estos versículos?</h4>
          <p>
          Un profundo respeto, un respeto ganado, podemos pensar que era <strong>un hombre sabio</strong>... Sus consejos era precisos lo que la gente necesitaba.
          </p>

          <h2>¿Y que se dice de su fama? Analicemos el segundo punto, Veamos los versículos 12 y 13 del capítulo 29.</h2>

          <p>
          12 Porque yo rescataba al pobre que gritaba por ayuda, y también al huérfano y al que no tenía quien lo ayudara.13 El que estaba a punto de morir me bendecía, y yo llenaba de alegría el corazón de la viuda.
          </p>

          <p>
          Job tenía la fama de mostrarles amor leal a quienes más lo necesitaban.
          </p>

          <p>
          Miremos las dos imágenes de la guía, empecemos con la de Job, vemos a Job con un rostro alegre ayudando a otros...
          </p>

          <img src={JobImg} />

          <p>
          Ahora veamos la segunda imagen, dónde aparece una hermana, Así como Job, disfruta ayudando a las demás personas..
          </p>

          <img src={Hermana} />

          <p>
          Imagínese que está hermana se va a servir a otro lugar... <strong>¿Con que sentimientos la recordarían estos hermanos de la imagen?</strong>
          </p>

          <h2>
          Pero además de mostrar amor leal, y que le tuvieran respeto <strong>¿Que otra fama tenía?...veamos el tercer punto versículo 14</strong>
          </h2>

          <p>
          14 La rectitud era la ropa que me ponía; mi justicia era como una túnica y un turbante.
          </p>

          <p>
          Da a entender que pasaba día y noche siendo recto y justo...
          </p>

          <p>
          Job era respetado, amaba a los necesitados y vivía con integridad. <strong>¿Podemos decir lo mismo de nosotros?</strong>
          </p>

          <p>
          Si encontramos áreas a mejorar, esforcémonos por ello.
          </p>

          <p>
          Tengamos muy en cuenta algo..
          </p>

          <h5>Para conseguir una buena reputación debemos tener la costumbre de hacer las cosas bien.</h5>

          <p>
          En este caso no valdría mucho escudarnos detrás de la imperfección.
          </p>

          <p>
          Por ejemplo, hablé mal de tal hermano... Es por la imperfección...No, tengamos la costumbre de hacer las cosas bien.
          </p>

          <h4>¿Recuerda lo que mencioné al principio del discurso?</h4>

          <h5>Que nuestra reputación es como una canción...?</h5>
          <p>
          Las buenas canciones reciben un premio, las que no son tan buenas quedan allí archivadas...
          </p>

          <p>
          Si tenemos una buena reputación... Tendremos el mejor de los premios. Tener una buena reputación ante Jehová que es lo más importante...
          </p>

          <p>
          Hermanos, <strong>busquemos ganarnos el respeto, mostrar amor y vivir con integridad.</strong> Si al menos consideramos estos aspectos, Jehová nos brindará una vida plena y eterna."
          </p>
        </div>

      </section>
    </div>
  );
}

export default App;
