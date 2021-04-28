import React, {useEffect, useRef} from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {VText, VIcon} from '~/components';
import {Money} from '~/core';
import {pushToCartScreen} from '~/navigation';

import EventEmitter from 'sm-event-emitter';

import {SafeAreaView} from 'react-native-safe-area-context';

import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export function VTabBar({state, descriptors, navigation}) {
  const TABBAR_HEIGHT = 60;
  const opacity = useRef(new Animated.Value(1)).current;
  const top = useRef(new Animated.Value(0)).current;
  const isTabBarVisible = useSelector((s) => s.app.isTabBarVisible);

  useEffect(() => {
    if (!isTabBarVisible) {
      Animated.parallel([
        Animated.spring(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(top, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(top, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isTabBarVisible, opacity, top]);

  return (
    <AnimatedSafeAreaView
      edges={['bottom']}
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#000',
        },
        {
          opacity,
          transform: [{translateY: top}],
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const item = descriptors[route.key].options;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }

            if (isFocused) {
              EventEmitter.emit('tabPress', event);
            }
          };

          return (
            <View
              style={{
                flex: 1,
                backgroundColor: '#000',
                height: TABBAR_HEIGHT,
                borderTopWidth: 1,
                borderColor: '#222',
              }}
              key={index}>
              <TouchableOpacity
                activeOpacity={index === 10 ? 1 : 0.5}
                onPress={onPress}
                style={
                  index === 10 && {
                    backgroundColor: '#222',
                    top: -8,
                    borderRadius: 4,
                    height: 80,
                    paddingTop: 8,
                  }
                }>
                <View style={{alignItems: 'center', paddingTop: 12}}>
                  {isFocused ? (
                    <View
                      style={{
                        height: 4,
                        left: 4,
                        right: 4,
                        backgroundColor: '#e01e69',
                        position: 'absolute',
                        top: index === 10 ? -8 : 0,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}
                    />
                  ) : null}
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <VIcon
                      name={item.tabBarIcon.name}
                      size={item.tabBarIcon.size || 18}
                      style={[
                        isFocused ? {color: '#e01e69'} : {color: '#555'},
                        index === 10 && {marginBottom: 8},
                      ]}
                    />
                  </View>
                  <VText
                    style={[
                      {fontSize: 11, color: '#555', marginTop: 1},
                      isFocused ? {color: '#e01e69'} : {},
                    ]}>
                    {item.tabBarLabel}
                  </VText>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </AnimatedSafeAreaView>
  );
}
