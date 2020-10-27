const dataInicial = {
  error: false,
  isLogged: window.localStorage.getItem("jwt") ? true : false,
  token: window.localStorage.getItem("jwt") ,
};

const ACCEDER_EXITO = "ACCEDER_EXITO";
const SALIR_EXITO = "SALIR_EXITO";

export default function loginReducer(state = dataInicial, action) {
  switch (action.type) {
    case ACCEDER_EXITO:
      return { ...state, token: action.payload, isLogged: true };

    case SALIR_EXITO:
      return { ...state, token: "", isLogged: false };

    default:
      return state;
  }
}

export const accerderAction = (jwt) => async (dispatch, getState) => {
  dispatch({
    type: ACCEDER_EXITO,
    payload: jwt,
  });
};

export const salirAction = () => async (dispatch) => {
  window.localStorage.removeItem("jwt");  
  dispatch({
    type: SALIR_EXITO,
  });
};
