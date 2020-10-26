import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modelo from "components/Modelo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CreateModelo } from "components/CreateModelo";
import ModeloOperaciones from "components/ModeloOperaciones/ModeloOperaciones";

import NotFound from "components/NotFound";
import Login from "components/Login";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/modelo/create" component={CreateModelo} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/modelo/operaciones/:id" component={ModeloOperaciones} />
          <Route exact path="/modelo" component={Modelo} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
