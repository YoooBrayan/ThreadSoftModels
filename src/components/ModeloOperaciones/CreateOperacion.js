import React, { useState, useEffect } from "react";
import {
  obtenerOperacionesAccion,
  obtenerOperacionesModeloAccion,
  agregarNuevaOperacionModeloAccion,
} from "../../redux/operacionesDucks";
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2'

export default function CreateOperacion({ id }) {

  const dispatch = useDispatch();
  const operacionesModelo = useSelector(
    (state) => state.operaciones.operacionesModelo
  );

  const [newOperacion, setNewOperacion] = useState({
    descripcion: "",
    valor: 0,
  });

  useEffect(() => {
    dispatch(obtenerOperacionesAccion());
    dispatch(obtenerOperacionesModeloAccion(id));
  }, []);

  const handleInputchange = (e) => {
    setNewOperacion({ ...newOperacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !operacionesModelo.find(
        (operacion) =>
          operacion.descripcion === newOperacion.descripcion &&
          operacion.valor === newOperacion.valor
      )
    ) {
      dispatch(agregarNuevaOperacionModeloAccion(newOperacion, id));
      setNewOperacion({ descripcion: "", valor: 0 });
    } else {
      Swal.fire({
        position: "center",
        title: "La operacion ya fue agregada",
        icon: "warning",
        timer: 1500,
      })
    }
  };

  return (
    <div className="card card-body bg-light mt-4">
      <h3 className="text-dark">Crear nueva operacion </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            className="form-control"
            name="descripcion"
            value={newOperacion.descripcion}
            onChange={handleInputchange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="valor"
            className="form-control"
            name="valor"
            value={newOperacion.valor}
            onChange={handleInputchange}
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success btn-block">Agregar</button>
        </div>
      </form>
    </div>
  );
}
