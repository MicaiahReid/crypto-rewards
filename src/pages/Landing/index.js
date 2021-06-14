import React, { useCallback } from "react";
import Header from "../components/header";
import RoundButtom from "../components/round-button";

const Landing = ({ onDismiss }) => {
  const renderDescriptionSection = useCallback(() => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: 48,
          minWidth: 450,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: "800",
            marginBottom: 12,
            maxWidth: 500,
            lineHeight: 1.2,
          }}
        >
          {"Get rewarded by using decentralized apps."}
        </div>
        <div
          style={{
            fontSize: 15,
            color: "#5F6B7C",
            marginBottom: 24,
          }}
        >
          {"Discover ways to start earning rewards by using Dapps."}
        </div>
        <div style={{ display: "flex" }}>
          <RoundButtom
            size={"large"}
            style={{ marginRight: 16 }}
            label={"Earn Rewards"}
            onPress={onDismiss}
          />
          <RoundButtom
            onPress={() => alert("Show more info about Consensys Rewards.")}
            size={"large"}
            type={"outline"}
            label={"Learn More"}
          />
        </div>
      </div>
    );
  }, [onDismiss]);

  const renderImageSection = useCallback(() => {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 48,
          marginRight: 32,
        }}
      >
        <img
          src={"stars.png"}
          alt={"stars"}
          style={{
            width: "100%",
            maxWidth: 500,
            minWidth: 400,
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
        background: `radial-gradient(#f2f7ff, white)`,
        padding: "0px 5%",
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
