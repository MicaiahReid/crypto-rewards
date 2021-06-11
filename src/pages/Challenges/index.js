import React from "react";
import Campaign from "./components/campaign";

class Protocol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: props.campaigns,
      enrollOrVerify: props.enrollOrVerify,
      campaignStatus: props.campaignStatus,
    };
  }

  render() {
    const campaigns = this.props.campaigns;
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {campaigns.map((campaign) => (
          <Campaign
            onSelect={this.props.onSelectCampaign}
            key={campaign._id}
            campaign={campaign}
            campaignStatus={this.props.campaignStatus}
            enrollOrVerify={this.props.enrollOrVerify}
          ></Campaign>
        ))}
      </div>
    );
  }
}

export default Protocol;
