import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateModelo = () => {
  const [newModelo, setNewModelo] = useState({
    id: 72,
    nombre: "",
    valor: "",
    proveedor: 1,
  });

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

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    if (data.response) {
      window.location = "/modelos";
    }
  };

  const handleInputchange = (e) => {
    setNewModelo({ ...newModelo, [e.target.name]: e.target.value });
  };

  return (
    <div className="row mt-3">
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
