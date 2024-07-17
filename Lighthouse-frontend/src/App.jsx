import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import NavBarMD from "./components/NavBar"; 
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import IndividualLLM from "./pages/IndividualLLM";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        <Route path="/catalog/:id" element={<IndividualLLM />} />
      </Routes>
    </>
  );
}

export default App;
