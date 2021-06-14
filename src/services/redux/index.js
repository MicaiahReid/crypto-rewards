import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";

export const ActionTypes = {
  FETCH_CAMPAIGNS: "FETCH_CAMPAIGNS",
  SET_CAMPAIGNS: "SET_CAMPAIGNS",
  VERIFY_REWARDS: "VERIFY_REWARDS",
  ENROLL_TO_CHALLENGE: "ENROLL_TO_CHALLENGE",
  DISMISS_LANDING: "DISMISS_LANDING",
  SELECT_CAMPAIGN: "SELECT_CAMPAIGN",
  SET_TOAST: "SET_TOAST",
  CHECK_FOR_USER: "CHECK_FOR_USER",
  SET_ACCOUNT_ADDRESS: "SET_ACCOUNT_ADDRESS",
  RESET_STORE: "RESET_STORE",
};

const appState = {
  campaigns: [],
  showLanding: true,
  selectedCampaign: undefined,
  toast: undefined,
  accountAddress: undefined,
};

// Reducers
const appReducer = (state = appState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload.campaigns,
      };
    case ActionTypes.DISMISS_LANDING:
      return {
        ...state,
        showLanding: false,
      };
    case ActionTypes.SELECT_CAMPAIGN:
      return {
        ...state,
        selectedCampaign: action.payload.campaign,
      };
    case ActionTypes.SET_TOAST:
      return {
        ...state,
        toast: action.payload.toast,
      };
    case ActionTypes.SET_ACCOUNT_ADDRESS: {
      return {
        ...state,
        accountAddress: action.payload.address,
      };
    }
    case ActionTypes.RESET_STORE: {
      return {
        ...appState,
        showLanding: state.showLanding,
      };
    }
    default:
      return state;
  }
};

// Initialize store
const reducer = combineReducers({ app: appReducer });
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// Start saga
sagaMiddleware.run(rootSaga);

export { store };
