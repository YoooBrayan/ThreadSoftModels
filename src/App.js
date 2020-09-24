import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Modelo from "./components/Modelo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CreateModelo } from "./components/CreateModelo";
import ModeloOperaciones from './components/ModeloOperaciones/ModeloOperaciones';

function App() {
  return (
    
      <BrowserRouter>
        <Navigation />
        <div className="App">
        <div className="container p-4">
          <Switch>
            <Route path="/modelos">
              <Modelo />
            </Route>
            <Route path="/modelo/create">
              <CreateModelo />
            </Route>
            <Route path="/modelo/operaciones/:id">
              <ModeloOperaciones />
            </Route>
          </Switch>
        </div>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
