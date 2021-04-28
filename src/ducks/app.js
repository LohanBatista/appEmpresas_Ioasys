// Saga
import appSaga from './app.saga';
export {appSaga};

// Actions
export const SET_CODE_PUSH_REQUIRE_UPDATE = 'app/SET_CODE_PUSH_REQUIRE_UPDATE';
export const START_APP = 'app/START_APP';
export const SHOW_MODAL = 'app/SHOW_MODAL';

// Reducer
const initialState = {
  isCodePushUpdateRequired: true,
  isTabBarVisible: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CODE_PUSH_REQUIRE_UPDATE: {
      return {...state, isCodePushUpdateRequired: action.payload};
    }
    default:
      return state;
  }
}

// Action Creators
export function setIsCodePushUpdateRequired(isCodePushUpdateRequired) {
  return {
    type: SET_CODE_PUSH_REQUIRE_UPDATE,
    payload: isCodePushUpdateRequired,
  };
}
export function startApp(authToken) {
  return {type: START_APP, payload: {authToken}};
}
export function showModal(modal) {
  return {type: SHOW_MODAL, payload: modal};
}

export function setAlertVisible(status) {
  return {type: SET_ALERT_VISIBLE, payload: status};
}
