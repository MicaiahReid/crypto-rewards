import React, { useCallback, useState } from "react";
import RoundButton from "../../components/round-button";
import { animated, useSpring } from "@react-spring/web";
import { useDispatch } from "react-redux";
import {
  enrollToChallenge,
  verifyRewards,
} from "../../../services/redux/actions";

const Campaign = ({ onSelect, campaign }) => {
  const [isHovering, setIsHovering] = useState(false);
  const animationStyle = useSpring({
    translateY: isHovering ? -4 : 0,
    scale: isHovering ? 1.02 : 1,
    config: {
      duration: 100,
    },
  });

  const dispatch = useDispatch();

  const selectCampaign = useCallback(() => {
    onSelect(campaign);
  }, [onSelect, campaign]);

  const renderButton = useCallback(() => {
    if (campaign.status === "claimed")
      return (
        <RoundButton
          style={{
            backgroundColor: "black",
            borderColor: "black",
          }}
          label="Claimed"
          leftIcon={
            <img
              style={{ height: 16, width: 16, marginRight: 8 }}
              src={"green-check.png"}
              alt={"green-check"}
            ></img>
          }
        />
      );
    else if (campaign.status === "enrolled")
      return (
        <RoundButton
          onPress={() => dispatch(verifyRewards(campaign._id))}
          style={{
            marginTop: 8,
            backgroundColor: `${`rgba(55, 215, 100, 1)`}`,
            borderColor: `${`rgba(55, 215, 100, 1)`}`,
          }}
          label={"Claim"}
        />
      );
    else
      return (
        <RoundButton
          onPress={() => dispatch(enrollToChallenge(campaign._id))}
          style={{ marginTop: 8 }}
          label={"Enroll"}
        />
      );
  }, [campaign, dispatch]);

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
      <img style={{ flex: 1 }} src={campaign.icon} alt={"campaign-card"}></img>
      {/** Card content */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          bottom: 8,
          right: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: 16,
          borderRadius: 10,
          background:
            "linear-gradient(rgba(45, 45, 45, 0), rgba(45, 45, 45, 0.73))",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          {campaign.protocol}
        </div>
        <div style={{ color: "white", fontSize: 13 }}>{campaign.title}</div>
        <div style={{ display: "flex", marginBottom: 4 }}>
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
