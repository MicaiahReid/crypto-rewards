import React from "react";
import RoundButton from "./round-button";
import { useSelector } from "react-redux";
import { getAccountAddress } from "../../services/redux/selectors";
import MetaMaskService from "../../services/metamask";

const OnboardingButton = () => {
  const accountAddress = useSelector(getAccountAddress);

  const renderImage = () => {
    return (
      <img
        style={{ height: 16, width: 16, marginRight: 8 }}
        src={"green-check.png"}
        alt={"green-check"}
      ></img>
    );
  };

  return accountAddress ? (
    <RoundButton
      type="outline"
      label={
        accountAddress.slice(0, 6) +
        "..." +
        accountAddress.slice(accountAddress.length - 4, accountAddress.length)
      }
      onClick={MetaMaskService.checkWalletStatus}
      leftIcon={renderImage()}
    />
  ) : (
    <RoundButton
      type="solid"
      label={"Connect"}
      onPress={MetaMaskService.checkWalletStatus}
    />
  );
};

export default OnboardingButton;
