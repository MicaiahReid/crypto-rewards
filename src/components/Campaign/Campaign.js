import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactMarkdown from "react-markdown";
import axios from "../../utils/API";
import getConnectedPublicAddress from "../../utils/MetaMaskUtils";

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      campaignStatus: props.campaign.status,
    };
  }
  useStyles() {
    return makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      card: {
        padding: theme.spacing(2),
        margin: "100px",
        maxWidth: "60%",
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

  enrollOrVerify(campaignId) {
    if (!this.state.campaignStatus) {
      getConnectedPublicAddress()
        .then((accounts) => {
          if (accounts.length > 0) {
            axios
              .post("/api/enroll", {
                campaignId: campaignId,
                address: accounts[0],
              })
              .then(({ data }) => {
                if (data.success) {
                  this.setState({ campaignStatus: "enrolled" });
                } else {
                  console.log("error enrolling user");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("user must link wallet"); // TODO prompt to make wallet
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.state.campaignStatus === "enrolled") {
      console.log("verify");
    }
  }
  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  render() {
    const campaign = this.props.campaign;
    const classes = this.useStyles();
    const avatar = campaign.icon ? (
      <Avatar className={classes.avatar} src={campaign.icon} />
    ) : (
      <Avatar className={classes.avatar}>
        {campaign.title.substring(0, 1)}
      </Avatar>
    );
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={2}>
                <Typography component="div">{avatar}</Typography>
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
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                <ReactMarkdown
                  children={campaign.longDescription}
                ></ReactMarkdown>
              </Typography>
            </CardContent>
          </Collapse>
          <CardActions>
            <Button
              onClick={(e) => this.enrollOrVerify(campaign._id)}
              color="primary"
              variant="contained"
            >
              {this.state.campaignStatus === "claimed"
                ? "Claimed"
                : this.state.campaignStatus === "enrolled"
                ? "Claim"
                : "Enroll"}
            </Button>
            <IconButton
              className={
                classes.expand + classes.expandOpen
                  ? +" " + this.state.expanded
                  : ""
              }
              onClick={(e) => this.handleExpandClick()}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default Campaign;
