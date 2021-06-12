import React, { useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ReactMarkdown from "react-markdown";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Link from "@material-ui/core/Link";
import RoundButton from "../components/round-button";
import { useDispatch } from "react-redux";
import { enrollToChallenge, verifyRewards } from "../../services/redux/actions";

const CampaignModalDetail = ({ campaign, onClose, open }) => {
  const dispatch = useDispatch();

  const renderButton = useCallback(() => {
    if (campaign.status === "claimed")
      return (
        <RoundButton
          style={{
            backgroundColor: "black",
            borderColor: "black",
          }}
          label="Claimed"
          leftIcon={
            <img
              style={{ height: 16, width: 16, marginRight: 8 }}
              src={"green-check.png"}
              alt={"green-check"}
            ></img>
          }
        />
      );
    else if (campaign.status === "enrolled")
      return (
        <RoundButton
          onPress={() => dispatch(verifyRewards(campaign._id))}
          style={{
            marginTop: 8,
            backgroundColor: `${`rgba(55, 215, 100, 1)`}`,
            borderColor: `${`rgba(55, 215, 100, 1)`}`,
          }}
          label={"Claim"}
        />
      );
    else
      return (
        <RoundButton
          onPress={() => dispatch(enrollToChallenge(campaign._id))}
          style={{ marginTop: 8 }}
          label={"Enroll"}
        />
      );
  }, [campaign, dispatch]);

  if (campaign)
    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="challenge-dialog-title"
        open={open}
      >
        <div style={{ padding: "0px px", minWidth: 450 }}>
          <MuiDialogTitle
            disableTypography
            dividers="true"
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
                fontWeight: "800",
                marginTop: 16,
              }}
            >
              {campaign.protocol}
            </div>

            <div onClick={onClose}>
              <img
                style={{ flex: 1, height: 32, width: 32, marginTop: 8 }}
                src={"dismiss-button.png"}
                alt={"campaign-card"}
              ></img>
            </div>
          </MuiDialogTitle>

          <div
            style={{
              height: 1,
              backgroundColor: "#E6E7ED",
              margin: "0px 20px",
            }}
          ></div>

          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 12,
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
                    fontWeight: "800",
                  }}
                >
                  Challenge
                </div>

                <div
                  style={{
                    color: `${`rgba(95, 107, 124, 1)`}`,
                    fontSize: 13,
                    marginTop: 4,
                  }}
                >
                  {campaign.title}
                </div>

                <div
                  style={{
                    display: "flex",
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
                      {campaign.reward}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                {renderButton()}
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <div
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: "800",
                }}
              >
                Instructions
              </div>
              <ReactMarkdown skipHtml={true} style={{ color: "red" }}>
                {campaign.longDescription}
              </ReactMarkdown>
            </div>
            <div
              style={{
                flex: 1,
                marginTop: 16,
              }}
            >
              <div
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: "800",
                }}
              >
                About
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: 4,
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
                    href={campaign.about}
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
  else return null;
};

export default CampaignModalDetail;
