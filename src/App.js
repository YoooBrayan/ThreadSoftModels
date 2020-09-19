import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Modelo from "./components/Modelo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CreateModelo } from "./components/CreateModelo";

function App() {
  return (
    
      <BrowserRouter>
        <Navigation />
        <div className="App">
        <div className="container">
          <Switch>
            <Route path="/modelos">
              <Modelo />
            </Route>
            <Route path="/modelo/create">
              <CreateModelo />
            </Route>
          </Switch>
        </div>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
