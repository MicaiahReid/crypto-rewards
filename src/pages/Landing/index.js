import React, { useCallback } from "react";
import Header from "../components/header";
import RoundButtom from "../components/round-button";

const Landing = () => {
  const renderDescriptionSection = useCallback(() => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: 48,
          // flex: 1,
          minWidth: 450,
          // backgroundColor: "blue",
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: "800",
            marginBottom: 12,
            maxWidth: 400,
            lineHeight: 1.2,
          }}
        >
          {"Get rewarded by using Defi."}
        </div>
        <div
          style={{
            fontSize: 15,
            color: "#5F6B7C",
            marginBottom: 24,
            maxWidth: 340,
          }}
        >
          {"Discover ways to start earning rewards by using DeFi."}
        </div>
        <div style={{ display: "flex" }}>
          <RoundButtom style={{ marginRight: 16 }} label={"Earn Rewards"} />
          <RoundButtom label={"Earn Rewards"} />
        </div>
      </div>
    );
  }, []);

  const renderImageSection = useCallback(() => {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          // backgroundColor: "green",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={"stars.png"}
          alt={"stars"}
          style={{
            width: "100%",
            minWidth: 260,
            maxWidth: 400,
            // backgroundColor: "red",
          }}
        />
      </div>
    );
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: "white",
        padding: "0px 32px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        {renderDescriptionSection()}
        {renderImageSection()}
      </div>
    </div>
  );
};

export default Landing;
