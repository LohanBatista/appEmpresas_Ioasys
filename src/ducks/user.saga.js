import {put, takeLatest} from 'redux-saga/effects';
import {showAlert} from '~/ducks/alert';
import {pushToEnterpriseDetail} from '~/navigation/navigation.actions';

import {HttpService, UserService} from '~/services';
import {
  doLoginSuccess,
  DO_LOGIN,
  DO_LOGOUT,
  GET_ENTERPRISES,
  getEnterprisesSuccess,
  GET_DETAIL_BY_ID,
  getEnterpriseDetailByIdSuccess,
  GET_FILTERED_ENTERPRISES,
  getFilteredEnterprisesSuccess,
} from './user';

function* _doLogin(action) {
  const {email, password} = action.payload;
  const userService = new UserService();

  try {
    const {token} = yield userService.doLogin(email, password);

    if (token) {
      yield put(doLoginSuccess(token));
    }
  } catch (error) {
    yield put(
      showAlert({
        title: 'Atention!',
        body: {
          text: error.message,
        },
        buttons: [
          {
            text: 'Ok',
            bold: true,
          },
        ],
      }),
    );
  }
}

function* _getEnterpriseDetailById(action) {
  const userService = new UserService();
  const {id} = action.payload;
  const {enterprise} = yield userService.getEnterpriseDetailById(id);
  if (enterprise) {
    yield put(getEnterpriseDetailByIdSuccess(enterprise));
    yield pushToEnterpriseDetail();
  }
}
function* _getFilteredEnterprises(action) {
  const userService = new UserService();
  const {id} = action.payload;
  const {filteredEnterprises} = yield userService.getFilteredEnterprises(id);
  if (filteredEnterprises) {
    yield put(getFilteredEnterprisesSuccess(filteredEnterprises));
  }
}

function* _getEnterprises() {
  const userService = new UserService();

  const {enterprises} = yield userService.getEnterprises();

  if (enterprises) {
    yield put(getEnterprisesSuccess(enterprises));
  }
}

function* _doLogout() {
  const httpService = new HttpService();
  yield httpService.removeToken();
}

function* userSaga() {
  yield takeLatest(DO_LOGIN, _doLogin);

  yield takeLatest(DO_LOGOUT, _doLogout);

  yield takeLatest(GET_DETAIL_BY_ID, _getEnterpriseDetailById);

  yield takeLatest(GET_ENTERPRISES, _getEnterprises);
  yield takeLatest(GET_FILTERED_ENTERPRISES, _getFilteredEnterprises);
}

export default (sagaMiddleware) => {
  sagaMiddleware.run(userSaga);
};
