// Saga
import userSaga from './user.saga';
export {userSaga};

// Actions
export const DO_LOGIN = 'user/DO_LOGIN';
export const DO_LOGIN_SUCCESS = 'user/DO_LOGIN_SUCCESS';

export const DO_LOGOUT = 'user/DO_LOGOUT';

export const GET_ENTERPRISES = 'user/GET_ENTERPRISES';
export const GET_ENTERPRISES_SUCCESS = 'user/GET_ENTERPRISES_SUCCESS';

export const GET_DETAIL_BY_ID = 'user/GET_DETAIL_BY_ID';
export const GET_DETAIL_BY_ID_SUCCESS = 'user/GET_DETAIL_BY_ID_SUCCESS';

export const GET_FILTERED_ENTERPRISES = 'user/GET_FILTERED_ENTERPRISES';
export const GET_FILTERED_ENTERPRISES_SUCCESS =
  'user/GET_FILTERED_ENTERPRISES_SUCCESS';

// Reducer
const initialState = {
  token: '',
  email: '',
  password: '',
  isLoading: false,
  enterprise: {},
  enterprises: {},
  filteredEnterprises: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DO_LOGIN: {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        isLoading: true,
      };
    }
    case DO_LOGIN_SUCCESS: {
      return {...state, token: action.payload.token, isLoading: false};
    }

    case DO_LOGOUT: {
      return {...state, token: ''};
    }
    case GET_DETAIL_BY_ID_SUCCESS: {
      return {...state, enterprise: action.payload.enterprise};
    }

    case GET_ENTERPRISES: {
      return {
        ...state,
      };
    }

    case GET_ENTERPRISES_SUCCESS: {
      return {
        ...state,
        enterprises: action.payload.enterprises,
      };
    }

    case GET_FILTERED_ENTERPRISES_SUCCESS: {
      return {
        ...state,
        filteredEnterprises: action.payload.filteredEnterprises,
      };
    }

    default:
      return state;
  }
}

// Action Creators
export function doLoginSuccess(token) {
  return {type: DO_LOGIN_SUCCESS, payload: {token}};
}
export function doLogin({email, password}) {
  return {type: DO_LOGIN, payload: {email, password}};
}

export function doLogout() {
  return {type: DO_LOGOUT};
}

export function getEnterpriseDetailById(id) {
  return {type: GET_DETAIL_BY_ID, payload: {id}};
}
export function getEnterpriseDetailByIdSuccess(enterprise) {
  return {type: GET_DETAIL_BY_ID_SUCCESS, payload: {enterprise}};
}

export function getEnterprises() {
  return {type: GET_ENTERPRISES};
}

export function getEnterprisesSuccess(enterprises) {
  return {type: GET_ENTERPRISES_SUCCESS, payload: {enterprises}};
}
export function getFilteredEnterprises(id) {
  return {type: GET_FILTERED_ENTERPRISES, payload: {id}};
}

export function getFilteredEnterprisesSuccess(filteredEnterprises) {
  return {
    type: GET_FILTERED_ENTERPRISES_SUCCESS,
    payload: {filteredEnterprises},
  };
}
