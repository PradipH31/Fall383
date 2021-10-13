import React from "react";
import "./App.css";
// import { getMenuItems } from "./components/actions/home";
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";

function App() {
  // const [items, setItems] = useState([]);
  // const [error, setError] = useState();

  // const getItems = () => {
  //   return getMenuItems()
  //     .then((data) => {
  //       setItems(data);
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   getItems();
  // }, []);

  return (
    <div className="App">
      <>
        <NavBar />
        <Header />
      </>
    </div>
  );
}

export default App;
