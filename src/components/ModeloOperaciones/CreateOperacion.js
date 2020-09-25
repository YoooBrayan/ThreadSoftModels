import React from "react";

export default function CreateOperacion({handleInputchangeP, handleSubmitP, newOperacion}) {

  /*const handleInputchange = (e) => {
    handleInputchangeP(e)
  };

  const handleSubmit = async (e) => {
    handleSubmitP(e);
  };*/

  return (
    <div className="card card-body bg-light mt-4">
      <h3 className="text-dark">Crear nueva operacion </h3>
      <form onSubmit={handleSubmitP}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            className="form-control"
            name="descripcion"
            value={newOperacion.descripcion}
            onChange={handleInputchangeP}
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
            onChange={handleInputchangeP}
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
