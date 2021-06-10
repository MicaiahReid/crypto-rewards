import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Campaign from "../../Campaign/Campaign";
import OnboardingButton from "./OnboardingButton/OnboardingButton";
import TabPanel from "./TabPanel/TabPanel";
import axios from "../../../utils/API";
import getConnectedPublicAddress from "../../../utils/MetaMaskUtils";

class NavigationMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      campaigns: [],
    };
  }
  componentDidMount() {
    getConnectedPublicAddress()
      .then((accounts) => {
        let getPath = "/api/campaigns";
        if (accounts.length > 0) {
          getPath += "/" + accounts[0];
        }
        axios
          .get(getPath)
          .then((res) => {
            this.setState({ campaigns: res.data });
          })
          .catch((error) => {
            console.log(error);
          });
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
