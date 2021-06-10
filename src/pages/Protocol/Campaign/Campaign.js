import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from "@material-ui/core/CardActions";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
    console.log(id);
  }

  handleClick = (event) => {
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
          <ButtonBase onClick={event => {this.handleClick()}}>
            <Grid container spacing={24} align="left" direction="column">
              <Grid item sx={3}>
                <Typography variant="h" component="h2">
                  {campaign.title}
                </Typography>
              </Grid>
              <Grid item sx={3}>
                <Typography variant="body" component="p">
                  {campaign.shortDescription}
                </Typography>
              </Grid>
              <Grid item sx={3}>
                <Typography variant="body">
                  Reward: <b>{campaign.reward}</b>
                </Typography>
              </Grid>
            </Grid>
          </ButtonBase>
          <CardActions>
            <Button
              onClick={(e) => this.enroll(campaign.id)}
              colot="primary"
              variant="contained"
            >
              {this.state.enrolled ? "Verify" : "Enroll"}
            </Button>
          </CardActions>
        </Card>
        <CampaignModalDetail 
          open={open} 
          onClose={this.handleClose} 
          modalTitle={campaign.title}
          modalDetails={campaign.longDescription}
        >
        </CampaignModalDetail>
      </Box>
    );
  }
}
export default Campaign;