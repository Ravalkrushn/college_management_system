import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Faculty from "./pages/Faculty";
import Notice from "./pages/Notice";// ✅ ADD THIS
import Branch from "./pages/Branch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/student"
          element={
            <Layout>
              <Student />
            </Layout>
          }
        />

        {/* ✅ FACULTY ROUTE */}
        <Route
          path="/faculty"
          element={
            <Layout>
              <Faculty />
            </Layout>
          }
        />

        <Route
          path="/branch"
          element={
            <Layout>
              <Branch />
            </Layout>
          }
        />
        <Route
          path="/Notice"
          element={
            <Layout>
              <Notice />
            </Layout>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
