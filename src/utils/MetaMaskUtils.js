/**
 * Returns promise fetching current connected ethereum address
 */
export default async function getConnectedPublicAddress() {
  const { ethereum } = window;
  return await ethereum.request({ method: "eth_accounts" });
}
