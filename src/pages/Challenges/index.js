import React from "react";
import Campaign from "./components/campaign";

class Protocol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: props.campaigns,
    };
  }

  render() {
    const campaigns = this.props.campaigns;
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {campaigns.map((campaign) => (
          <Campaign
            onSelect={this.props.onSelectCampaign}
            key={campaign.id}
            campaign={campaign}
          ></Campaign>
        ))}
      </div>
    );
  }
}

export default Protocol;
