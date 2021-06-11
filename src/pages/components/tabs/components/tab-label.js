import React, { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

const TabLabel = ({ label, isSelected, onSelect, index }) => {
  const [isHovering, setIsHovering] = useState(false);
  const animationStyle = useSpring({
    scale: isHovering ? 1.05 : 1,
    config: {
      duration: 100,
    },
  });

  return (
    <div>
      <animated.div
        style={{ cursor: "pointer", ...animationStyle }}
        onClick={() => onSelect(index)}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <div
          style={{
            marginTop: 3,
            fontSize: 22,
            fontWeight: "800",
            color: isSelected ? "#282d43" : "rgba(66, 68, 97, 0.5)",
          }}
        >
          {label}
        </div>
      </animated.div>
      <div
        style={{
          height: 3,
          backgroundColor: isSelected ? "#24B0FF" : undefined,
        }}
      />
    </div>
  );
};

export default TabLabel;
