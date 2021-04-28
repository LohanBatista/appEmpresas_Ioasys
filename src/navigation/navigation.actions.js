import * as React from 'react';

import {navigate} from '~/navigation/core';

export const navigationRef = React.createRef();

export function pushToHomeScreen() {
  navigate('HomeScreen');
}

export function pushVAlert() {
  navigate('VAlert');
}

export function pushToEnterpriseFilterScreen({lead, etapa}) {
  navigate('EnterpriseFilterScreen', {lead, etapa});
}

export function pushToUserInformationScreen() {
  navigate('UserInformationScreen');
}
export function pushToChangePasswordScreen() {
  navigate('ChangePasswordScreen');
}

export function pushToEnterpriseScreen() {
  navigate('EnterpriseScreen');
}

export function pushToEnterpriseDetail(params = {}) {
  navigate('EnterpriseDetailScreen', params);
}
