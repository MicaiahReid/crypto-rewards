import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CampaignModalDetail from './CampaignModalDetail/CampaignModalDetail';
import ButtonBase from  '@material-ui/core/ButtonBase';

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
      avatar: {
        backgroundColor: "#ff84f6",
      },
      expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: "rotate(180deg)",
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
          <ButtonBase
            onClick={event => {this.handleClick()}}
          >
          <CardContent>
            <Grid container>
              <Grid item xs={2}>
                <Typography component="div">
                  {
                    <Avatar className={classes.avatar}>
                      {campaign.title.substring(0, 1)}
                    </Avatar>
                  }
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h4" component="h2">
                  {campaign.title}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" component="h2">
                  {campaign.reward}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" colot="textSecondary" component="p">
              {campaign.shortDescription}
            </Typography>
          </CardContent>
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