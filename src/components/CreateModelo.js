import React, { useState } from "react";
import Swal from "sweetalert2";
import {Redirect} from 'react-router-dom'

export const CreateModelo = () => {
  const [newModelo, setNewModelo] = useState({
    nombre: "",
    valor: "",
    proveedor: 1,
  });

  const [estado, setEstado] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newModelo);

    const response = await fetch("http://localhost:8080/api/v1/modelo", {
      method: "POST",
      body: JSON.stringify(newModelo),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

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
  };

  const handleInputchange = (e) => {
    setNewModelo({ ...newModelo, [e.target.name]: e.target.value });
  };


  if(estado){
    return (
      <Redirect to="/modelos"/>
    );
  }

  return (
    <div className="row">
      <div className="col-4 offset-4">
        <div className="card card-body bg-dark">
          <h3 className="text-white">Create New Modelo </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre"
                className="form-control"
                name="nombre"
                autoFocus
                onChange={handleInputchange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="valor"
                className="form-control"
                name="valor"
                onChange={handleInputchange}
                required
              />
            </div>
            <div className="form-group">
              <button className="btn btn-success btn-block">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
