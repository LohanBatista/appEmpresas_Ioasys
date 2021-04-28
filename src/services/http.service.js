import * as axios from 'axios';
import {StorageService} from '~/services';
import {API} from '~/enums';

import Reactotron from 'reactotron-react-native';
import EventEmitter from 'sm-event-emitter';

const httpClient = axios.create({
  timeout: 1130000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status) {
      if (error.response.status === 401 || error.response.status === 403) {
        if (error.response.config.url.indexOf('/login') > 0) {
        } else {
          EventEmitter.emit('FORCE_LOGOUT', true);
          Reactotron.log('FORCE_LOGOUT');
        }
      }
      throw {...error};
    }
  },
);

let isConnected = true;

export class HttpService {
  static init() {
    return new Promise((resolve) => {
      StorageService.getObject('auth').then((auth) => {
        console.log(auth);
        if (auth) {
          httpClient.defaults.headers.common['access-token'] =
            auth['access-token'];
          httpClient.defaults.headers.common.client = auth.client;
          httpClient.defaults.headers.common.uid = auth.uid;
        }
        console.log(auth);
        resolve({auth, internet: true});
      });
    });
  }

  registerToken(auth) {
    httpClient.defaults.headers.common['access-token'] = auth['access-token'];
    httpClient.defaults.headers.common.client = auth.client;
    httpClient.defaults.headers.common.uid = auth.uid;
    // httpClient.defaults.headers.common.Authorization = auth;

    console.log(auth['access-token']);
    return StorageService.setObject('auth', auth);
  }

  removeToken() {
    return new Promise((resolve) => {
      StorageService.remove('auth').then(() => {
        httpClient.defaults.headers.common.Authorization = '';
        delete httpClient.defaults.headers.common.Authorization;
        resolve(true);
      });
    });
  }

  get(url, data, setting) {
    return new UrlRequestResolver(url, setting)
      .resolve()
      .then((resolvedUrl) => {
        return new RequestPromiseResolver(
          httpClient.get(resolvedUrl),
        ).resolve();
      });
  }

  post(url, data, setting) {
    return new UrlRequestResolver(url, setting)
      .resolve()
      .then((resolvedUrl) => {
        return new RequestPromiseResolver(
          httpClient.post(resolvedUrl, data, setting),
        ).resolve();
      });
  }

  patch(url, data, setting) {
    return new UrlRequestResolver(url, setting)
      .resolve()
      .then((resolvedUrl) => {
        return new RequestPromiseResolver(
          httpClient.patch(resolvedUrl, data, setting),
        ).resolve();
      });
  }

  delete(url, data, setting) {
    return new UrlRequestResolver(url, setting)
      .resolve()
      .then((resolvedUrl) => {
        return new RequestPromiseResolver(
          httpClient.delete(resolvedUrl, data, setting),
        ).resolve();
      });
  }
}

class RequestPromiseResolver {
  constructor(requestPromise) {
    this.requestPromise = requestPromise;
  }

  resolve() {
    return new Promise((resolve, reject) => {
      if (isConnected) {
        this.requestPromise
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        alert('Sem conexão com a internet.');
        reject({
          message: 'Você não está conectado.',
        });
      }
    });
  }
}

class UrlRequestResolver {
  constructor(url, settings = {}) {
    this.apiUrl = settings.api ? settings.api : API.villela;
    this.url = url;
    this.useRawUrl = settings.useRawUrl;
  }

  resolve() {
    return new Promise((resolve, reject) => {
      resolve(this.useRawUrl ? this.url : `${this.apiUrl}${this.url}`);
    });
  }
}
