import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {reducer as formReducer} from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import persistConfig from './persist.config';

import app, {appSaga} from '~/ducks/app';
import user, {userSaga} from '~/ducks/user';
import alert, {alertSaga} from '~/ducks/alert';

const appReducer = combineReducers({
  form: formReducer,
  user: user,
  app: app,
  alert: alert,
});

import Reactotron from '../../ReactOtronConfig';

const persistedReducer = persistReducer(persistConfig, appReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer()),
);

userSaga(sagaMiddleware);

appSaga(sagaMiddleware);
alertSaga(sagaMiddleware);

export const appStore = store;
export const persistor = persistStore(appStore);
