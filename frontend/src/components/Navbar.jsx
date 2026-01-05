import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      navigate("/"); // Login.jsx route
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
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        zIndex: 1000,
        overflowX: "hidden",
      }}
    >
      {/* LEFT */}
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
          onClick={() => setDark(!dark)}
          style={{
            border: "1px solid #e5e7eb",
            background: "#f8fafc",
            padding: "6px 10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🌙
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
