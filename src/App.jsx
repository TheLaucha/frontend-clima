import './App.css'
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [region, setRegion] = useState('');
  const [error, setError] = useState('');
  const [infoClima, setInfoClima] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const value = e.target.value;
    setRegion(value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!region.trim()) {
      setError('Por favor, ingresa una región válida');
    } else {
      try {
        const response = await axios.post(
          'https://consuming-apirest-java-deploy-lautaro-espinillo-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/buscarclima',
          null, 
          {
            params: {
              region: region, 
            },
          }
        );
        console.log('Respuesta del servidor:', response.data);
        setInfoClima(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="content">
          <h1 className="h1">¡Bienvenidos!</h1>
          <h2 className="h2">Buscar el clima por Región</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="region">Región:</label>
              <input
                type="text"
                id="region"
                name="region"
                value={region}
                onChange={handleChange}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
              <button type="submit">Buscar</button>
            </div>
          </form>
        </div>
 </div>

      <>
         {loading == true ? (
            <div className="spinner-border text-light container" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
          </>
  
        )}
      
      </>
      {infoClima !== null ? (
        <div className="container card-container">
          <div className="content card">
            <h1 className="h1">Resultado del clima</h1>
            <>
              <p>Region: {infoClima.location.name}</p>
              <p>Temperatura: {infoClima.current.temp_c}°C</p>
              <p>Temperatura: {infoClima.current.temp_f}F</p>
              <p>Fecha y hora: {infoClima.location.localtime}Hs</p>
            </>
          </div>
        </div>
      ) : (
        <>
        </>

      )}

    </>


  )
}
export default App
