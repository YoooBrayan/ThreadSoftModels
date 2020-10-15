import React, { useState } from "react";
import { accerderAction } from "redux/loginDucks";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(accerderAction(data));
  };

  return (
  
    <div className="container">
      {login.isLogged ?  <Redirect  to="/modelo" /> : 
      <div className="row">
        <div className="col-6 offset-3 border p-4">
          <h1 className="text-info">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="email"
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
      </div>}
    </div>
  );
}
