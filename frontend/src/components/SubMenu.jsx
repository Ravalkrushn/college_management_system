import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  "Home",
  "Student",
  "Faculty",
  "Branch",
  "Notice",
  "Exam",
  "Fees",
  "Subjects",
  "Admin",
];

const SubMenu = ({ darkMode }) => {
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
        background: darkMode ? "#1e293b" : "#ffffff",
        borderRight: darkMode ? "1px solid #334155" : "1px solid #eef2f7",
        padding: "40px 10px 16px 12px",
        display: "flex",
        flexDirection: "column",
        zIndex: 999,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {tabs.map((tab, index) => (
        <React.Fragment key={tab}>
          <button
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
              color: isActive(tab) ? "#fff" : darkMode ? "#cbd5e1" : "#1e293b",
              boxShadow: isActive(tab)
                ? "0 6px 16px rgba(37,99,235,0.35)"
                : "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive(tab)) {
                e.currentTarget.style.background = darkMode
                  ? "#334155"
                  : "#f1f5f9";
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
          {index < tabs.length - 1 && (
            <div
              style={{
                height: "1px",
                background: darkMode ? "#334155" : "#eef2f7",
                margin: "10px 0",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SubMenu;
