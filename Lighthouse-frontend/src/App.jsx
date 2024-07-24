import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./services/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Matrix from "./pages/Matrix";
import Catalog from "./pages/Catalog";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddLLM from "./pages/AddLLM";
import LeaveFeedback from "./pages/LeaveFeedback";
import FeedbackTable from "./pages/FeedbackTable";
import NoAccess from "./pages/NoAccess";
import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matrix" element={<Matrix />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/model/:name" element={<Detail />} />
        <Route path="/addLLM" element={<AddLLM />} />
        <Route path="/feedback" element={<LeaveFeedback />} />
        <Route path="/viewFeedback" element={<FeedbackTable />} />
        <Route path="/noaccess" element={<NoAccess />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
