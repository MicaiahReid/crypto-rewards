import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import RoundButton from "../../components/round-button";
import Box from "@material-ui/core/Box";
// import CampaignModalDetail from './CampaignModalDetail';
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: props.campaign.userEnrolled,
    };
  }

  useStyles() {
    return makeStyles((theme) => ({
      root: {
        flexWrap: "wrap",
        flexGrow: 1,
      },
      card: {
        padding: theme.spacing(2),
        margin: "100px",
        width: "60%",
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
      },
    }));
  }

  enroll(id) {
    // console.log(id);
  }

  handleClick = (item) => {
    this.setState({
      displayModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      displayModal: null,
    });
  };

  selectCampaign = () => {
    this.props.onSelect(this.props.campaign);
  };

  render() {
    const campaign = this.props.campaign
    return (
      // <Box className={classes.root}>
      //   <Card className={classes.card}>
      //     <ButtonBase
      //       id="card_button"
      //       onClick={(e) => {
      //         this.handleClick(e);
      //       }}
      //     >
      //       <Grid
      //         container
      //         spacing={8}
      //         align="left"
      //         justify="flex-end"
      //         direction="column"
      //         alignItems="stretch"
      //       >
      //         <Grid item sx={2}>
      //           <Typography variant="h4" component="h2">
      //             {campaign.title}
      //           </Typography>
      //         </Grid>
      //         <Grid item sx={2}>
      //           <Typography variant="body1" component="p">
      //             {campaign.shortDescription}
      //           </Typography>
      //         </Grid>
      //         <Grid item sx={2}>
      //           <Typography variant="body1">
      //             Reward: <b>{campaign.reward}</b>
      //           </Typography>
      //         </Grid>
      //       </Grid>
      //     </ButtonBase>
      //     <CardActions>
      //       <RoundButton
      //         onClick={(e) => this.enroll(campaign.id)}
      //         label={this.state.enrolled ? "Claim" : "Enroll"}
      //         id="enroll_button"
      //       />
      //     </CardActions>
      //   </Card>
      //   {/* <CampaignModalDetail
      //     open={open}
      //     onClose={this.handleClose}
      //     modalTitle={campaign.title}
      //     modalDetails={campaign.longDescription}
      //     callToAction={this.enroll(campaign.id)}
      //     callToActionState={this.state.enrolled ? "Claim" : "Enroll"}
      //   >
      //   </CampaignModalDetail> */}
      // </Box>
      <div
        style={{
          display: "flex",
          height: 268,
          width: 205,
          padding: 8,
          border: "2px solid rgba(89, 93, 149, 0.15)",
          borderRadius: 10,
          cursor: "pointer",
          position: "relative",
          marginRight: 24,
          marginBottom: 16,
        }}
        onClick={this.selectCampaign}
      >
        {/** Card background */}
        <img
          style={{ flex: 1 }}
          src={"campaign-card.png"}
          alt={"campaign-card"}
        ></img>
        {/** Card content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            padding: 24,
          }}
        >
          <div style={{ color: "white", fontSize: 20, fontWeight: "800" }}>
            {campaign.title}
          </div>
          <div style={{ color: "white", fontSize: 13 }}>
            {campaign.shortDescription}
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ color: "white", fontSize: 13, marginRight: 4 }}>
              {"Rewards:"}
            </div>
            <div style={{ color: "white", fontSize: 13, fontWeight: "800" }}>
              {campaign.reward}
            </div>
          </div>
          <RoundButton style={{ marginTop: 8 }} label={"Enroll"} />
        </div>
      </div>
    );
  }
}
export default Campaign;
