import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function EditModelo({id, onChangeModeloP, onSubmitModeloP, modelo}) {


  const onChangeModelo = (e) => {
    onChangeModeloP(e)
  };
 
  const onSubmitModelo = async (e) => {
    onSubmitModeloP(e)
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

          {/*<p>dsadasdasdsa</p>
              <button className="btn btn-primary btn-block">
                Nueva Operacion
              </button>*/}
        </div>
      </div>
    </div>
  );
}
