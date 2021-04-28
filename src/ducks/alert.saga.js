import {put, takeLatest} from 'redux-saga/effects';
import {SHOW_ALERT} from './alert';
import {pushVAlert} from '~/navigation/navigation.actions';

function* _showAlert() {
  pushVAlert();
}

function* alertSaga() {
  yield takeLatest(SHOW_ALERT, _showAlert);
}

export default (sagaMiddleware) => {
  sagaMiddleware.run(alertSaga);
};
