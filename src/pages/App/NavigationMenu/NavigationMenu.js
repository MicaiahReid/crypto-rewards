import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Protocol from "../../Protocol/Protocol";
import OnboardingButton from "./OnboardingButton/OnboardingButton";
import TabPanel from "./TabPanel/TabPanel";
import CustomTabs from "../../components/tabs";
import Header from "../../components/header";
import RoundButton from "../../components/round-button";
import Landing from "../../Landing";

class NavigationMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      campaigns: [],
      selectedTabIndex: 0,
      isHome: true,
    };
  }
  componentDidMount() {
    // will use for initial fetching of data
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
    if (userEnrolledCampaigns.length > 0) {
      // merge each campaign with whether the user has already enrolled in that campaign
      for (let i = 0; i < userEnrolledCampaigns.length; i++) {
        const userCampaignId = userEnrolledCampaigns[i];
        for (let j = 0; j < campaignData.length; j++) {
          const campaignId = campaignData[j].id;
          if (userCampaignId === campaignId) {
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
        flexGrow: 2,
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

  renderPage = () => {
    switch (this.state.selectedTabIndex) {
      case 0:
        return <Protocol campaigns={this.state.campaigns}></Protocol>;
      case 1:
        return <div>{"Add Material UI Table"}</div>;
      default:
        return <div>{`Page doesn't exist`}</div>;
    }
  };

  render() {
    const classes = this.useStyles();

    return (
      <div
        style={{
          padding: "0px 32px",
        }}
      >
        <Header
          rightComponent={
            <RoundButton label={"Connect Wallet"} onPress={() => {}} />
          }
        />
        <div
          style={{
            position: "static",
            display: "flex",
            padding: "12px 0px",
          }}
        >
          <CustomTabs
            selectedIndex={this.state.selectedTabIndex}
            onSelectIndex={(index) =>
              this.setState({ selectedTabIndex: index })
            }
            tabs={["Challenges", "Rewards"]}
          />
        </div>
        {this.renderPage()}
        {/* <Landing /> */}
        {/* <AppBar position="static">
          <Toolbar>
            <Grid justify="space-between" container spacing={24}>
              <Grid item>
                <Typography variant="h6" className={classes.title}>
                  ConsenSys Rewards
                </Typography>
              </Grid>

              <Grid item>
                <OnboardingButton color="inherit">
                  Connect Wallet
                </OnboardingButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar> */}

        {/* <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label="Challenges" {...this.a11yProps(0)} />
          <Tab label="Achivements" {...this.a11yProps(1)} />
        </Tabs>

        <TabPanel value={this.state.value} index={0}>
          <Protocol campaigns={this.state.campaigns}></Protocol>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Add Material UI Table
        </TabPanel> */}
      </div>
    );
  }
}

export default NavigationMenu;
