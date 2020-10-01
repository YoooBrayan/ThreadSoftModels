import axios from "axios";

// constantes

const dataInicial = {
  operaciones : []
};

// types

const OBTENER_OPERACIONES_EXITO = "OBTENER_OPERACIONES_EXITO";

// reducer

export default function operacionesReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_OPERACIONES_EXITO:
      return { ...state, operaciones: action.payload };

    default:
      return state;
  }
}

export const obtenerOperacionesAccion = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/v1/operacion`);
    dispatch({
      type: OBTENER_OPERACIONES_EXITO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
