import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Modelo from "./components/Modelo";

function App() {
  const [modelo, setModelo] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [busqueda, setBusqueda] = useState([]);

  const getModels = async () => {
    const models = await fetch("http://localhost:8080/api/v1/modelo");
    const data = await models.json();
    setModelo(data);
    setBusqueda(data);
  };

  useEffect(() => {
    getModels();
  }, []);


  useEffect(() => {
    console.log(filtro);

    setBusqueda(modelo.filter(item =>{
      if(item.nombre.toLowerCase().includes(filtro) && filtro){
        return item;
      }else if(!filtro){
        return getModels();
      }

    }));


  }, [filtro]);

  return (
    <div className="App">
      <Navigation />

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="buscar"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          autoFocus
        />
      </div>

      <div className="container">
        <div className="row m-3">
          <div className="col-3">
            <Modelo name="Nuevo" valor={0.0} />
          </div>
          {busqueda.map((model, index) => (
            <div className="col-3" key={index}>
              <Modelo name={model.nombre} valor={model.valor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
