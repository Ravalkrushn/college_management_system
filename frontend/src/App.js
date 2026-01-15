import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Faculty from "./pages/Faculty";
import Notice from "./pages/Notice";
import Branch from "./pages/Branch";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Layout>
                <Student />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty"
          element={
            <ProtectedRoute>
              <Layout>
                <Faculty />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/branch"
          element={
            <ProtectedRoute>
              <Layout>
                <Branch />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notice"
          element={
            <ProtectedRoute>
              <Layout>
                <Notice />
              </Layout>
            </ProtectedRoute>
          }
        />
  
        {/* SAFE FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
