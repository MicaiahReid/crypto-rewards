import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import ReactMarkdown from "react-markdown";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Link from "@material-ui/core/Link";
import RoundButton from "../components/round-button";

class CampaignModalDetail extends React.Component {
  useStyles() {
    return makeStyles((theme) => ({
      root: {
        margin: 0,
        padding: theme.spacing(2),
      },
      closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
    }));
  }

  render() {
    const classes = this.useStyles();
    const campaign = this.props.campaign;
    if (!campaign) {
      return null;
    }

    const campaignTitle = campaign.title || "";
    const description = campaign.longDescription || "";
    const reward = campaign.reward || "";
    return (
      <Dialog
        onClose={this.props.onClose}
        aria-labelledby="challenge-dialog-title"
        open={this.props.open}
      >
        <MuiDialogTitle
          disableTypography
          dividers
          className={classes.root}
          id="customized-dialog-title"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              flex: 1,
              color: "black",
              fontSize: 25,
              fontWeight: "700",
              marginTop: 8,
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
        
        <div
            style={{
              backgroundColor:'grey',
              height: 2
            }}
        />

        <DialogContent style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 24,
            marginRight: 8
          }}
        >
          <div
            style={{
              flex: 1,
              color: "black",
              fontSize: 15,
              fontWeight: "700",
              marginTop: 8,
            }}
          >
            About
          </div>

          <div
            style={{
              flex: 1,
              color: "black",
              fontSize: 13,
              fontWeight: "400",
              marginTop: 8,
            }}
          >
            To learn more about this protocol, visit:{" "}
            <Link href="https://uniswap.org/about/">About Uniswap</Link>
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

          <ReactMarkdown
            style={{
              flex: 1,
              color: "white",
              fontSize: 15,
              fontWeight: "700",
              marginTop: 8,
            }}
          >
            {description}
          </ReactMarkdown>

          <div style={{ display: "flex" }}>
            <div style={{ color: "black", fontSize: 13, marginRight: 4 }}>
              {"Rewards:"}
            </div>
            <div style={{ color: "black", fontSize: 13, fontWeight: "800" }}>
              {reward}
            </div>
          </div>
        </DialogContent>
        <DialogContent>
          {/* <RoundButton
            onClick={(e) => this.props.callToAction}
            label={this.props.callToActionState}
          /> */}
        </DialogContent>
      </Dialog>
    );
  }
}

export default CampaignModalDetail;
