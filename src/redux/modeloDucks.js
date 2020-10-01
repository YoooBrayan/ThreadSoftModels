import axios from "axios";
import Swal from 'sweetalert2'

// constantes

const dataInicial = {
  nombre: "",
  valor: 0,
  proveedor: 1,
  id: null,
};

// types

const OBTENER_MODELO_EXITO = "OBTENER_MODELO_EXITO";
const ACTUALIZAR_MODELO_EXITO = "ACTUALIZAR_MODELO_EXITO";
const ACTUALIZAR_MODELO_API_EXITO = "ACTUALIZAR_MODELO_API_EXITO";

// reducer

export default function modeloReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_MODELO_EXITO:
      return { ...state, id: action.payload.id, nombre: action.payload.nombre, valor: action.payload.valor, proveedor: action.payload.proveedor};

    case ACTUALIZAR_MODELO_EXITO:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case ACTUALIZAR_MODELO_API_EXITO:
      return { ...state };

    default:
      return state;
  }
}

export const obtenerModeloAccion = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/v1/modelo/${id}`);
    dispatch({
      type: OBTENER_MODELO_EXITO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
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

export const actualizarModeloAPIAccion = () => async(dispatch, getState) => {
  try {

    const data = getState().modelo;
    console.log("data",data);
    const res = await axios.put(`http://localhost:8080/api/v1/modelo`, data)
    console.log(res.data)
    if(res.data.response){
      Swal.fire({
        position: "top-end",
          icon: "success",
          title: "Modelo Actualizado!",
          timer: 1500
      })
    }else{
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
}
