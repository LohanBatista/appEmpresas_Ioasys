import {put, takeLatest, select} from 'redux-saga/effects';
import {START_APP, setIsCodePushUpdateRequired} from './app';
import codePush from 'react-native-code-push';
import {getUser} from './user';
import SplashScreen from 'react-native-splash-screen';

function* _startApp(action) {
  const TIMEOUT = 15000;
  // yield codePush.clearUpdates();

  // yield put(getUser());

  try {
    const timer = setTimeout(() => {
      put(setIsCodePushUpdateRequired(false));
    }, TIMEOUT);

    const update = yield codePush.checkForUpdate();

    if (!update) {
      yield put(setIsCodePushUpdateRequired(false));
    }

    if (update) {
      clearTimeout(timer);
      yield put(
        setIsCodePushUpdateRequired(
          update?.isMandatory && !update.failedInstall,
        ),
      );
    }
  } catch (e) {
    yield put(setIsCodePushUpdateRequired(false));
  }

  yield SplashScreen.hide();
}

function* appSaga() {
  yield takeLatest(START_APP, _startApp);
}

export default (sagaMiddleware) => {
  sagaMiddleware.run(appSaga);
};
