import { all, takeLatest, put, call } from "redux-saga/effects";
import { ActionTypes } from "./redux/index";
import axios from "../utils/API";
import getConnectedPublicAddress from "../utils/MetaMaskUtils";
import { setCampaigns, fetchCampaigns, setToast } from "./redux/actions";

function* getAccountAddress() {
  const accounts = yield call(getConnectedPublicAddress);
  if (accounts.length > 0) {
    return accounts[0];
  }
  throw new Error("Need to connect wallet.");
}

function* fetchCampaignsApi() {
  try {
    const accountAddress = yield call(getAccountAddress);
    const apiPath = `/api/campaigns/${accountAddress}`;
    const results = yield call(axios.get, apiPath);
    yield put(setCampaigns(results.data));
  } catch (error) {
    console.log("Error fetching campaigns:", error);
  }
}

function* verifyRewardsApi(action) {
  const { campaignId } = action.payload;
  try {
    const accountAddress = yield call(getAccountAddress);
    const apiPath = "/api/verify";
    const apiParams = { campaignId, address: accountAddress };
    const results = yield call(axios.post, apiPath, apiParams);
    if (results.data.success) {
      // Refetch campaigns
      yield put(fetchCampaigns());
    } else {
      throw new Error("Failed to verify rewards.");
    }
  } catch (error) {
    const toast = {
      message: `Failed to claim rewards. Reason: ${error.message}`,
      status: "error",
    };
    yield put(setToast(toast));
  }
}

function* enrollToChallengeApi(action) {
  const { campaignId } = action.payload;
  try {
    const accountAddress = yield call(getAccountAddress);
    const apiPath = "/api/enroll";
    const apiParams = { campaignId, address: accountAddress };
    const results = yield call(axios.post, apiPath, apiParams);
    if (results.data.success) {
      // Refetch campaigns
      yield put(fetchCampaigns());
    } else {
      throw new Error("Failed to enroll to campaign.");
    }
  } catch (error) {
    const toast = {
      message: `Failed to enroll to campaign. Reason: ${error.message}`,
      status: "error",
    };
    yield put(setToast(toast));
  }
}

function* watchCampaignUpdates() {
  // Listen to campaign updates
  yield takeLatest(ActionTypes.FETCH_CAMPAIGNS, fetchCampaignsApi);
}

function* watchVerifyRewards() {
  yield takeLatest(ActionTypes.VERIFY_REWARDS, verifyRewardsApi);
}

function* watchEnrollToChallenge() {
  yield takeLatest(ActionTypes.ENROLL_TO_CHALLENGE, enrollToChallengeApi);
}

export default function* rootSaga() {
  yield all([
    fetchCampaignsApi(),
    watchCampaignUpdates(),
    watchVerifyRewards(),
    watchEnrollToChallenge(),
  ]);
}
