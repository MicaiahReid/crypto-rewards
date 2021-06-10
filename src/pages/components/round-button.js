import React from "react";

const RoundButton = ({ style, label, onPress }) => {
  return (
    <div
      onClick={onPress}
      style={{
        ...style,
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        height: 36,
        padding: "0px 24px",
        backgroundColor: "#0085FF",
        fontWeight: "800",
        fontSize: 12,
        color: "white",
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
};

export default RoundButton;
