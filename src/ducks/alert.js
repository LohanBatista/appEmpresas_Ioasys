// Saga
import alertSaga from './alert.saga';
export {alertSaga};

// Actions
export const SHOW_ALERT = 'alert/SHOW_ALERT';
export const SET_ALERT_VISIBLE = 'alert/SET_ALERT_VISIBLE';

// Reducer
const initialState = {
  isAlertVisible: false,
  alert: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_ALERT:
      return {...state, isAlertVisible: true, alert: action.payload};
    case SET_ALERT_VISIBLE:
      return {...state, isAlertVisible: action.payload};
    default:
      return state;
  }
}

// Action Creators
export function showAlert(alert) {
  return {type: SHOW_ALERT, payload: alert};
}

export function setAlertVisible(status) {
  return {type: SET_ALERT_VISIBLE, payload: status};
}
