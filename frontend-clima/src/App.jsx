import './App.css'
import  { useState } from 'react';
import axios from 'axios';


function App() {
  const [region, setRegion] = useState('');
  const [error, setError] = useState('');
 // const [informacionBackend, setInformacionBackend] = useState([]);

  const handleChange = (e) => {

    const value = e.target.value;
    setRegion(value);
    setError('');
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!region.trim()) {
      setError('Por favor, ingresa una región válida');
    } else {
      console.log('Región válida:', region);
      axios.post('http://localhost:8082/buscarclima')
      .then(response => {
        console.log(response.data);
        alert(
          "TEMPERATURA:" + "\n" +
          "Pais: " + response.data.location.country + "\n" +
          "Ciudad: " + response.data.location.name + "\n" +
          "Fecha: " + response.data.location.localtime + "\n" +
          "Temperatura: " + response.data.current.feelslike_c + " - " + response.data.current.feelslike_f
        );


        // 1) REPO
        // crear repos de front y de back y subir los proyecto

        // 2) FRONTEND
        // crear una pagina (o usar la actual) donde mostrar la info y mostrarla. 
        // opcional: agregar boton de nueva busqueda.

        // 3) BACKEND:
        // Dinamizar / hacer que la region llegue por parametro

        // 4) FRONTEND
        // volver al frontend y mandarle la region ingresada.
        // ¿como se hace? utilizando la estructura de axios a partir de linea 25 para enviarle la region como parte de la request (solicitud)
        
        //setInformacionBackend(response.data);
        console.log()
      })
      .catch(error => {
        console.error(error);
      });

  
  
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
    </>
  )
}

export default App
