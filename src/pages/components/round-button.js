import React, { useCallback } from "react";

const RoundButton = ({
  size = "medium",
  type = "solid",
  style,
  label,
  onPress,
  leftIcon,
}) => {
  const buttonSize = useCallback(() => {
    switch (size) {
      case "small":
        return {
          height: 24,
          padding: "0px 20px",
          fontWeight: "600",
          fontSize: 12,
          color: "white",
        };
      case "large":
        return {
          height: 34,
          padding: "0px 24px",
          fontWeight: "800",
          fontSize: 13,
          color: "white",
        };
      case "medium":
      default:
        return {
          height: 28,
          padding: "0px 22px",
          fontWeight: "800",
          fontSize: 12,
          color: "white",
        };
    }
  }, [size]);

  const buttonStyle = useCallback(() => {
    switch (type) {
      case "outline":
        return {
          backgroundColor: undefined,
          borderColor: "#282d43",
          color: "#282d43",
        };
      case "solid":
      default:
        return {
          backgroundColor: "#0085FF",
          borderColor: "#0085FF",
          color: "white",
        };
    }
  }, [type]);

  return (
    <div
      onClick={onPress}
      style={{
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        border: "2px solid",
        ...buttonSize(),
        ...buttonStyle(),
        ...style,
      }}
    >   
      {leftIcon && leftIcon}
      {label}
    </div>
  );
};

export default RoundButton;
