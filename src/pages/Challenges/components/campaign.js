import React, { useCallback, useState } from "react";
import RoundButton from "../../components/round-button";
import { animated, useSpring } from "@react-spring/web";
import axios from "../../../utils/API";
import getConnectedPublicAddress from "../../../utils/MetaMaskUtils";

const Campaign = ({ onSelect, campaign, campaignStatus, enrollOrVerify}) => {
  const [isHovering, setIsHovering] = useState(false);
  const animationStyle = useSpring({
    translateY: isHovering ? -4 : 0,
    scale: isHovering ? 1.02 : 1,
    config: {
      duration: 100,
    },
  });

  const selectCampaign = useCallback(() => {
    console.log(campaign)
    onSelect(campaign);
  }, [onSelect, campaign]);

  const renderButton = useCallback(() => {
        if(campaignStatus === "claimed")         
        return ( <RoundButton
            onPress={enrollOrVerify}
            style={{ marginTop: 8,
              backgroundColor: "black", 
              }}
            label={"Claimed"}/>);
        else if (campaignStatus === "enrolled")      
        return (<RoundButton
          onPress={enrollOrVerify}
          style={{ marginTop: 8,
            backgroundColor: `${`rgba(55, 215, 100, 1)`}`, 
            borderColor: `${`rgba(55, 215, 100, 1)`}`
            }}
          label={"Claim"}/>);
        else  
        return ( <RoundButton
            onPress={enrollOrVerify}
            style={{ marginTop: 8 }}
            label={"Enroll"}
          />);
  }, [campaignStatus, enrollOrVerify]);

  return (
    <animated.div
      style={{
        display: "flex",
        height: 268,
        width: 205,
        padding: 8,
        border: `2px solid ${
          isHovering ? `#24B0FF` : `rgba(89, 93, 149, 0.15)`
        }`,
        borderRadius: 10,
        cursor: "pointer",
        position: "relative",
        marginRight: 24,
        marginBottom: 24,
        ...animationStyle,
      }}
      onClick={selectCampaign}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {/** Card background */}
      <img
        style={{ flex: 1 }}
        src={campaign.icon}
        alt={"campaign-card"}
      ></img>
      {/** Card content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: 24,
        }}
      >
        <div style={{ color: "white", fontSize: 20, fontWeight: "800", marginBottom: 4  }}>
          {campaign.protocol}
        </div>
        <div style={{ color: "white", fontSize: 13, marginBottom: 4  }}>
          {campaign.title}
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ color: "white", fontSize: 13, marginRight: 4 }}>
            {"Rewards:"}
          </div>
          <div style={{ color: "white", fontSize: 13, fontWeight: "800" }}>
            {campaign.reward}
          </div>
        </div>
        {renderButton()}
      </div>
    </animated.div>
  );
};

export default Campaign;
