import Swal from "sweetalert2";
import axios from "axios";
import { API } from "services/settings";

// constantes

const dataInicial = {
  operaciones: [],
  operacionesModelo: [],
  busqueda: [],
  total: 0,
  filtro: "",
};

// types

const OBTENER_OPERACIONES_EXITO = "OBTENER_OPERACIONES_EXITO";
const OBTENER_OPERACIONES_MODELO_EXITO = "OBTENER_OPERACIONES_MODELO_EXITO";
const AGREGAR_NUEVA_OPERACION_EXITO = "AGREGAR_NUEVA_OPERACION_EXITO";
const AGREGAR_NUEVA_OPERACION_MODELO_EXITO =
  "AGREGAR_NUEVA_OPERACION_MODELO_EXITO";
const BUSCAR_OPERACIONES = "BUSCAR_OPERACIONES";
const FILTRAR_OPERACIONES = "FILTRAR_OPERACIONES";
const ELIMINAR_OPERACION_MODELO_EXITO = "ELIMINAR_OPERACION_MODELO_EXITO";

// reducer

export default function operacionesReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_OPERACIONES_EXITO:
      return { ...state, operaciones: action.payload };

    case OBTENER_OPERACIONES_MODELO_EXITO:
      return {
        ...state,
        operacionesModelo: action.payload.operacionesM,
        total: action.payload.total,
      };

    case AGREGAR_NUEVA_OPERACION_EXITO:
      return { ...state, operaciones: [...state.operaciones, action.payload] };

    case AGREGAR_NUEVA_OPERACION_MODELO_EXITO:
      return {
        ...state,
        operacionesModelo: [...state.operacionesModelo, action.payload],
        total: state.total + parseInt(action.payload.valor),
        filtro: "",
      };

    case BUSCAR_OPERACIONES:
      return {
        ...state,
        busqueda: action.payload,
      };

    case FILTRAR_OPERACIONES:
      return {
        ...state,
        filtro: action.payload,
      };

    case ELIMINAR_OPERACION_MODELO_EXITO:
      return {
        ...state,
        operacionesModelo: state.operacionesModelo.filter(
          (operacion) => operacion.id !== action.payload.id
        ),
        total: state.total - parseInt(action.payload.valor),
      };

    default:
      return state;
  }
}

export const obtenerOperacionesAccion = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${API}operacion`, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("jwt")
      }
    });
    dispatch({
      type: OBTENER_OPERACIONES_EXITO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerOperacionesModeloAccion = (idModelo) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.get(
      `${API}modelo/${idModelo}/operaciones`, {
        headers: {
          Authorization: "Bearer " + getState().login.token
        }
      }
    );

    let total = 0;
    if (res.data[0] !== undefined) {
      total = res.data.reduce((a, b) => ({ valor: a.valor + b.valor })).valor;
    }
    const data = {
      operacionesM: res.data,
      total: total,
    };

    dispatch({
      type: OBTENER_OPERACIONES_MODELO_EXITO,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const agregarNuevaOperacionModeloAccion = (
  newOperacion,
  idModelo
) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `${API}operacion`,
      newOperacion, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("jwt")
        }
      }
    );

    if (res.data.response) {
      dispatch({
        type: AGREGAR_NUEVA_OPERACION_EXITO,
        payload: newOperacion,
      });

      const res = await axios.get(
        `${API}operacion/lastId`, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("jwt")
          }
        }
      );
      const response = await axios.post(
        `${API}modeloOperacion`,
        { modelo: idModelo, operacion: res.data }, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("jwt")
          }
        }
      );
      if (response.data.response) {
        const idModeloOperacion = await axios.get(
          `${API}modeloOperacion`, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("jwt")
            }
          }
        );

        dispatch({
          type: AGREGAR_NUEVA_OPERACION_MODELO_EXITO,
          payload: {
            id: idModeloOperacion.data,
            descripcion: newOperacion.descripcion,
            valor: newOperacion.valor,
          },
        });
        Swal.fire({
          position: "top-end",
          title: "Registro exitoso",
          icon: "success",
          timer: 1500,
        });
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
  } catch (error) {
    Swal.fire({
      position: "center",
      title: "Error en el servidor",
      icon: "warning",
      timer: 1500,
    });
  }
};

export const buscarOperaciones = (filtro) => (dispatch, getState) => {
  const operaciones = getState().operaciones.operaciones;

  const data = operaciones.filter((operacion) => {
    if (operacion.descripcion.toLowerCase().includes(filtro) && filtro) {
      return operacion;
    } else {
      return null;
    }
  });

  dispatch({
    type: BUSCAR_OPERACIONES,
    payload: data,
  });
};

export const agregarOperacionModeloAccion = (operacion) => async (
  dispatch,
  getState
) => {
  try {
    const modelo = getState().modelo;
    const res = await axios.post(
      `${API}modeloOperacion`,
      { modelo: modelo.id, operacion: operacion.id }, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("jwt")
        }
      }
    );

    const responseId = await axios.get(
      `${API}modeloOperacion`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("jwt")
        }
      }
    );

    if (res.data.response) {
      dispatch({
        type: AGREGAR_NUEVA_OPERACION_MODELO_EXITO,
        payload: {
          id: responseId.data,
          descripcion: operacion.descripcion,
          valor: operacion.valor,
        },
      });

      Swal.fire({
        position: "top-end",
        title: "Operacion Agregada",
        icon: "success",
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: "center",
        title: "Error al agregar operacion",
        icon: "warning",
        timer: 1500,
      });
    }
  } catch (error) {
    Swal.fire({
      position: "center",
      title: "Error en el servidor",
      icon: "warning",
      timer: 1500,
    });
  }
};

export const filtrarOperacionesAccion = (filtro) => (dispatch, getState) => {
  dispatch({
    type: FILTRAR_OPERACIONES,
    payload: filtro,
  });
};

export const eliminarOperacionModeloAccion = (operacion) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.delete(
      `${API}modeloOperacion/${operacion.id}`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("jwt")
        }
      }
    );

    if (res.data) {
      dispatch({
        type: "ELIMINAR_OPERACION_MODELO_EXITO",
        payload: operacion,
      });
    }
  } catch (error) {
    Swal.fire({
      position: "center",
      title: error,
      icon: "warning",
      timer: 1500,
    });
  }
};
