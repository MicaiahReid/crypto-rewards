import React from "react";
import Campaign from "./components/campaign";
import Link from "@material-ui/core/Link";

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
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {campaigns.map((campaign) => (
            <Campaign key={campaign._id} campaign={campaign}></Campaign>
          ))}
        </div>
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
            }}
          >
            Have a suggestion for another challenge?{" "}
            <u>
              <Link
                style={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "800",
                  underline: true,
                }}
                href="https://github.com/"
              >
                Submit one here.
              </Link>
            </u>
          </div>
        </div>
      </div>
    );
  }
}

export default Protocol;
