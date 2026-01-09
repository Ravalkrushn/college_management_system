import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        maxWidth: "99vw",
        height: "64px",
        background: darkMode ? "#1e293b" : "#ffffff",
        color: darkMode ? "#f8fafc" : "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        zIndex: 1000,
        overflowX: "hidden",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src="/clg.jpg"
          alt="logo"
          style={{ width: "36px", height: "36px", borderRadius: "8px" }}
        />
        <h3 style={{ margin: 0, fontWeight: 600, fontSize: "16px" }}>
          DUIAS COLLEGE DASHBOARD
        </h3>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            border: darkMode ? "1px solid #475569" : "1px solid #e5e7eb",
            background: darkMode ? "#334155" : "#f8fafc",
            padding: "6px 10px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={darkMode ? "/light-mode.svg" : "/dark.svg"}
            alt="theme"
            style={{ width: "22px", height: "22px", objectFit: "contain" }}
          />
        </button>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            marginRight: "40px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
