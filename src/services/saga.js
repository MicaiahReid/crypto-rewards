import { all, takeLatest, put, call } from "redux-saga/effects";
import { ActionTypes } from "./redux/index";
import axios from "../utils/API";
import getConnectedPublicAddress from "../utils/MetaMaskUtils";
import {
  setCampaigns,
  fetchCampaigns,
  setToast,
  resetStore,
} from "./redux/actions";
import MetaMaskService from "./metamask";

function* getAccountAddress() {
  const accounts = yield call(getConnectedPublicAddress);
  if (accounts.length > 0) {
    return accounts[0];
  }
  throw new Error("Need to connect wallet.");
}

function* checkForUserApi() {
  try {
    const accountAddress = yield call(getAccountAddress);
    const apiPath = `/api/user/${accountAddress}`;
    const results = yield call(axios.get, apiPath);
    if (results.data && results.data._id) {
      // User already exists
    } else {
      // User doesn't exist. Create user
      const apiPath = `/api/user/`;
      const results = yield call(axios.post, apiPath, {
        address: accountAddress,
      });
      if (results.data && results.data._id) {
        // Successfully created user
      } else {
        throw new Error("Failed to create user.");
      }
    }
  } catch (error) {
    console.log("Error checking for user", error);
  }
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

function* watchCheckForUser() {
  yield takeLatest(ActionTypes.CHECK_FOR_USER, checkForUserApi);
}

function* processAccountChanges(action) {
  const { address } = action.payload;
  if (address) {
    yield call(checkForUserApi);
    yield call(fetchCampaignsApi);
    MetaMaskService.stopOnboarding && MetaMaskService.stopOnboarding();
  } else {
    // Disconnected
    yield put(resetStore());
  }
}
function* watchAccountChanges() {
  yield takeLatest(ActionTypes.SET_ACCOUNT_ADDRESS, processAccountChanges);
}

export default function* rootSaga() {
  yield all([
    watchAccountChanges(),
    watchCheckForUser(),
    watchCampaignUpdates(),
    watchVerifyRewards(),
    watchEnrollToChallenge(),
  ]);
}
