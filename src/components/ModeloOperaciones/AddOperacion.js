import React from "react";
import TableOperaciones from './TableOperaciones';

export default function AddOperacion({filtrarP, addOperacionP, busqueda, icon, filtro, total}) {

    const filtrar = (e) => {
        filtrarP(e)
    }

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
        <TableOperaciones servicio={addOperacionP} operaciones={busqueda} icon={icon} total={total}/>
      </div>
    </div>
  );
}
