import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";

export const ActionTypes = {
  FETCH_CAMPAIGNS: "FETCH_CAMPAIGNS",
  SET_CAMPAIGNS: "SET_CAMPAIGNS",
};

const appState = {
  campaigns: [],
};

// Reducers
const appReducer = (state = appState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload.campaigns,
      };
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
