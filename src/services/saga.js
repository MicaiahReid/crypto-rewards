import { all, takeLatest, put, call, delay } from "redux-saga/effects";
import { ActionTypes } from "./redux/index";
import axios from "../utils/API";
import getConnectedPublicAddress from "../utils/MetaMaskUtils";
import { setCampaigns } from "./redux/actions";

function* fetchCampaignsApi() {
  console.log("Hello");
  try {
    const accounts = yield call(getConnectedPublicAddress);
    let getPath = "/api/campaigns";
    if (accounts.length > 0) {
      getPath += "/" + accounts[0];
    }
    let campaigns = yield call(axios.get, getPath);
    yield put(setCampaigns(campaigns));
    console.log("GOT CAMPAIGNS", campaigns);
  } catch (error) {
    console.log("Error fetching campaigns:", error);
  }
}

function* watchCampaignUpdates() {
  // Listen to campaign updates
  yield takeLatest(ActionTypes.FETCH_CAMPAIGNS, fetchCampaignsApi);
}

export default function* rootSaga() {
  yield all([fetchCampaignsApi(), watchCampaignUpdates()]);
}
