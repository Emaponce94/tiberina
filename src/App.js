import React, { useState } from 'react';

function App() {
  const [inputs, setInputs] = useState([
    { label: "Horas Regulares", value: 0 },
    { label: "Horas Nocturnas", value: 0 },
    { label: "Horas Extras", value: 0 },
    { label: "Feriado Nacional", value: 0 },
    { label: "Adicional por Función", value: 0 },
    { label: "Adicional 3er Turno", value: 0 },
    { label: "Horas Enfermedad", value: 0 },
  ]);

  const [porcentajeNoRemunerativo, setPorcentajeNoRemunerativo] = useState(0.4426);
  const [porcentajeAhorroQuincenal, setPorcentajeAhorroQuincenal] = useState(0.21);
  const [resultado, setResultado] = useState(0);
  const [totalRemunerativo, setTotalRemunerativo] = useState(0);
  const [mes, setMes] = useState('');
  const [quincena, setQuincena] = useState('');
  const [historial, setHistorial] = useState([]);

  const cambiarColorFondo = (index) => {
    const nuevoInputs = [...inputs];
    nuevoInputs[index].backgroundColor = 'lightblue';
    setInputs(nuevoInputs);
  };

  const agregarInput = () => {
    setInputs([...inputs, { label: "Nuevo Item", value: 0 }]);
  };

  const calcular = () => {
    const totalAmount = inputs.reduce((acc, input) => acc + parseFloat(input.value), 0);
    setTotalRemunerativo(totalAmount);

    if (totalAmount > 0) {
      const multiplicacion = totalAmount * porcentajeNoRemunerativo;
      const ahorroQuincenal = multiplicacion * porcentajeAhorroQuincenal;
      setResultado(ahorroQuincenal);

      const historialItem = {
        resultado: ahorroQuincenal,
        mes,
        quincena,
      };

      setHistorial([...historial, historialItem]);
    } else {
      setResultado(0);
    }
  };

  const resetearHistorial = () => {
    setHistorial([]);
    setResultado(0);
    setTotalRemunerativo(0);
    setInputs(inputs.map(input => ({ label: input.label, value: 0 })));
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #1e3c72, #2a5298)', color: 'white', padding: '10px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>TIBERINA</h1>
      <h2 style={{ textAlign: 'center' }}>CALCULO BONO EXTRAORDINARIO</h2>
      <p style={{ textAlign: 'center' }}>Ingresa el monto de cada elemento remunerativo de tus recibos de sueldo, tales como horas regulares, horas extras, adicional por función, adicional tercer turno y horas nocturnas. Excluye el presentismo y cualquier monto no remunerativo. Calcula la suma de estos elementos remunerativos. Multiplica la suma obtenida por el monto del adicional no remunerativo. Resta el 21% de esta multiplicación al resultado. Calcula nuevamente la diferencia entre la suma de los elementos remunerativos multiplicada por el porcentaje no remunerativo y el resultado de la resta del 21%. La diferencia obtenida en el paso anterior es la cantidad que se acumula para el bono extraordinario. Repite estos pasos para cada quincena del año en curso. Este proceso te proporcionará el monto acumulado para tu bono extraordinario, considerando las particularidades de cada quincena y los elementos remunerativos pertinentes.</p>
      {inputs.map((input, index) => (
        <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '200px', marginRight: '10px', textAlign: 'left' }}>{input.label}:</label>
          <input
            type="number"
            value={input.value}
            onChange={(e) => {
              const nuevoInputs = [...inputs];
              nuevoInputs[index].value = e.target.value;
              setInputs(nuevoInputs);
            }}
            placeholder={`Ingrese ${input.label}`}
            style={{ backgroundColor: input.backgroundColor, minWidth: '100px' }}
            onFocus={() => cambiarColorFondo(index)}
          />
        </div>
      ))}
      <button onClick={agregarInput} style={{ background: '#2a5298', color: 'white', marginBottom: '10px' }}>Agregar Nuevo Item</button>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '200px', marginRight: '10px', textAlign: 'left' }}>Adic. No Remunerativo (%):</label>
        <input
          type="number"
          value={porcentajeNoRemunerativo}
          onChange={(e) => setPorcentajeNoRemunerativo(e.target.value)}
          placeholder="Adic. No Remunerativo (%)"
          style={{ minWidth: '100px' }}
        />
      </div>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '200px', marginRight: '10px', textAlign: 'left' }}>Ahorro Quincenal (%):</label>
        <input
          type="number"
          value={porcentajeAhorroQuincenal}
          onChange={(e) => setPorcentajeAhorroQuincenal(e.target.value)}
          placeholder="Ahorro Quincenal (%)"
          style={{ minWidth: '100px' }}
        />
      </div>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '200px', marginRight: '10px', textAlign: 'left' }}>Mes:</label>
        <input
          type="text"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          placeholder="Introduce el mes"
          style={{ minWidth: '100px' }}
        />
      </div>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '200px', marginRight: '10px', textAlign: 'left' }}>Nº de Quincena:</label>
        <input
          type="text"
          value={quincena}
          onChange={(e) => setQuincena(e.target.value)}
          placeholder="Introduce Nº de quincena"
          style={{ minWidth: '100px' }}
        />
      </div>
      <button onClick={calcular} style={{ background: '#2a5298', color: 'white', marginBottom: '10px' }}>Calcular</button>
      <button onClick={resetearHistorial} style={{ background: '#2a5298', color: 'white', marginBottom: '10px' }}>Resetear Historial</button>
      <div style={{ background: 'rgba(255, 255, 255, 0.3)', padding: '10px', borderRadius: '10px', textAlign: 'center', width: 'fit-content', margin: '0 auto' }}>
        <p style={{ fontSize: '1.5em' }}>Ahorro Quincenal: ${resultado.toFixed(2)}</p>
        <p style={{ fontSize: '1.5em' }}>Total Remunerativo: ${totalRemunerativo.toFixed(2)}</p>
        <div style={{ width: '100%', overflowY: 'auto' }}>
          <h2 style={{ textAlign: 'center' }}>Historial de cálculos</h2>
          {historial.map((item, index) => (
            <div key={index}>
              <p>
                {`Ahorro Quincenal: ${item.resultado.toFixed(2)}, Mes: ${item.mes}, Nº QUINCENA: ${item.quincena}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
