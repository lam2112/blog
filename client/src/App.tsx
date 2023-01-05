import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import PageRender from "./pageRender";
import Header from "./components/globals/Header";
import Footer from "./components/globals/Footer";
import { Alert } from './components/alert/Alert'
import { refreshToken } from "./redux/actions/authAction";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken())
  },[dispatch])

  return (
    <div className="container">
      <BrowserRouter>
        <Alert />
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
