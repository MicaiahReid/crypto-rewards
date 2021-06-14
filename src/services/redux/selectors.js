// Selectors
export const getCampaigns = (store) => store.app.campaigns;

export const getShowLanding = (store) => store.app.showLanding;

export const getSelectedCampaign = (store) => store.app.selectedCampaign;

export const getToast = (store) => store.app.toast;

export const getCampaignById = (store, campaignId) => {
  const filteredCampaigns = store.app.campaigns.filter(
    (campaign) => campaignId === campaign._id
  );
  if (filteredCampaigns.length > 0) {
    return filteredCampaigns[0];
  }
  return undefined;
};

export const getAccountAddress = (store) => store.app.accountAddress;
