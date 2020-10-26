
const dataInicial = {
  error: false,
  isLogged: window.sessionStorage.getItem("jwt") ? true : false,
  token: null,
};

const ACCEDER_EXITO = "ACCEDER_EXITO";

export default function loginReducer(state = dataInicial, action) {
  switch (action.type) {
    case ACCEDER_EXITO:
      return { ...state, token: action.payload, isLogged: true };

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
