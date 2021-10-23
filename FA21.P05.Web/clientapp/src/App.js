import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { getMenuItems } from "./components/actions/home";
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";
import PageNotFound from "./components/404/PageNotFound";
// import Menu from "./components/menu/Menu";
import Feature from "./components/features/Feature";
import DownloadApp from "./components/downloadapp/Downloadapp";
import Menu from "./components/menu/Menu";
import Specials from "./components/special/Specials";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Header />
          <hr className="center-star" data-content="★" />
          <Feature />
          <hr className="center-star" data-content="★" />
          <Specials />
          <hr className="center-star" data-content="★" />
          <DownloadApp />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        {/* 
              <Route path="/about" exact component={About} />
              <Route path="/orders" exact component={Order} />
              <Route path="/contact" exact component={Contact} />
              */}

        <Route path={"*"}>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
