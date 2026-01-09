import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SubMenu from "./SubMenu";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    // ✅ THIS WAS MISSING (ROOT FIX)
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div style={{ marginTop: "64px" }}>
        <SubMenu darkMode={darkMode} />

        <div
          style={{
            marginLeft: "220px",
            padding: "28px",
            minHeight: "100vh",
            background: darkMode ? "#020617" : "#f1f5f9",
            color: darkMode ? "#f8fafc" : "#020617",
            transition: "all 0.3s ease",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
