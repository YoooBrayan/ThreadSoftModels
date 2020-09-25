import React, { useState } from "react";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

export const CreateModelo = () => {

  const { register, errors, handleSubmit } = useForm();

  const [estado, setEstado] = useState(false);

  const onSubmit = async (newModelo, e) => {
    newModelo = { ...newModelo, proveedor: 1 };

    try {
      const response = await fetch("http://localhost:8080/api/v1/modelo", {
      method: "POST",
      body: JSON.stringify(newModelo),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    e.target.reset();
    if (data.response) {
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Modelo Añadido",
        showConfirmButton: false,
        timer: 1500,
      });

      //window.location = "/modelos";
      setEstado(true);
    }
    } catch (error) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "No se registro el modelo",
        text: error
      });

      e.target.reset(); 
    }
  };

  if (estado) {
    return <Redirect to="/modelos" />;
  }

  return (
    <div className="row">
      <div className="col-4 offset-4">
        <div className="card card-body bg-dark">
          <h3 className="text-white">Crear Nuevo Modelo</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre"
                className="form-control"
                name="nombre"
                autoFocus
                ref={register({
                  required: { value: true, message: "Campo obligatorio" },
                  maxLength: { value: 30, message: "Maximo 30 letras" },
                })}
              />
              <span className="text-danger mb-2 text-small d-block">
                {errors?.nombre?.message}
              </span>
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="valor"
                className="form-control"
                name="valor"
                ref={register({
                  required: { value: true, message: "Campo obligatorio" },
                  maxLength: { value: 7, message: "Maximo 7 numeros" },
                })}
              />
              {errors.valor && (
                <span className="text-danger text-small d-block mb-2">
                  {errors.valor.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <button className="btn btn-success btn-block">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
