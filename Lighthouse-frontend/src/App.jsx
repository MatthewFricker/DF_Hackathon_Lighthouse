import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBarMD from "./components/NavBar"; 
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddLMM from "./pages/AddLMM";

import "./App.css";


function App() {

  return (
    <>
      <NavBarMD />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/model/:name" element={<Detail />} />
        <Route path="/addLMM" element={<AddLMM />} />
      </Routes>
    </>
  );
}

export default App;
