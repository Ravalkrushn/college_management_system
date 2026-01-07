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
            marginLeft: "220px",  
            padding: "28px",
            background: "#f1f5f9",
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
