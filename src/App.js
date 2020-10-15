import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navigation from "components/Navigation";
import Modelo from "components/Modelo";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { CreateModelo } from "components/CreateModelo";
import ModeloOperaciones from "components/ModeloOperaciones/ModeloOperaciones";

import NotFound from "components/NotFound";
import Login from "components/Login";
import {useSelector} from 'react-redux'

function App() {

  const login = useSelector(state => state.login)

  return (
      <BrowserRouter>
      {
        login.isLogged ? <Navigation /> : <Redirect to="/login" />
      }
        <div className="App">
          <div className="container p-4">
            <Switch>
              <Route path="/modelo/create" component={CreateModelo} />
              <Route path="/notfound" component={NotFound}/>
              <Route path="/modelo/operaciones/:id" component={ModeloOperaciones} />
              <Route exact path="/modelo" component={Modelo} />
              <Route path="/login" component={Login} />
              <Route  component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
