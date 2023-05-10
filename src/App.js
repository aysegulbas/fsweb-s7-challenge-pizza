import React from "react";
import MiddlePage from "./layout/MiddlePage";
import { Switch, Route } from "react-router-dom";
import HomePage from "./layout/HomePage";
import ResultPage from "./layout/ResultPage";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/pizza">
          <MiddlePage />
        </Route>
        <Route path="/order">
          <ResultPage />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
