import {HttpService} from '~/services';
import {API} from '~/enums/index';

export class UserService {
  constructor() {
    this.httpService = new HttpService();
  }

  doLogin(email, password) {
    return this.httpService
      .post(
        '/v1/users/auth/sign_in',
        {email: email, password: password},
        {api: API.ioasys},
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        },
      )
      .then((response) => {
        console.log(response);
        return {
          token: response.headers,
        };
      })
      .catch((error) => {
        let message = '';

        if (error.response.status === 401) {
          message = 'Your credentials are incorrect! Please verify.';
        }

        if (error.response.status === 0) {
          message = JSON.stringify(error);
        }

        throw {
          message: message,
        };
      });
  }

  getEnterpriseDetailById(id) {
    debugger;
    return this.httpService
      .get(`/v1/enterprises/${id}`, {}, {api: API.ioasys})
      .then((response) => {
        debugger;
        return {
          enterprise: response?.data,
        };
      })
      .catch((error) => {
        debugger;
        return {};
      });
  }

  getEnterprises() {
    return this.httpService
      .get('/v1/enterprises/', {}, {api: API.ioasys})
      .then((response) => {
        console.log(response);
        return {
          enterprises: response?.data,
        };
      })
      .catch((error) => {
        return false;
      });
  }

  getFilteredEnterprises(id) {
    debugger;
    return this.httpService

      .get(
        `/v1/enterprises?enterprise_types=${id}&name=`,
        {},
        {api: API.ioasys},
      )
      .then((response) => {
        debugger;
        return {
          filteredEnterprises: response?.data,
        };
      })
      .catch((error) => {
        debugger;
        return {};
      });
  }
}
