import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageRender from "./pageRender";
import Header from "./components/globals/Header";
import Footer from "./components/globals/Footer";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
