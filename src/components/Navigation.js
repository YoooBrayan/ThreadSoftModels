import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { salirAction } from "../redux/loginDucks";

export default function Navigation() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <Link className="navbar-brand" to="/modelo">
        Modelos
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/login"
              onClick={() => {
                dispatch(salirAction());
              }}
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
