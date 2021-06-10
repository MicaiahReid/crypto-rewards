import React, { useCallback, useState } from "react";
import RoundButton from "../../components/round-button";

const Campaign = ({ onSelect, campaign }) => {
  const [isHovering, setIsHovering] = useState(false);

  const selectCampaign = useCallback(() => {
    onSelect(campaign);
  }, [onSelect, campaign]);

  return (
    <div
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
        marginBottom: 16,
      }}
      onClick={selectCampaign}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {/** Card background */}
      <img
        style={{ flex: 1 }}
        src={"campaign-card.png"}
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
        <div style={{ color: "white", fontSize: 20, fontWeight: "800" }}>
        {campaign.title}
          </div>
          <div style={{ color: "white", fontSize: 13 }}>
            {campaign.shortDescription}
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ color: "white", fontSize: 13, marginRight: 4 }}>
              {"Rewards:"}
            </div>
            <div style={{ color: "white", fontSize: 13, fontWeight: "800" }}>
              {campaign.reward}
            </div>
          </div>
          <RoundButton style={{ marginTop: 8 }} label={"Enroll"} />
        </div>
      </div>
  );
};

export default Campaign;
