import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {useSelector, useDispatch} from 'react-redux';
import {actualizarModeloAccion, obtenerModeloAccion, actualizarModeloAPIAccion} from '../../redux/modeloDucks';

export default function EditModelo({id}) {

  const dispatch = useDispatch();
  const modelo = useSelector(state => state.modelo)

  useEffect(() => {
    dispatch(obtenerModeloAccion(id))
  }, [])


  const onChangeModelo = (e) => {
    let data = e.currentTarget; //solucion a error: This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the method currentTarget on a released/nullified synthetic event. This is a no-op function. If you must keep the original synthetic event around, use event.persist().
    dispatch(actualizarModeloAccion(data))
  };
 
  const onSubmitModelo = async (e) => {
    e.preventDefault();
    dispatch(actualizarModeloAPIAccion())
  };

  return (
    <div className="card card-body bg-light">
      <div className="row">
        <div className="col-4">
          <img
            src="https://www.pinclipart.com/picdir/big/335-3351291_blouse-coloring-page-imagenes-de-blusa-para-dibujar.png"
            alt="..."
            className="img-fluid"
          />
        </div>
        <div className="col-8">
          <form onSubmit={onSubmitModelo}>
            <div className="form-group">
              <h3>Modelo:</h3>
              <input
                name="nombre"
                type="text"
                value={modelo.nombre}
                style={{ border: "none" }}
                className="bg-light h3 w-100 border-bottom"
                //onBlur={onblurModelo}
                onChange={onChangeModelo}
              />
            </div>
            <div className="form-group d-flex">
              <h5>Valor:</h5>
              <input
                name="valor"
                type="text"
                value={modelo.valor}
                style={{ border: "none" }}
                className="bg-light w-50 h5 ml-1 border-bottom"
                onChange={onChangeModelo}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-success btn-block d-none">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
