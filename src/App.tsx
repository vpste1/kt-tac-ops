import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
import { Browse } from "./pages/browse";
import { Create } from "./pages/create";
import "./App.css";
import { ViewedCardProvider } from "./context/view-card-context";

const App = () => (
  <Switch>
    <ViewedCardProvider>
      <Route exact path="/" component={Home} />
      <Route exact path="/browse" component={Browse} />
      <Route exact path="/create" component={Create} />
    </ViewedCardProvider>
  </Switch>
);

export default App;
