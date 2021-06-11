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

    const campaignProtocol = campaign.protocol || "";
    const campaignTitle = campaign.shortDescription || "";
    const description = campaign.longDescription || "";
    const reward = campaign.reward || "";
    return (
      <Dialog
        onClose={this.props.onClose}
        aria-labelledby="challenge-dialog-title"
        open={this.props.open}
      >
        <div style={{ padding: "0px 8px", minWidth: 450 }}>
          <MuiDialogTitle
            disableTypography
            dividers
            id="customized-dialog-title"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                flex: 1,
                fontSize: 25,
                fontWeight: "700",
                marginTop: 24,
              }}
            >
              {campaignProtocol}
            </div>

            <div onClick={this.props.onClose}>
              <img
                style={{ flex: 1, height: 32, width: 32, marginTop: 8 }}
                src={"dismiss-button.png"}
                alt={"campaign-card"}
              ></img>
            </div>
          </MuiDialogTitle>

          <Divider style={{ marginBottom: 16 }} variant="middle" />

          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Challenge
                </div>

                <div
                  style={{
                    color: `${`rgba(95, 107, 124, 1)`}`,
                    fontSize: 13,
                    marginTop: 8,
                  }}
                >
                  {campaignTitle}
                </div>

                <div
                  style={{
                    display: "flex",
                    marginTop: 6,
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        color: `${`rgba(95, 107, 124, 1)`}`,
                        fontSize: 13,
                        marginRight: 4,
                      }}
                    >
                      {"Rewards:"}
                    </div>
                    <div
                      style={{
                        color: `${`rgba(95, 107, 124, 1)`}`,
                        fontSize: 13,
                        fontWeight: "800",
                      }}
                    >
                      {reward}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <RoundButton
                  // onClick={}
                  label={"Test"}
                />
              </div>
            </div>
            <div style={{marginTop: 24}}>
            <div
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Instructions
                </div>
            <ReactMarkdown>{description}</ReactMarkdown>
            </div>
            <div
              style={{
                flex: 1,
                marginTop: 24,
              }}
            >
              <div
                style={{
                  flex: 1,
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
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: `${`rgba(95, 107, 124, 1)`}`,
                    fontSize: 13,
                    marginRight: 4,
                  }}
                >
                  To learn more about this protocol:{" "}
                </div>

                <u>
                  <Link
                    style={{
                      color: `${`rgba(95, 107, 124, 1)`}`,
                      fontSize: 13,
                      fontWeight: "800",
                      underline: true,
                    }}
                    href="https://uniswap.org/about/"
                  >
                    Visit Website
                  </Link>
                </u>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

export default CampaignModalDetail;
