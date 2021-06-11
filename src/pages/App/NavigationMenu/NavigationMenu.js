import React, { useCallback, useEffect, useState } from "react";
import Protocol from "../../Challenges";
import Achievements from "../../Rewards";
import OnboardingButton from "./OnboardingButton/OnboardingButton";
import CustomTabs from "../../components/tabs";
import Header from "../../components/header";
import Landing from "../../Landing";
import CampaignModalDetail from "../../CampaignModalDetail";
import { animated, useSpring } from "@react-spring/web";
import axios from "../../../utils/API";
import getConnectedPublicAddress from "../../../utils/MetaMaskUtils";

const NavigationMenu = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [showHome, setShowHome] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(undefined);
  const [fadeStyle, fadeApi] = useSpring(() => ({
    opacity: 1,
    onRest: () => setShowHome(false),
  }));

  useEffect( () => {
    getConnectedPublicAddress()
      .then((accounts) => {
        let getPath = "/api/campaigns";
        if (accounts.length > 0) {
          getPath += "/" + accounts[0];
        }
        axios
          .get(getPath)
          .then((res) => {
            setCampaigns(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  })

  // useEffect(() => {
  //   axios
  //     .get("/api/campaigns")
  //     .then((res) => {
  //       const campaignData = res.data;
  //       const userEnrolledCampaigns = ["1"];
  //       if (userEnrolledCampaigns.length > 0) {
  //         // merge each campaign with whether the user has already enrolled in that campaign
  //         for (let i = 0; i < userEnrolledCampaigns.length; i++) {
  //           const userCampaignId = userEnrolledCampaigns[i];
  //           for (let j = 0; j < campaignData.length; j++) {
  //             const campaignId = campaignData[j]._id;
  //             if (userCampaignId === campaignId) {
  //               campaignData[j].userEnrolled = true;
  //             }
  //           }
  //         }
  //       }
  //       setCampaigns(campaignData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [setCampaigns]);

  const triggerDismissCampaignModal = useCallback(
    () => setSelectedCampaign(undefined),
    [setSelectedCampaign]
  );

  const renderPages = useCallback(() => {
    switch (selectedTabIndex) {
      case 0:
        return (
          <Protocol
            onSelectCampaign={setSelectedCampaign}
            campaigns={campaigns}
          ></Protocol>
        );
      case 1:
        return <Achievements campaigns={campaigns}></Achievements>;
      default:
        return <div>{`Page doesn't exist`}</div>;
    }
  }, [selectedTabIndex, campaigns]);

  const renderLanding = useCallback(() => {
    return showHome ? (
      <animated.div style={fadeStyle}>
        <Landing onDismiss={() => fadeApi.start({ opacity: 0 })} />
      </animated.div>
    ) : null;
  }, [showHome, fadeApi, fadeStyle]);

  const renderCampaignModal = useCallback(() => {
    return (
      <CampaignModalDetail
        open={!!selectedCampaign}
        onClose={triggerDismissCampaignModal}
        campaign={selectedCampaign}
      ></CampaignModalDetail>
    );
  }, [selectedCampaign, triggerDismissCampaignModal]);

  return (
    <div
      style={{
        padding: "0px 5%",
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
          selectedIndex={selectedTabIndex}
          onSelectIndex={setSelectedTabIndex}
          tabs={["Challenges", "Rewards"]}
        />
      </div>
      {renderPages()}
      {renderLanding()}
      {renderCampaignModal()}
    </div>
  );
};

export default NavigationMenu;
