import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import {API} from 'service/settings';
import {useSelector} from 'react-redux'

export default function Modelo() {
  const [modelo, setModelo] = useState([]);
  //const [modeloId, setModeloId] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [busqueda, setBusqueda] = useState([]);
  const [loading, setLoading] = useState(true);

  const login = useSelector(state => state.login)

  const getModels = async () => {
    console.log("Token",login.token);
    try {
      const models = await fetch(`${API}modelo`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + login.token
        }
      });
      console.log("models", models);
      const data = await models.json();
      setModelo(data);
      setBusqueda(data);
      setLoading(false);
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reload!'
      }).then((result) => {
        if (result.isConfirmed) {
          getModels()
        }
      })
    }
  };

  /*const getModelId = async () => {
    const model = await axios.get(
      "http://localhost:8080/api/v1/modelo/params",
      { params: { id: 33, modelo: "Bolero"} }
    );
    const data = model.data;
    setModeloId(data);
  };*/

  useEffect(() => {
    getModels();
    //getModelId();
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    }); 
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setBusqueda(
      modelo.filter((item) => {
        if (item.nombre.toLowerCase().includes(filtro) && filtro) {
          return item;
        } else if (!filtro) {
          return getModels();
        } else {
          return null;
        }
      })
    );
  }, [filtro]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteModel = async (id) => {
    const result = await Swal.fire({
      title: "¿Esta seguro?",
      text: "Eliminar Modelo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    });

    if (result.isConfirmed) {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/modelo/${id}`
      );
      console.log(res.data);

      if (res.data) {
        setModelo(modelo.filter((modelo) => modelo.id !== id));
        setBusqueda([]);
        setFiltro("");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Modelo Eliminado",
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Error al Eliminar Modelo!",
        });
      }
    }
  };

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

      {filtro === "" ? (
        <div className="col-12 col-md-4 col-sm-6 col-lg-3">
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
      ) : (
        ""
      )}
      {loading ? (
        <div className="col-lg-9 col-12 col-md-8 col-sm-6">
          <div className="row justify-content-md-center">
            <div className="col col-lg-2"></div>
            <Spinner className="col-auto" animation="grow" role="status" />
            <div className="col col-lg-2"></div>
          </div>
        </div>
      ) : (
        ""
      )}

      {busqueda.map((busqueda, index) => (
        <div className="col-12 col-md-4 col-sm-6 col-lg-3" key={index}>
          <div className="card m-1">
            <div className="card-header bg-white border-0 d-flex justify-content-between ml-auto">
              <FontAwesomeIcon
                className="text-secondary"
                data-toggle="tooltip"
                data-placement="left"
                title="Eliminar"
                icon={faWindowClose}
                style={{ fontSize: "1.5em" }}
                onClick={() => {
                  deleteModel(busqueda.id);
                }}
              />
            </div>
            <img
              loading="lazy"
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
              <Link
                to={"modelo/operaciones/" + busqueda.id}
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
