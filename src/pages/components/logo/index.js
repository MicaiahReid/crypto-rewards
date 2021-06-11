import React from "react";

const Logo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={"app-logo.png"}
        alt={"app-logo"}
        style={{ height: 30, width: 30 }}
      />
      <div style={{ fontSize: "15", fontWeight: "800", marginLeft: 8 }}>
        {"Consensys Rewards"}
      </div>
    </div>
  );
};

export default Logo;
