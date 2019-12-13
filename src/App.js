import React, {useState, useEffect} from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Error from './Components/Error';
import Clima from './Components/Clima';

function App() {

  //state principal
  const [ciudad, guardarCiudad] = useState('');
  const [ pais, guardarPais] = useState('');
  const [ error, guardarError] = useState(false);
  const [ resultado, guardarResultado] = useState({})

  useEffect(() => {

    //prevenir ejecutcion 

    if (ciudad === '') return;

    const consultarAPI = async () => {

      const appId = '5f814d5bc22497d359a040e4a9154b51';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

      // Consultar la url 
      const respuesta = await  fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado);
      
    }
    consultarAPI();
  }, [ciudad, pais]);


    const datosConsulta = datos => {
      //validar que ambos datos estén 
      if(datos.ciudad === '' || datos.pais === '') {
        //un error
        guardarError(true);
        return;
      }

      //Ciudad y pais existen, agregarlos al state
      guardarCiudad(datos.ciudad);
      guardarPais(datos.pais);
      guardarError(false);
    }

  



    // cargar un componente condicionalmente
    
    let componente;
    if(error) {
      //hay un error, mostrarlo
      componente = <Error  mensaje='Ambos campos son obligatorios' />
    } else if (resultado.cod === "404") {
      componente = <Error mensaje="La ciudad no existe en nuestro registro" />
    } else {
      // mostrar el clima
      componente = <Clima
                    resultado={resultado}
                    />;
    }


  return (
    <div className="app">
      <Header 
      titulo='Clima con React'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
              datosConsulta={datosConsulta}
              />
            </div>

            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
