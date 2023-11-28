import React, { useState } from 'react';

function App() {
  const [monto, setMonto] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0.4426);
  const [porcentajeResta, setPorcentajeResta] = useState(0.21);
  const [resultado, setResultado] = useState(0);
  const [mes, setMes] = useState('');
  const [dia, setDia] = useState('');
  const [historial, setHistorial] = useState([]);

  const calcular = () => {
    const multiplicacion = monto * porcentaje;
    const resultadoMenosPorcentaje = multiplicacion - (multiplicacion * porcentajeResta);
    const resta = multiplicacion - resultadoMenosPorcentaje;
    setResultado(resta);
    setHistorial([...historial, {monto, porcentaje, resultado: resta, mes, dia}]);
  };

  const resetearHistorial = () => {
    setHistorial([]);
  };

  return (
    <div style={{background: 'linear-gradient(to right, #1e3c72, #2a5298)', color: 'white', padding: '10px', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1 style={{textAlign: 'center'}}>TIBERINA</h1>
      <h2 style={{textAlign: 'center'}}>CALCULO BONO EXTRAORDINARIO</h2>
      <p style={{textAlign: 'center'}}>PARA REALIZAR EL CALCULO DE TU BONO EXTRAORDINARIO, DEBES INGRESAR EL MONTO DE CADA QUINCENA DEL AÑO 2023 EN EL CAMPO SUELDO, DICHO MONTO DEBE ESTAR CONFORMADO POR TODOS LOS ITEMS REMUNERATIVOS DE TU QUINCENA (HORAS REGULARE, HORAS EXTRAS, ADICIONAL POR FUNCION, ADICIONAL TERCER TURNO, HORAS NOCTURNAS), QUITANDO PRESENTISMO Y NO REMUNERATIVOS.</p>
      <input
        type="number"
        value={monto}
        onChange={e => setMonto(e.target.value)}
        placeholder="Introduce el monto"
        style={{marginBottom: '10px'}}
      />
      <input
        type="number"
        value={porcentaje}
        onChange={e => setPorcentaje(e.target.value)}
        placeholder="Introduce el porcentaje"
        style={{marginBottom: '10px'}}
      />
      <input
        type="number"
        value={porcentajeResta}
        onChange={e => setPorcentajeResta(e.target.value)}
        placeholder="Introduce el porcentaje de resta"
        style={{marginBottom: '10px'}}
      />
      <input
        type="text"
        value={mes}
        onChange={e => setMes(e.target.value)}
        placeholder="Introduce el mes"
        style={{marginBottom: '10px'}}
      />
      <input
        type="text"
        value={dia}
        onChange={e => setDia(e.target.value)}
        placeholder="Introduce el día (4 o 15)"
        style={{marginBottom: '10px'}}
      />
      <button onClick={calcular} style={{background: '#2a5298', color: 'white', marginBottom: '10px'}}>Calcular</button>
      <button onClick={resetearHistorial} style={{background: '#2a5298', color: 'white', marginBottom: '10px'}}>Resetear Historial</button>
      <p>Resultado: {resultado}</p>
      <div style={{width: '100%', overflowY: 'auto'}}>
        <h2 style={{textAlign: 'center'}}>Historial de cálculos</h2>
        {historial.map((item, index) => (
          <div key={index}>
            <p>Monto: {item.monto}, Porcentaje: {item.porcentaje}, Resultado: {item.resultado}, Mes: {item.mes}, Día: {item.dia}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;