import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import ReactMarkdown from "react-markdown";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import RoundButton from "../components/round-button";

class CampaignModalDetail extends React.Component {
  render() {
    const campaign = this.props.campaign;
    if (!campaign) {
      return null;
    }

    const campaignTitle = campaign.title || "";
    const description = campaign.longDescription || "";
    const reward = campaign.reward || "";
    return (
      <Box borderRadius={32}>
        <Dialog
          onClose={this.props.onClose}
          aria-labelledby="challenge-dialog-title"
          open={this.props.open}
        >
          <MuiDialogTitle
            disableTypography
            dividers
            id="customized-dialog-title"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                color: "black",
                fontSize: 25,
                fontWeight: "700",
              }}
            >
              {campaignTitle}
            </div>

            <div onClick={this.props.onClose}>
              <img
                style={{ flex: 1, height: 32, width: 32 }}
                src={"dismiss-button.png"}
                alt={"campaign-card"}
              ></img>
            </div>
          </MuiDialogTitle>

          <Divider variant="middle" />

          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 8,
              marginBottom: 16
            }}
          >
            <div
              style={{
                flex: 1,
                color: "black",
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              About
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 8,
              }}
            >
              <div style={{ color: `${`rgba(95, 107, 124, 1)`}`, fontSize: 13, marginRight: 4 }}>
                To learn more about this protocol, visit:{" "}
              </div>

              <u><Link
                style={{color: `${`rgba(95, 107, 124, 1)`}`, fontSize: 13, fontWeight: "800", underline: true }}
                href="https://uniswap.org/about/"
              >
                About Uniswap
              </Link></u>
            </div>
            
            <div
              style={{
                flex: 1,
                color: "black",
                fontSize: 15,
                fontWeight: "700",
                marginTop: 24,
              }}
            >
              Challenge
            </div>

            <div style={{ color: `${`rgba(95, 107, 124, 1)`}`, fontSize: 13, marginTop: 8 }}>
                {campaignTitle}
            </div>

            <ReactMarkdown
              style={{
                flex: 1,
                color: `${`rgba(95, 107, 124, 1)`}`
              }}
            >
              {description}
            </ReactMarkdown>

            <div style={{ display: "flex", alignItems: "center"}}>

              <div style={{ display: "flex" }}>
                <div style={{ color: `${`rgba(95, 107, 124, 1)`}`, fontSize: 13, marginRight: 4 }}>
                  {"Rewards:"}
                </div>
                <div
                  style={{ color: `${`rgba(95, 107, 124, 1)`}`, fontSize: 13, fontWeight: "800" }}
                >
                  {reward}
                </div>
              </div>

              <RoundButton
              onClick={(e) => this.props.callToAction}
              label={this.props.callToActionState}
              style={{flex:1}}
              />

            </div>
          </DialogContent>
        </Dialog>
      </Box>
    );
  }
}

export default CampaignModalDetail;
