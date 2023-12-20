import React, { useState, useEffect } from 'react';

const Cronometro = () => {
  const [segundos, setSegundos] = useState(0);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
    let intervalo;

    if (corriendo) {
      intervalo = setInterval(() => {
        setSegundos((segundos) => segundos + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [corriendo]);

  const toggleCronometro = () => {
    setCorriendo(!corriendo);
  };

  const resetCronometro = () => {
    setSegundos(0);
    setCorriendo(false);
  };

  const obtenerTiempoFormateado = () => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosMostrar = segundos % 60;

    const formatoDosDigitos = (valor) => {
      return valor < 10 ? `0${valor}` : valor;
    };

    return `${formatoDosDigitos(horas)}:${formatoDosDigitos(minutos)}:${formatoDosDigitos(segundosMostrar)}`;
  };

  return (
    <div className='Cronometer'>
      <h1>Cronómetro</h1>
      <p>{obtenerTiempoFormateado()}</p>
      <div className='Content-btn'>
      <button onClick={toggleCronometro}>
        {corriendo ? 'Pausar' : 'Iniciar'}
      </button>
      <button onClick={resetCronometro}>Reset</button>
      </div>
    </div>
  );
};

export default Cronometro;
