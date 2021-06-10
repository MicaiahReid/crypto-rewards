import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from "@material-ui/core/CardActions";
import Typography from '@material-ui/core/Typography';
import RoundButton from "../../components/round-button";
import Box from '@material-ui/core/Box';
import CampaignModalDetail from './CampaignModalDetail/CampaignModalDetail';
import ButtonBase from  '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: props.campaign.userEnrolled,
      displayModal: null
    }
  }

  useStyles() {
    return makeStyles((theme) => ({
      root: {
        flexWrap: "wrap",
        flexGrow: 1
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
      displayModal: true
    })
  };

  handleClose = () => {
    this.setState({
      displayModal: null
    })  
  };

  render() {
    const open = Boolean(this.state.displayModal);
    const campaign = this.props.campaign;
    const classes = this.useStyles();
    return (
      <Box className={classes.root}>
        <Card className={classes.card}>
          <ButtonBase id="card_button" onClick={(e) => {this.handleClick(e)}}>
            <Grid container spacing={8} align='left' justify='flex-end' direction='column' alignItems="stretch">
              <Grid item sx={2}>
                <Typography variant="h4" component="h2">
                  {campaign.title}
                </Typography>
              </Grid>
              <Grid item sx={2}>
                <Typography variant="body1" component="p">
                  {campaign.shortDescription}
                </Typography>
              </Grid>
              <Grid item sx={2}>
                <Typography variant="body1">
                  Reward: <b>{campaign.reward}</b>
                </Typography>
              </Grid>
          </Grid>
          </ButtonBase>
          <CardActions>
                <RoundButton
                  onClick={(e) => this.enroll(campaign.id)}
                  label={this.state.enrolled ? "Claim" : "Enroll"}
                  id="enroll_button"
                />
              </CardActions>
        </Card>
        <CampaignModalDetail 
          open={open} 
          onClose={this.handleClose} 
          modalTitle={campaign.title}
          modalDetails={campaign.longDescription}
          callToAction={this.enroll(campaign.id)}
          callToActionState={this.state.enrolled ? "Claim" : "Enroll"}
        >
        </CampaignModalDetail>
      </Box>
    );
  }
}
export default Campaign;