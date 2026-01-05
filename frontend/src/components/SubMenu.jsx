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
        display: "flex",
        gap: "12px",
        padding: "16px 24px",
        background: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          style={{
            padding: "8px 20px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background: isActive(tab)
              ? "linear-gradient(135deg,#2563eb,#1d4ed8)"
              : "#eef2ff",
            color: isActive(tab) ? "#fff" : "#1d4ed8",
            fontWeight: 500,
            boxShadow: isActive(tab)
              ? "0 6px 16px rgba(37,99,235,0.35)"
              : "none",
            transition: "all 0.3s ease",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SubMenu;
