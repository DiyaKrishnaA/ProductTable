import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Project/Login";
import Register from "./Project/Register";
import HomePage from "./Project/HomePage";
import NavBar from "./Project/NavBar";
import { createContext, useEffect, useState } from "react";
import { auth } from "./Project/Firebase";
import NavHome from "./Project/NavHome";
import CreateForm from "./Project/CreateForm";
import axios from "axios";
import EditForm from "./Project/EditForm";
import "react-toastify/dist/ReactToastify.css";

const Navbarcontext = createContext();

function App() {
  const [user, setuser] = useState();
  const [showNav, setshowNav] = useState(true);
  const [showNavHome, setshowNavHome] = useState(false);
  const [product, setproduct] = useState([]);
  const [productid, setproductid] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setuser(user);
    });
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setproduct(res.data.products));
  }, []);

  return (
    <div>
      <Navbarcontext.Provider
        value={{
          showNav,
          setshowNav,
          showNavHome,
          setshowNavHome,
          product,
          setproduct,
          productid,
          setproductid,
        }}
      >
        <BrowserRouter>
          {showNav === true ? <NavBar /> : ""}
          {showNavHome === true ? <NavHome /> : ""}

          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <Login />}
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/logout" element={<Login />}></Route>
            <Route path="/createform" element={<CreateForm />}></Route>
            <Route path="/editform" element={<EditForm />}></Route>
          </Routes>
        </BrowserRouter>
      </Navbarcontext.Provider>
    </div>
  );
}

export default App;
export { Navbarcontext };
