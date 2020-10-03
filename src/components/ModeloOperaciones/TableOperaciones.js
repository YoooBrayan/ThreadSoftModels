import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { agregarOperacionModeloAccion, eliminarOperacionModeloAccion } from "../../redux/operacionesDucks";
import Swal from 'sweetalert2'

export default function TableOperaciones({ icon }) {

  const total = useSelector((state) => state.operaciones.total)

  let operaciones = useSelector((state) => (icon.iconName === "times") ? state.operaciones.operacionesModelo : state.operaciones.busqueda)
  
  const operacionesModelo = useSelector(state => state.operaciones.operacionesModelo)
  
  const dispatch = useDispatch();

  const addOperacion = async (operacion) => {
    if (!operacionesModelo.find((o) => o.descripcion === operacion.descripcion)) {
      dispatch(agregarOperacionModeloAccion(operacion))
    } else {
      Swal.fire({
        position: "center",
        title: "La operacion ya fue agregada",
        icon: "warning",
        timer: 1500,
      });
    }
  };

  const deleteOperacion = async (operacion) => {
    const result = await Swal.fire({
      title: "¿Esta seguro?",
      text: "Eliminar Operacion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    });

    if (result.isConfirmed) {
      dispatch(eliminarOperacionModeloAccion(operacion))
    }
  };

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
                    ? addOperacion(operacion)
                    : deleteOperacion(operacion);
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
