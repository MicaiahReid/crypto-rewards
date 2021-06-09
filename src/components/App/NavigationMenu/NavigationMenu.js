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

class NavigationMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      campaigns: []
    };
  }
  componentDidMount() { // will use for initial fetching of data
    let campaignData = [
      {
        id: "1",
        title: "Uniswap Trade",
        shortDescription:
          "Trade 10 Uniswap tokens for the first time to earn UNI rewards!",
        subtitle: "",
        reward: "5 UNI",
        longDescription: `### Perform these steps to earn your reward!  \n1. Click the Enroll button below.  \n2. Navigate to [Uniswap's trading site.](https://app.uniswap.org/#/swap)  \n3. Trade 10 Uniswap  \n4. Come back here and click Verify.  \n5. You should see your reward in minutes!`,
      },

      {
        id: "2",
        title: "Compound Investments",
        shortDescription:
          "Put 50 COMP in a compound liquidity pool for 3 months and earn COMP rewards!",
        subtitle: "",
        reward: "50 COMP",
        longDescription: `### Perform these steps to earn your reward!  \n1. Click the Enroll button below.  \n2. Navigate to [Compound's trading site.](https://app.compound.finance/)  \n3. Do some other stuff.  \n4. Come back here and click Verify.  \n5. You should recieve your reward in 3 months!`,
      },
    ];
    const userEnrolledCampaigns = ["1"];
    if(userEnrolledCampaigns.length > 0) { // merge each campaign with whether the user has already enrolled in that campaign
      for(let i = 0; i < userEnrolledCampaigns.length; i++) {
        const userCampaignId = userEnrolledCampaigns[i];
        for(let j = 0; j < campaignData.length; j++) {
          const campaignId = campaignData[j].id
          if(userCampaignId === campaignId) {
            campaignData[j].userEnrolled = true;
          }
        }
      }
    }
    this.setState({ campaigns: campaignData });
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
      return <Campaign key={campaign.id} campaign={campaign}></Campaign>;
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