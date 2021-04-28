import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import EventEmitter from 'sm-event-emitter';
import {appStore, persistor} from './src/state/store';

import {navigationRef, getCurrentRoute} from '~/navigation/core';

import {startApp} from '~/ducks/app';
import {getNotifications, doLogout} from '~/ducks/user';
import {CodePushConnected, VAlertConnected, VTabBar} from '~/components';
import {
  AuthScreenConnected,
  HomeScreenConnected,
  EnterpriseFilterScreenConnected,
  ProfileScreenConnected,
  EnterpriseScreenConnected,
  EnterpriseDetailScreenConnected,
} from '~/screens';
import {ConfigTheme} from '~/config';
import {VButton} from '~/components/index';

import {enableScreens} from 'react-native-screens';
import {HttpService, AnalyticsService} from '~/services/index';

import 'moment/locale/pt-br';

console.disableYellowBox = true;

enableScreens();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreenConnected} />

      <Stack.Screen
        name="VAlert"
        component={VAlertConnected}
        options={{
          stackPresentation: 'transparentModal',
          stackAnimation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreenConnected} />

      <Stack.Screen
        name="EnterpriseScreen"
        component={EnterpriseScreenConnected}
      />

      <Stack.Screen
        name="EnterpriseDetailScreen"
        component={EnterpriseDetailScreenConnected}
      />
      <Stack.Screen
        name="EnterpriseFilterScreen"
        component={EnterpriseFilterScreenConnected}
        // options={{stackPresentation: 'fullScreenModal'}}
      />
      <Stack.Screen
        name="VAlert"
        component={VAlertConnected}
        options={{
          stackPresentation: 'transparentModal',
          stackAnimation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}

function TabBarContainer() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={(props) => <VTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: {name: 'bank', size: 22},
        }}
        name="HomeScreen"
        component={HomeStack}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Log out',
          tabBarIcon: {name: 'power', size: 28},
        }}
        name="ProfileStack"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}

function RootContainer() {
  const dispatch = useDispatch();
  const isCodePushUpdateRequired = useSelector(
    (s) => s.app.isCodePushUpdateRequired,
  );
  const authToken = useSelector((s) => s.user.token);

  const httpService = new HttpService();

  ConfigTheme.build();

  if (authToken) {
    console.log(authToken);
    httpService.registerToken(authToken);
  }

  EventEmitter.on('FORCE_LOGOUT', () => {
    dispatch(doLogout());
  });

  dispatch(startApp());

  const firstRoute = getCurrentRoute();
  if (firstRoute?.name) {
    AnalyticsService.event('open_screen', {screenName: firstRoute.name});
  }

  if (isCodePushUpdateRequired) {
    return <CodePushConnected />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const route = getCurrentRoute();
        if (route.name) {
          AnalyticsService.event('open_screen', {screenName: route.name});
        }
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {authToken ? (
          <>
            <Stack.Screen name="HomeScreen" component={TabBarContainer} />

            <Stack.Screen name="HomeScreen2" component={HomeScreenConnected} />
          </>
        ) : (
          <Stack.Screen name="AuthScreen" component={AuthScreenConnected} />
        )}

        <Stack.Screen
          name="VAlert"
          component={VAlertConnected}
          options={{
            stackPresentation: 'transparentModal',
            stackAnimation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
