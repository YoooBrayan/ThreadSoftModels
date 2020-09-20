import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

export default function Modelo() {
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

    setBusqueda(
      modelo.filter((item) => {
        if (item.nombre.toLowerCase().includes(filtro) && filtro) {
          return item;
        } else if (!filtro) {
          return getModels();
        }
      })
    );
  }, [filtro]);

  return (
    <div className="row">
      <div className="col-12">
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
      </div>

      <div className="col-3">
        <div className="card m-1">
          <img
            src="https://www.pinclipart.com/picdir/big/335-3351291_blouse-coloring-page-imagenes-de-blusa-para-dibujar.png"
            className="card-image-top mt-3"
            style={{ width: 100, margin: "auto" }}
            alt=""
          />
          <div className="card-body text-center">
            <h5 className="card-title">Nuevo</h5>
            <p className="card-text"></p>
            <Link className="btn btn-success" to="/modelo/create">
              Agregar
            </Link>
          </div>
        </div>
      </div>

      {busqueda.map((busqueda, index) => (
        <div className="col-3" key={index}>
          <div className="card m-1">
            <img
              src={
                busqueda.nombre === "Nuevo"
                  ? "https://www.pinclipart.com/picdir/big/335-3351291_blouse-coloring-page-imagenes-de-blusa-para-dibujar.png"
                  : "https://svgsilh.com/svg/39388.svg"
              }
              className="card-image-top mt-3"
              style={{ width: 100, margin: "auto" }}
              alt=""
            />
            <div className="card-body text-center">
              <h5 className="card-title">{busqueda.nombre}</h5>
              <p className="card-text">{busqueda.valor}</p>
              <Link to={"modelo/operaciones/" + busqueda.id}
                className={
                  busqueda === "Nuevo" ? "btn btn-success" : "btn btn-primary"
                }
              >
                {busqueda.nombre === "Nuevo" ? "Agregar" : "operaciones"}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
