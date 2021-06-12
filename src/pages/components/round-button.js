import React, { useCallback, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

const RoundButton = ({
  size = "medium",
  type = "solid",
  style,
  label,
  onPress,
  leftIcon,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const animationStyle = useSpring({
    scale: isHovering ? 1.05 : 1,
    config: {
      duration: 100,
    },
  });

  const buttonSize = useCallback(() => {
    switch (size) {
      case "small":
        return {
          height: 24,
          padding: `0px ${!!leftIcon ? "12" : "18"}px`,
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
  }, [size, leftIcon]);

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
    <animated.div
      onClick={(e) => {
        e.stopPropagation();
        onPress && onPress(e);
      }}
      style={{
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        border: "2px solid",
        ...buttonSize(),
        ...buttonStyle(),
        ...style,
        ...animationStyle,
      }}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {leftIcon && leftIcon}
      {label}
    </animated.div>
  );
};

export default RoundButton;
