import {createRef} from 'react';
import {StackActions, TabActions} from '@react-navigation/routers';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = createRef();
export const routeNameRef = createRef();

export function navigate(routeName, params) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(routeName, params));
  }
}

export function getCurrentRoute() {
  let rootState = navigationRef?.current?.getRootState();
  let route = rootState?.routes[rootState.index];

  while (route?.state) {
    route = route.state.routes[route.state.index];
  }
  return route;
}

export function reset(routes) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(
      CommonActions.reset({
        routes,
      }),
    );
  }
}

export function replace(stackName, routeName, params) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(
      StackActions.replace(stackName, {screen: routeName, ...params}),
    );
  }
}

export function jumpTo(routeName, params) {
  const jumpToAction = TabActions.jumpTo(routeName, params);
  if (navigationRef.current) {
    navigationRef.current.dispatch(jumpToAction);
  }
}

export function goBack() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current.goBack();
  }
}

export function pop(count = 1) {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current.dispatch(StackActions.pop(count));
  }
}

export function popToTop() {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.popToTop());
  }
}
