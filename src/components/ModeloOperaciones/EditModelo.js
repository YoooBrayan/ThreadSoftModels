import React from "react";

export const EditModelo = () => {
    
  const [modelo, setModelo] = useState({
    nombre: "",
    valor: 0,
  });
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

  return (
    <div className="card card-body bg-light">
      <div className="row">
        <div className="col-4">
          <img
            src="https://www.pinclipart.com/picdir/big/335-3351291_blouse-coloring-page-imagenes-de-blusa-para-dibujar.png"
            alt="..."
            className="img-fluid"
          />
        </div>
        <div className="col-8">
          <form onSubmit={onSubmitModelo}>
            <div className="form-group">
              <h3>Modelo:</h3>
              <input
                name="nombre"
                type="text"
                value={modelo.nombre}
                style={{ border: "none" }}
                className="bg-light h3 w-100 border-bottom"
                //onBlur={onblurModelo}
                onChange={onChangeModelo}
              />
            </div>
            <div className="form-group d-flex">
              <h5>Valor:</h5>
              <input
                name="valor"
                type="text"
                value={modelo.valor}
                style={{ border: "none" }}
                className="bg-light w-50 h5 ml-1 border-bottom"
                onChange={onChangeModelo}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-success btn-block d-none">Add</button>
            </div>
          </form>

          {/*<p>dsadasdasdsa</p>
              <button className="btn btn-primary btn-block">
                Nueva Operacion
              </button>*/}
        </div>
      </div>
    </div>
  );
};
