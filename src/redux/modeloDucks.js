import axios from "axios";
import { API } from "services/settings";
import Swal from "sweetalert2";

// constantes

const dataInicial = {
  nombre: "",
  valor: 0,
  proveedor: 1,
  id: null,
  error: false,
};

// types

const OBTENER_MODELO_EXITO = "OBTENER_MODELO_EXITO";
const OBTENER_MODELO_ERROR = "OBTENER_MODELO_ERROR";
const ACTUALIZAR_MODELO_EXITO = "ACTUALIZAR_MODELO_EXITO";
const ACTUALIZAR_MODELO_API_EXITO = "ACTUALIZAR_MODELO_API_EXITO";

// reducer

export default function modeloReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_MODELO_EXITO:
      return {
        ...state,
        id: action.payload.id,
        nombre: action.payload.nombre,
        valor: action.payload.valor,
        proveedor: action.payload.proveedor,
        error: false
      };

    case ACTUALIZAR_MODELO_EXITO:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case ACTUALIZAR_MODELO_API_EXITO:
      return { ...state };
    case OBTENER_MODELO_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const obtenerModeloAccion = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${API}modelo/${id}`, {
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("jwt")
      }
    });
    dispatch({
      type: OBTENER_MODELO_EXITO,
      payload: res.data,
    });
  } catch (error) {
    if (error.toString().includes("404")) {
      dispatch({
        type: OBTENER_MODELO_ERROR,
        payload: true,
      });
    }
  }
};

export const actualizarModeloAccion = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTUALIZAR_MODELO_EXITO,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const actualizarModeloAPIAccion = () => async (dispatch, getState) => {
  try {
    const data = getState().modelo;
    const res = await axios.put(`${API}modelo`, data, {
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("jwt")
      }
    });
    if (res.data.response) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Modelo Actualizado!",
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        title: "Error al Actualizar!",
        icon: "error",
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
