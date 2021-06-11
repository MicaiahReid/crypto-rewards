import { all, takeEvery, put, call, delay } from "redux-saga/effects";
import { ActionTypes } from "./redux/index";
import axios from "../utils/API";
import getConnectedPublicAddress from "../utils/MetaMaskUtils";
import { fetchCampaigns, setCampaigns } from "./redux/actions";

function* initialize() {
  // Trigger initial campaign fetch
  yield delay(100);
  yield put(fetchCampaigns());
}

function* fetchCampaignsApi() {
  try {
    const accounts = yield call(getConnectedPublicAddress);
    let getPath = "/api/campaigns";
    if (accounts.length > 0) {
      getPath += "/" + accounts[0];
    }
    let campaigns = yield call(axios.get, getPath);
    console.log("GOT CAMPAIGNS", campaigns);
  } catch (error) {
    console.log("Error fetching campaigns:", error);
  }
}

function* watchCampaignUpdates() {
  // Listen to
  yield takeEvery(ActionTypes.FETCH_CAMPAIGNS, fetchCampaignsApi);
}

export default function* rootSaga() {
  yield all([initialize(), fetchCampaignsApi(), watchCampaignUpdates()]);
}
