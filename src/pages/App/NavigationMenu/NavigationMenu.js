import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Protocol from "../../Challenges";
import Achievements from "../../Rewards";
import OnboardingButton from "./OnboardingButton/OnboardingButton";
import CustomTabs from "../../components/tabs";
import Header from "../../components/header";
import Landing from "../../Landing";
import CampaignModalDetail from "../../CampaignModalDetail";
import { animated, useSpring } from "@react-spring/web";

const NavigationMenu = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [showHome, setShowHome] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(undefined);
  const [fadeStyle, fadeApi] = useSpring(() => ({
    opacity: 1,
    onRest: () => setShowHome(false),
  }));

  useEffect(() => {
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
        id: "3",
        title: "Compound Investments",
        shortDescription:
          "Put 50 COMP in a compound liquidity pool for 3 months and earn COMP rewards!",
        subtitle: "",
        reward: "50 COMP",
        longDescription: `### Perform these steps to earn your reward!  \n1. Click the Enroll button below.  \n2. Navigate to [Compound's trading site.](https://app.compound.finance/)  \n3. Do some other stuff.  \n4. Come back here and click Verify.  \n5. You should recieve your reward in 3 months!`,
      },
      {
        id: "4",
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
    setCampaigns(campaignData);
  }, [setCampaigns]);

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
