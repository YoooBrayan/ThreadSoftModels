import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ModeloOperaciones() {
  const { id } = useParams();

  const [operaciones, setOperaciones] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [busqueda, setBusqueda] = useState([]);
  const [mOperaciones, setMOperaciones] = useState([]);
  const [modelo, setModelo] = useState({});

  const getModelo = async () => {
    const response = await fetch("http://localhost:8080/api/v1/modelo/" + id);
    const data = await response.json();
    setModelo(data);
    console.log(data);
  };

  const getOperacionesM = async () => {
      const response = await fetch("http://localhost:8080/api/v1/modelo/"+id+"/operaciones");
      const data = await response.json();
      setMOperaciones(data);
  };

  const getOperaciones = async () => {
    const response = await fetch("http://localhost:8080/api/v1/operacion");
    const data = await response.json();
    console.log(data);
    setOperaciones(data);
    //setBusqueda(data);
  };

  useEffect(() => {
    getOperaciones();
    getModelo();
    getOperacionesM();
  }, []);

  useEffect(() => {
    console.log(filtro);

    setBusqueda(
      operaciones.filter((operacion) => {
        if (operacion.descripcion.toLowerCase().includes(filtro) && filtro) {
          return operacion;
        }
      })
    );
  }, [filtro]);

  return (
    <div className="row">
      <div className="col-4">
        <div className="card card-body">
          <div className="row">
            <div className="col-4">
              <img
                src="https://www.pinclipart.com/picdir/big/335-3351291_blouse-coloring-page-imagenes-de-blusa-para-dibujar.png"
                alt="..."
                className="img-fluid"
              />
            </div>
            <div className="col-8">
              <h3>{modelo.nombre}</h3>
              <h3>Price: {modelo.valor}</h3>
              <p>dsadasdasdsa</p>
              <button className="btn btn-primary btn-block">
                Nueva Operacion
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-8 border">
        <h3 className="text-center mb-3">Operaciones</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Servicios</th>
            </tr>
          </thead>
          <tbody>
            {mOperaciones.map((operacion, index) => (
              <tr key={index}>
                <td>{operacion.descripcion}</td>
                <td>{operacion.valor}</td>
                <td>
                  <button className="btn btn-info"></button>
                  <button className="btn btn-danger"></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-12 mt-4 border p-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="buscar"
            value={filtro}
            autoFocus
            onChange={(e) => setFiltro(e.target.value)}
          />
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Valor</th>
                <th>Servicio</th>
              </tr>
            </thead>
            <tbody>
              {busqueda.map((operacion, index) => (
                <tr key={index}>
                  <td>{operacion.descripcion}</td>
                  <td>{operacion.valor}</td>
                  <td>
                    {" "}
                    <button className="btn btn-success ml-4">Agregar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
