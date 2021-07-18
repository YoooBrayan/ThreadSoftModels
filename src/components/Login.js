import React, { useState, useEffect } from "react";
import useUser from "hooks/useUser";

export default function Login(props) {
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser();
  const { history } = props;

  useEffect(() => {
    if (isLogged) {
      history.push("/modelo");
    }else{
      window.sessionStorage.removeItem("jwt");
    }
  }, [isLogged, history]);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data", data);
    login(data);
  };

  return (
    <div className="container mt-4">
      {isLoginLoading && <strong>Checking credentials...</strong>}
      {!isLoginLoading && (
        <div className="row">
          <div className="col-6 offset-3 border p-4">
            <h1 className="text-info">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  name="username"
                  className="form-control"
                  placeholder="username"
                  onChange={handleChangeInput}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                  onChange={handleChangeInput}
                  required
                />
              </div>
              <button className="btn btn-success">Login</button>
            </form>
          </div>
        </div>
      )}
      {
        hasLoginError && <strong>Credentials are invalid</strong>
      }
    </div>
  );
}
