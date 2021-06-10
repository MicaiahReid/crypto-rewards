import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Protocol from "../../Challenges";
import Achievements from "../../Rewards";
import OnboardingButton from "./OnboardingButton/OnboardingButton";
import CustomTabs from "../../components/tabs";
import Header from "../../components/header";
import Landing from "../../Landing";
import CampaignModalDetail from "../../CampaignModalDetail";
const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.post["Content-Type"] = "application/json";

class NavigationMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      campaigns: [],
      selectedTabIndex: 0,
      showHome: true,
      selectedCampaign: undefined,
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

  onSelectCampaign = (campaign) => {
    console.log(campaign);
    this.setState({ selectedCampaign: campaign });
  };

  triggerDismissCampaignModal = () =>
    this.setState({ selectedCampaign: undefined });

  renderPage = () => {
    switch (this.state.selectedTabIndex) {
      case 0:
        return (
          <Protocol
            onSelectCampaign={this.onSelectCampaign}
            campaigns={this.state.campaigns}
          ></Protocol>
        );
      case 1:
        return <Achievements campaigns={this.state.campaigns}></Achievements>;
      default:
        return <div>{`Page doesn't exist`}</div>;
    }
  };

  render() {
    return (
      <div
        style={{
          padding: "0px 32px",
        }}
      >
        <Header rightComponent={<OnboardingButton />} />
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
        {this.state.showHome ? (
          <Landing onDismiss={() => this.setState({ showHome: false })} />
        ) : null}
        <CampaignModalDetail
          open={!!this.state.selectedCampaign}
          onClose={this.triggerDismissCampaignModal}
          campaign={this.state.selectedCampaign}
        ></CampaignModalDetail>
      </div>
    );
  }
}

export default NavigationMenu;
