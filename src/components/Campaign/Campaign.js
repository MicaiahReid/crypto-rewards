import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import ButtonBase from '@material-ui/core/ButtonBase';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    margin: "100px",
    maxWidth: "60%"
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
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function Compaign({campaign}) {
  console.log(campaign);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container>
            <Grid item xs={2}>
              <Typography>
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <ReactMarkdown
                children={campaign.longDescription}
              ></ReactMarkdown>
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions>
          Enroll
          <IconButton
            className={
              classes.expand + classes.expandOpen ? +" " + expanded : ""
            }
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}