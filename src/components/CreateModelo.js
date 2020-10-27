import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API } from "services/settings";
import Navigation from "./Navigation";

export const CreateModelo = (props) => {
  const { history } = props;

  useEffect(() => {
    if (!window.localStorage.getItem("jwt")) {
      history.push("/login");
    }
    return () => {};
  }, [history]);

  const { register, errors, handleSubmit } = useForm();

  const [estado, setEstado] = useState(false);

  const onSubmit = async (newModelo, e) => {
    newModelo = { ...newModelo, proveedor: 1 };

    try {
      const response = await fetch(`${API}modelo`, {
        method: "POST",
        body: JSON.stringify(newModelo),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("jwt"),
        },
      });

      //const data = await response.json();
      console.log(response);
      e.target.reset();
      if (response.status === 201) {
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
        text: error,
      });

      e.target.reset();
    }
  };

  if (estado) {
    return <Redirect to="/modelo" />;
  }

  return (
    <div className="">
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
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
      </div>
    </div>
  );
};
