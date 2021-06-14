import React, { useCallback } from "react";
import Campaign from "./components/campaign";
import Link from "@material-ui/core/Link";
import { useSelector } from "react-redux";
import {
  getCampaigns,
  getAccountAddress,
} from "../../services/redux/selectors";
import NoWalletPlaceholder from "../components/no-wallet-placeholder";

const Challenges = () => {
  const accountAddress = useSelector(getAccountAddress);
  const campaigns = useSelector(getCampaigns);
  const hasCampaigns = campaigns && campaigns.length > 0;

  const renderPlaceholder = useCallback(() => {
    if (hasCampaigns) {
      return null;
    }

    return (
      <NoWalletPlaceholder
        placeholder={"There aren't any challenges yet."}
        accountAddress={accountAddress}
      />
    );
  }, [accountAddress, hasCampaigns]);

  const renderCampaigns = useCallback(() => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {campaigns.map((campaign) => (
          <Campaign key={campaign._id} campaign={campaign}></Campaign>
        ))}
      </div>
    );
  }, [campaigns]);

  const renderSuggestionLink = useCallback(() => {
    if (!hasCampaigns) {
      return null;
    }

    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
          flexDirection: "column",
          paddingBottom: 64,
        }}
      >
        <div
          style={{
            fontSize: 13,
            marginRight: 4,
            color: `${`rgba(95, 107, 124, 1)`}`,
          }}
        >
          {"Have a suggestion for another challenge?"}
          <u>
            <Link
              style={{
                color: `${`rgba(95, 107, 124, 1)`}`,
                fontSize: 13,
                fontWeight: "800",
                underline: true,
                marginLeft: 4,
              }}
              href="https://github.com/"
            >
              {"Submit one here."}
            </Link>
          </u>
        </div>
      </div>
    );
  }, [hasCampaigns]);

  return (
    <div>
      {renderCampaigns()}
      {renderPlaceholder()}
      {renderSuggestionLink()}
    </div>
  );
};

export default Challenges;
