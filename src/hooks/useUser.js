import { useCallback, useState } from "react";
import loginService from "services/login";
import { useSelector, useDispatch } from "react-redux";
import { accerderAction } from "redux/loginDucks";
import Swal from "sweetalert2";

export default function useUser() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.login);

  const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback(
    ({ email, password }) => {
      setState({ loading: true, error: false });

      loginService({ email, password })
        .then((res) => {
          window.sessionStorage.setItem("jwt", res);
          setState({ loading: true, error: false });
          dispatch(accerderAction(res));
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            text: error,
          });
          window.sessionStorage.removeItem("jwt");
          setState({ loading: false, error: true });
        });
    },
    [token] // eslint-disable-line react-hooks/exhaustive-deps
  ); 

  return {
    isLogged: Boolean(token),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
  };
}
