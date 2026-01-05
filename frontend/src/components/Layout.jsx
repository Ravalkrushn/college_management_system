import React from "react";
import Navbar from "./Navbar";
import SubMenu from "./SubMenu";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div style={{ marginTop: "64px" }}>
        <SubMenu />

        <div
          style={{
            padding: "28px",
            background: "#f8fafc",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
