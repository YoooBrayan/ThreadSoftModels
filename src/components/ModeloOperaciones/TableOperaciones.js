import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableOperaciones({
  servicio,
  operaciones,
  icon,
  total,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Valor</th>
          <th>Servicio</th>
        </tr>
      </thead>
      <tbody>
        {operaciones.map((operacion) => (
          <tr key={operacion.id}>
            <td>{operacion.descripcion}</td>
            <td>{operacion.valor}</td>
            <td>
              <FontAwesomeIcon
                icon={icon}
                onClick={() => {
                  icon.iconName === "plus"
                    ? servicio(operacion)
                    : servicio(operacion.id);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
      {icon.iconName === "times" ? (
        <tfoot>
          <tr className="table-dark">
            <td className="text-dark font-weight-bold" colSpan="1">
              Total
            </td>
            <td className="text-dark font-weight-bold" colSpan="2">
              {total}
            </td>
          </tr>
        </tfoot>
      ) : (
        <tfoot></tfoot>
      )}
    </table>
  );
}
