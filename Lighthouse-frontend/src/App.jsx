import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import NavBar from "./components/NavBar"; 
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import IndividualLLM from "./pages/IndividualLLM";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<IndividualLLM />} />
      </Routes>
    </>
  );
}

export default App;
