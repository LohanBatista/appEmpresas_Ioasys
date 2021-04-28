import * as React from 'react';
import {View, StatusBar} from 'react-native';
import {FaHeaderConnected} from '~/components';
import {SafeAreaView} from 'react-native-safe-area-context';

export function VViewContainer({options, children, backgroundColor, tabBar}) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View
        style={[
          {
            flex: 1,
            backgroundColor: backgroundColor ? backgroundColor : '#fff',
          },
        ]}>
        <FaHeaderConnected topBar={options?.topBar} />
        {children}
        {tabBar ? (
          <SafeAreaView edges={['bottom']}>
            <View style={{height: 60}} />
          </SafeAreaView>
        ) : null}
      </View>
    </>
  );
}
