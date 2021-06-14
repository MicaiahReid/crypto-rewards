import MetaMaskOnboarding from "@metamask/onboarding";
import { store } from "./redux";
import { setAccountAddress } from "./redux/actions";

class MetaMaskService {
  metamaskOnboarding;

  constructor() {
    this.metamaskOnboarding = new MetaMaskOnboarding();
    this.subscribeToAccountChanges();
  }

  checkWalletStatus = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      MetaMaskService.startOnboarding();
    }
  };

  handleAccountChanges = (accounts) => {
    const accountAddress =
      (accounts && accounts.length > 0 && accounts[0]) || undefined;
    store.dispatch(setAccountAddress(accountAddress));
  };

  subscribeToAccountChanges = async () => {
    try {
      // Detect initial account status
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      this.handleAccountChanges(accounts);
      // Listen to account change events
      window.ethereum.on("accountsChanged", this.handleAccountChanges);
    } catch (error) {
      console.log("Error subscribing to account changes.");
    }
  };
}

const service = new MetaMaskService();

export default service;
