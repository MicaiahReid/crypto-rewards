import { ActionTypes } from "./";

// Actions
export const fetchCampaigns = () => ({
  type: ActionTypes.FETCH_CAMPAIGNS,
});

export const setCampaigns = (campaigns) => ({
  type: ActionTypes.SET_CAMPAIGNS,
  payload: {
    campaigns,
  },
});

export const verifyRewards = (campaignId) => ({
  type: ActionTypes.VERIFY_REWARDS,
  payload: {
    campaignId,
  },
});

export const enrollToChallenge = (campaignId) => ({
  type: ActionTypes.ENROLL_TO_CHALLENGE,
  payload: {
    campaignId,
  },
});

export const selectCampaign = (campaign) => ({
  type: ActionTypes.SELECT_CAMPAIGN,
  payload: {
    campaign,
  },
});

export const dismissLanding = () => ({
  type: ActionTypes.DISMISS_LANDING,
});

export const setToast = (toast) => ({
  type: ActionTypes.SET_TOAST,
  payload: {
    toast,
  },
});

export const checkForUser = () => ({
  type: ActionTypes.CHECK_FOR_USER,
});

export const setAccountAddress = (address) => ({
  type: ActionTypes.SET_ACCOUNT_ADDRESS,
  payload: {
    address,
  },
});

export const resetStore = () => ({
  type: ActionTypes.RESET_STORE,
});
