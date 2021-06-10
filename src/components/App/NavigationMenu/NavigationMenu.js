import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Campaign from '../../Campaign/Campaign';
import OnboardingButton from './OnboardingButton/OnboardingButton';
import TabPanel from './TabPanel/TabPanel';
const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.post["Content-Type"] = "application/json";

class NavigationMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      campaigns: []
    };
  }
  componentDidMount() {
    axios
      .get("/api/campaigns")
      .then((res) => {
        const campaignData = res.data;
        const userEnrolledCampaigns = ["1"];
        if (userEnrolledCampaigns.length > 0) {
          // merge each campaign with whether the user has already enrolled in that campaign
          for (let i = 0; i < userEnrolledCampaigns.length; i++) {
            const userCampaignId = userEnrolledCampaigns[i];
            for (let j = 0; j < campaignData.length; j++) {
              const campaignId = campaignData[j]._id;
              if (userCampaignId === campaignId) {
                campaignData[j].userEnrolled = true;
              }
            }
          }
        }
        this.setState({ campaigns: campaignData });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useStyles() {
    return makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        marginLeft: theme.spacing(1),
      },
    }));
  }
  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    const classes = this.useStyles();
    const campaigns = this.state.campaigns.map((campaign) => {
      return <Campaign key={campaign._id} campaign={campaign}></Campaign>;
    });

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Crypo Rewards
            </Typography>
            <OnboardingButton color="inherit">Connect Wallet</OnboardingButton>
          </Toolbar>
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Campaigns" {...this.a11yProps(0)} />
            <Tab label="Resume" {...this.a11yProps(1)} />
            <Tab label="Create Campaign" {...this.a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={this.state.value} index={0}>
          <div className="body">{campaigns}</div>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Resume Page
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          Create Campaign Page
        </TabPanel>
      </>
    );
  }
}

export default NavigationMenu;