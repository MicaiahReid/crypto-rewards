import React, { useCallback, useState } from "react";
import Protocol from "../../Challenges";
import Achievements from "../../Rewards";
import OnboardingButton from "./OnboardingButton/OnboardingButton";
import CustomTabs from "../../components/tabs";
import Header from "../../components/header";
import Landing from "../../Landing";
import CampaignModalDetail from "../../CampaignModalDetail";
import { animated, useSpring } from "@react-spring/web";
import { useSelector, useDispatch } from "react-redux";
import { dismissLanding, setToast } from "../../../services/redux/actions";
import {
  getCampaigns,
  getShowLanding,
  getSelectedCampaign,
  getToast,
} from "../../../services/redux/selectors";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const NavigationMenu = () => {
  const dispatch = useDispatch();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [fadeStyle, fadeApi] = useSpring(() => ({
    opacity: 1,
    onRest: () => dispatch(dismissLanding()),
  }));
  const campaigns = useSelector(getCampaigns);
  const showLanding = useSelector(getShowLanding);
  const selectedCampaign = useSelector(getSelectedCampaign);
  const toast = useSelector(getToast);

  const triggerDismissToast = useCallback(
    () => dispatch(setToast(undefined)),
    [dispatch]
  );

  const renderPages = useCallback(() => {
    switch (selectedTabIndex) {
      case 0:
        return <Protocol campaigns={campaigns}></Protocol>;
      case 1:
        return <Achievements campaigns={campaigns}></Achievements>;
      default:
        return <div>{`Page doesn't exist`}</div>;
    }
  }, [selectedTabIndex, campaigns]);

  const renderLanding = useCallback(() => {
    return showLanding ? (
      <animated.div style={fadeStyle}>
        <Landing onDismiss={() => fadeApi.start({ opacity: 0 })} />
      </animated.div>
    ) : null;
  }, [showLanding, fadeApi, fadeStyle]);

  const renderCampaignModal = useCallback(() => {
    return (
      <CampaignModalDetail
        open={!!selectedCampaign}
        campaign={selectedCampaign}
      ></CampaignModalDetail>
    );
  }, [selectedCampaign]);

  const renderToast = useCallback(() => {
    let toastBackgroundColor = "#414141";
    if (toast) {
      switch (toast.status) {
        case "error":
          toastBackgroundColor = "#F55959";
          break;
        default:
      }
    }
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!toast}
        onClose={triggerDismissToast}
        autoHideDuration={4000}
      >
        <SnackbarContent
          style={{
            backgroundColor: toastBackgroundColor,
            borderRadius: 8,
            color: "white",
          }}
          message={
            <div
              style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14 }}
            >
              {toast && toast.message}
            </div>
          }
        />
      </Snackbar>
    );
  }, [toast, triggerDismissToast]);

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
      {renderToast()}
    </div>
  );
};

export default NavigationMenu;
