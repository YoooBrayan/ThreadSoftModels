import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import TableOperaciones from "./TableOperaciones";
import {buscarOperaciones, filtrarOperacionesAccion} from '../../redux/operacionesDucks'

export default function AddOperacion({ icon }) {

  const filtro = useSelector(state => state.operaciones.filtro)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(buscarOperaciones(filtro))
  }, [filtro]);

  const filtrar = (e) => {
    dispatch(filtrarOperacionesAccion(e.target.value))
  };

  return (
    <div className="col-12 mt-4 border p-3 bg-light">
      <h3 className="mb-3">Agregar Operacion</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="buscar"
          value={filtro}
          onChange={filtrar}
        />
        <TableOperaciones icon={icon} />
      </div>
    </div>
  );
}
