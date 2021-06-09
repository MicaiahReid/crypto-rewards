import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactMarkdown from 'react-markdown';
import Box from '@material-ui/core/Box';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      enrolled: props.campaign.userEnrolled
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
  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded
    })
  }
  render() {
    const campaign = this.props.campaign;
    const classes = this.useStyles();
    return (
      <Box className={classes.root}>
        <Card className={classes.card}>
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
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                <ReactMarkdown children={campaign.longDescription}></ReactMarkdown>
              </Typography>
            </CardContent>
          </Collapse>
          <CardActions>
            <Button
              onClick={(e) => this.enroll(campaign.id)}
              colot="primary"
              variant="contained"
            >
              {this.state.enrolled ? "Verify" : "Enroll"}
            </Button>
            <IconButton
              className={classes.expand + classes.expandOpen ? +" " + this.state.expanded : ""}
              onClick={(e) => this.handleExpandClick()}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    );
  }
}
export default Campaign;