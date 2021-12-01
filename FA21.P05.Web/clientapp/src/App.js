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
import AdminDashBoard from "./pages/admindashboard/AdminDashBoard";
import AddCategory from "./admin/AddCategory/AddCategory";
import AddItem from "./admin/AddItem/AddItem";
import Item from "./core/Item/Item";
import Cart from "./core/cart/Cart";
import About from "./components/about/About";

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
              <Route path="/orders" exact component={Order} />
              <Route path="/contact" exact component={Contact} />
              */}
        <Route path="/admin/dashboard" exact component={AdminDashBoard} />
        <Route path="/create/category" exact component={AddCategory} />
        <Route path="/create/menu-item" exact component={AddItem} />
        <Route path="/item/:itemId" component={Item} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/about" exact component={About} />
        <Route path={"*"}>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
