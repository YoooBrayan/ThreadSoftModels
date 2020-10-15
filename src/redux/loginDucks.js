import axios from "axios";
import { API } from "service/settings";

const dataInicial = {
  error: false,
  isLogged: false,
  token: null
};

const ACCEDER_EXITO = "ACCEDER_EXITO";

export default function loginReducer(state = dataInicial, action) {
  switch (action.type) {
    case ACCEDER_EXITO:
      return {...state, token: action.payload, isLogged: true};

    default:
      return state;
  }
}

export const accerderAction = ({ email, password }) => async (
  dispatch,
  getState
) => {
  console.log(email, password);
  try {
    const res = await axios.post(
      `${API}authenticate`,
      {
        email: email,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );


    if(res.request.status === 200){
        dispatch({
            type: ACCEDER_EXITO,
            payload: res.data.token
        })
    }

    console.log(res.request.status);
    console.log(res.data.token);
  } catch (error) {
    console.log(error.request.status);
  }
};
