import { Button } from "antd";
import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import Home from "./pages/common/Home";
import Polls from "./pages/admin/Polls";
import ProtectedRoute from "./components/ProtectedRoute";
import AddEditPolls from "./pages/admin/Polls/AddEditPolls";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <>
    {loading && <Spinner />}
    <BrowserRouter>
      <Routes>
        {/* Common Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/polls"
          element={
            <ProtectedRoute>
              <Polls />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/polls/add"
          element={
            <ProtectedRoute>
              <AddEditPolls />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/polls/edit/:id"
          element={
            <ProtectedRoute>
              <AddEditPolls />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
