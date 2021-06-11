import { Icon } from '@material-ui/core';
import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';
import RoundButton from "../../../components/round-button";
import axios from "../../../../utils/API";

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';


export default function OnboardingButton() {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        const account = accounts[0];
        if (userId === "") {
          axios
            .get(`/api/user/${account}`)
            .then(({ data }) => {
              if (data && data._id) {
                setUserId(data._id);
              } else {
                axios
                  .post("/api/user/", { address: account })
                  .then(({ data }) => {
                    if (data && data._id) {
                      setUserId(data._id);
                    } else {
                      console.log("error creating user");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setButtonText(accounts[0].slice(0,6)+'...' + accounts[0].slice(accounts[0].length-4,accounts[0].length));
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts, userId]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.off("accountsChanged", handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };

  const renderImage = () => {
    <img style={{ flex: 1 }} src={"green-check.png"} alt={"green-check"}></img>
  }

  return (
    isDisabled ? <RoundButton type="outline" label={buttonText} onClick={onClick} leftIcon={renderImage}/> : <RoundButton type="solid" label={buttonText} onClick={onClick}/>
  );
}
