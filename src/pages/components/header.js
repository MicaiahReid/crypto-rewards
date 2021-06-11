import React from "react";
import Logo from "./logo";

const Header = ({ rightComponent }) => {
  return (
    <div
      style={{
        position: "static",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Logo />
      {rightComponent && rightComponent}
    </div>
  );
};

export default Header;
