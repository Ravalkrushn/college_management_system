import React from "react";

const cards = [
  { title: "Total Students", value: "1200", color: "#2563eb" },
  { title: "Total Faculty", value: "25", color: "#16a34a" },
  { title: "Total Collected", value: "₹12,50,000", color: "#f59e0b" },
  { title: "Total Courses", value: "6", color: "#ef4444" },
];

const Home = () => {
  return (
    <div>
      <h2 style={{ marginBottom: "24px", fontWeight: 600 }}>
        Dashboard Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "18px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              borderLeft: `6px solid ${card.color}`,
              transition: "transform 0.3s ease",
            }}
          >
            <p style={{ margin: 0, color: "#64748b", fontWeight: 500 }}>
              {card.title}
            </p>
            <h2 style={{ marginTop: "12px", color: card.color }}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
