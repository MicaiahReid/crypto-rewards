import React from "react";
import RoundButton from "./round-button";
import MetaMaskService from "../../services/metamask";

const NoWalletPlaceholder = ({ accountAddress, placeholder }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          marginTop: 64,
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          fontWeight: "400",
        }}
      >
        {accountAddress ? placeholder : "Connect your wallet to use the app."}
      </div>
      {accountAddress ? null : (
        <RoundButton
          style={{ marginTop: 16 }}
          label={"Connect"}
          size={"large"}
          onPress={MetaMaskService.checkWalletStatus}
        />
      )}
    </div>
  );
};

export default NoWalletPlaceholder;
