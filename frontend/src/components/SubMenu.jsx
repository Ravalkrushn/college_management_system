import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  "Home",
  "Student",
  "Faculty",
  "Branch",
  "Notice",
  "Exam",
  "Subjects",
  "Admin",
];

const SubMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (tab) => {
    if (tab === "Home") {
      navigate("/dashboard");
    } else {
      navigate(`/${tab.toLowerCase()}`);
    }
  };

  const isActive = (tab) => {
    if (tab === "Home") return location.pathname === "/dashboard";
    return location.pathname === `/${tab.toLowerCase()}`;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "64px",        
        left: 0,
        width: "220px",
        height: "calc(100vh - 64px)",
        background: "#ffffff",
        borderRight: "1px solid #eef2f7",
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 999,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
            background: isActive(tab)
              ? "linear-gradient(135deg,#2563eb,#1d4ed8)"
              : "transparent",
            color: isActive(tab) ? "#fff" : "#1e293b",
            boxShadow: isActive(tab)
              ? "0 6px 16px rgba(37,99,235,0.35)"
              : "none",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            if (!isActive(tab)) {
              e.currentTarget.style.background = "#f1f5f9";
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive(tab)) {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SubMenu;
