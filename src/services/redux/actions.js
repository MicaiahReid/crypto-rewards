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

export const dismissLanding = () => ({
  type: ActionTypes.DISMISS_LANDING,
});
