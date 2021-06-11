import React, { useCallback, useState } from "react";
import Protocol from "../../Challenges";
import Achievements from "../../Rewards";
import OnboardingButton from "./OnboardingButton/OnboardingButton";
import CustomTabs from "../../components/tabs";
import Header from "../../components/header";
import Landing from "../../Landing";
import CampaignModalDetail from "../../CampaignModalDetail";
import { animated, useSpring } from "@react-spring/web";
import { useSelector } from "react-redux";
import { getCampaigns } from "../../../services/redux/selectors";

const NavigationMenu = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [showHome, setShowHome] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(undefined);
  const [fadeStyle, fadeApi] = useSpring(() => ({
    opacity: 1,
    onRest: () => setShowHome(false),
  }));
  
  const campaigns = useSelector(getCampaigns);

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

  // const enrollOrVerify = useCallback(() => {
  //   if (!campaignStatus) {
  //     getConnectedPublicAddress()
  //       .then((accounts) => {
  //         if (accounts.length > 0) {
  //           axios
  //             .post("/api/enroll", {
  //               campaignId: selectedCampaign._id,
  //               address: accounts[0],
  //             })
  //             .then(({ data }) => {
  //               if (data.success) {
  //                 setCampaignStatus("enrolled");
  //               } else {
  //                 console.log("error enrolling user");
  //               }
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });
  //         } else {
  //           console.log("user must link wallet"); // TODO prompt to make wallet
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else if (campaignStatus === "enrolled") {
  //     console.log("verify");
  //   }
  // }, [campaignStatus, selectedCampaign]);

  const renderCampaignModal = useCallback(() => {
    return (
      <CampaignModalDetail
        open={!!selectedCampaign}
        onClose={triggerDismissCampaignModal}
        campaign={selectedCampaign}
      ></CampaignModalDetail>
    );
  }, [
    selectedCampaign,
    triggerDismissCampaignModal,
  ]);

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
      {/* {renderLanding()} */}
      {renderCampaignModal()}
    </div>
  );
};

export default NavigationMenu;
