import React, { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import EditModelo from "components/ModeloOperaciones/EditModelo";
import CreateOperacion from "components/ModeloOperaciones/CreateOperacion";
import AddOperacion from "components/ModeloOperaciones/AddOperacion";
import TableOperaciones from "components/ModeloOperaciones/TableOperaciones";
import { useDispatch, useSelector } from "react-redux";
import { obtenerModeloAccion } from "redux/modeloDucks";
import Navigation from "components/Navigation";

export default function ModeloOperaciones(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { history } = props;

  const { error } = useSelector((state) => state.modelo);

  useEffect(() => {
    if (window.localStorage.getItem("jwt")) {
      dispatch(obtenerModeloAccion(id));
    } else {
      history.push("/login");
    }

    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return <Redirect to="/notfound" />;
  }
  /*const onblurModelo = (e) => {
    console.log(modelo)
  };*/

  return (
    <div className="">
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <EditModelo id={id} />

            <CreateOperacion id={id} />

            <AddOperacion icon={faPlus} />
          </div>
          <div className="col-12 col-md-6 border bg-light">
            <h3 className="text-center mb-3">Operaciones</h3>
            <TableOperaciones icon={faTimes} />
          </div>
        </div>
      </div>
    </div>
  );
}
