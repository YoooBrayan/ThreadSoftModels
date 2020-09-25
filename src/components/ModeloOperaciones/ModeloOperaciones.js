import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import EditModelo from "./EditModelo";
import CreateOperacion from "./CreateOperacion";
import AddOperacion from "./AddOperacion";
import TableOperaciones from "./TableOperaciones";

export default function ModeloOperaciones() {
  const { id } = useParams();

  const [operaciones, setOperaciones] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [busqueda, setBusqueda] = useState([]);
  const [mOperaciones, setMOperaciones] = useState([]);
  const [modelo, setModelo] = useState({
    nombre: "",
    valor: 0,
  });

  const [newOperacion, setNewOperacion] = useState({
    descripcion: "",
    valor: 0,
  });

  const [total, setTotal] = useState(0);

  const getModelo = async () => {
    const response = await fetch("http://localhost:8080/api/v1/modelo/" + id);
    const data = await response.json();
    setModelo(data);
  };

  const getOperacionesM = async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/modelo/${id}/operaciones`
    );
    const data = await response.json();
    setMOperaciones(data);

    /*let numeros = [1, 2, 3, 4, 5];
    let total = numeros.reduce((a, b) => a + b, 0);
    
    console.log(total);*/

    if (data[0] != undefined) {
      setTotal(data.reduce((a, b) => ({ valor: a.valor + b.valor })).valor);
    }
  };

  const getOperaciones = async () => {
    const response = await fetch("http://localhost:8080/api/v1/operacion");
    const data = await response.json();
    setOperaciones(data);
  };

  useEffect(() => {
    getOperaciones();
    getModelo();
    getOperacionesM();
  }, []);

  useEffect(() => {
    setBusqueda(
      operaciones.filter((operacion) => {
        if (operacion.descripcion.toLowerCase().includes(filtro) && filtro) {
          return operacion;
        }
      })
    );
  }, [filtro]);

  const addOperacion = async (operacion) => {
    if (!mOperaciones.find((o) => o.descripcion === operacion.descripcion)) {
      const response = await fetch(
        "http://localhost:8080/api/v1/modeloOperacion",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ modelo: modelo.id, operacion: operacion.id }),
        }
      );

      const responseId = await fetch(
        "http://localhost:8080/api/v1/modeloOperacion"
      );
      const idModeloOperacion = await responseId.json();

      const data = await response.json();

      if (data.response) {
        setMOperaciones([
          ...mOperaciones,
          {
            id: idModeloOperacion,
            descripcion: operacion.descripcion,
            valor: operacion.valor,
          },
        ]);

        Swal.fire({
          position: "top-end",
          title: "Operacion Agregada",
          icon: "success",
          timer: 1000,
        });

        //setTotal(data.reduce((a, b) => ({ valor: a.valor + b.valor })).valor);
        setTotal(total + operacion.valor);
      } else {
        Swal.fire({
          position: "center",
          title: "Error al agregar operacion",
          icon: "warning",
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        position: "center",
        title: "La operacion ya fue agregada",
        icon: "warning",
        timer: 1500,
      });
    }

    setFiltro("");
  };

  const handleInputchange = (e) => {
    setNewOperacion({ ...newOperacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !mOperaciones.find(
        (operacion) =>
          operacion.descripcion === newOperacion.descripcion &&
          operacion.valor === newOperacion.valor
      )
    ) {
      const response = await fetch("http://localhost:8080/api/v1/operacion", {
        method: "POST",
        body: JSON.stringify(newOperacion),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();

      if (data.response) {
        const responseId = await fetch(
          "http://localhost:8080/api/v1/operacion/lastId"
        );
        const idOperacion = await responseId.json();

        const response = await fetch(
          "http://localhost:8080/api/v1/modeloOperacion",
          {
            method: "POST",
            body: JSON.stringify({
              modelo: modelo.id,
              operacion: idOperacion,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.response) {
          const responseId = await fetch(
            "http://localhost:8080/api/v1/modeloOperacion"
          );
          const idModeloOperacion = await responseId.json();

          setMOperaciones([
            ...mOperaciones,
            {
              id: idModeloOperacion,
              descripcion: newOperacion.descripcion,
              valor: newOperacion.valor,
            },
          ]);

          setOperaciones([
            ...operaciones,
            {
              id: idOperacion,
              descripcion: newOperacion.descripcion,
              valor: newOperacion.valor,
            },
          ]);

          setTotal(total + parseInt(newOperacion.valor));

          Swal.fire({
            position: "top-end",
            title: "Registro exitoso",
            icon: "success",
            timer: 1500,
          });

          setNewOperacion({ descripcion: "", valor: 0 });
        } else {
          Swal.fire({
            position: "top-end",
            title: "Registro fallido a modelo",
            icon: "warning",
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          position: "top-end",
          title: "Registro fallido",
          icon: "warning",
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        position: "center",
        title: "La operacion ya fue agregada",
        icon: "warning",
        timer: 1500,
      });
    }
  };

  const deleteOperacion = async (id) => {
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
      const response = await fetch(
        "http://localhost:8080/api/v1/modeloOperacion/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data) {
        getOperacionesM();
      }
    }
  };

  /*const onblurModelo = (e) => {
    console.log(modelo)
  };*/

  const onChangeModelo = (e) => {
    setModelo({ ...modelo, [e.target.name]: e.target.value });
  };

  const onSubmitModelo = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/v1/modelo", {
        method: "PUT",
        body: JSON.stringify(modelo),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      if (data.response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Modelo Actualizado!",
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        title: "Error al Actualizar!",
        icon: "error",
      });
    }
  };

  const filtrar = (e) => {
    setFiltro(e.target.value);
  };

  return (
    <div className="row">
      <div className="col-12 col-md-6 mb-4">
        <EditModelo
          id={id}
          onChangeModeloP={onChangeModelo}
          onSubmitModeloP={onSubmitModelo}
          modelo={modelo}
        />

        <CreateOperacion
          handleInputchangeP={handleInputchange}
          handleSubmitP={handleSubmit}
          newOperacion={newOperacion}
        />

        <AddOperacion
          filtrarP={filtrar}
          addOperacionP={addOperacion}
          busqueda={busqueda}
          icon={faPlus}
          filtro={filtro}
          total={total}
        />
      </div>
      <div className="col-12 col-md-6 border bg-light">
        <h3 className="text-center mb-3">Operaciones</h3>
        <TableOperaciones
          servicio={deleteOperacion}
          operaciones={mOperaciones}
          icon={faTimes}
          total={total}
        />
      </div>
    </div>
  );
}
