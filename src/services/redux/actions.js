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
