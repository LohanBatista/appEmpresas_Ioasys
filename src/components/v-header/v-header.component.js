import React, {useState} from 'react';
import {
  View,
  ViewPropTypes,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaView} from 'react-native-safe-area-context';

import {VIcon, VText} from '~/components';
import {pop} from '~/navigation/core/index';

const HEADER_HEIGHT = 50;

export const FaHeaderConnected = React.memo(function FaHeader({topBar}) {
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(true);
  const navigation = useNavigation();
  const title = topBar?.title;
  const [appendedComponentHeight, setAppendedComponentHeight] = useState(0);

  function onBackButtonPress() {
    setIsBackButtonVisible(false);

    if (topBar?.onBackButtonPress) {
      topBar?.onBackButtonPress();
    } else {
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }, 10);
    }
  }

  if (topBar?.visible === false) {
    return null;
  }

  function onLayout(nativeEvent) {
    const {height} = nativeEvent.layout;
    setAppendedComponentHeight(height);
  }

  function renderIcon() {
    if (topBar?.backButtonIcon) {
      return (
        <VIcon name={topBar.backButtonIcon} size={20} style={{color: '#fff'}} />
      );
    }

    return <VIcon name={'chevronLeft'} size={20} style={{color: '#ccc'}} />;
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView
        edges={
          topBar?.modal && Platform.OS === 'ios' ? ['left', 'right'] : ['top']
        }
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#000',

          zIndex: 100,
          // borderBottomWidth: 1,
          borderColor: '#333',
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: topBar?.borderColor
              ? topBar.borderColor
              : 'rgba(0,0,0,0.07)',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: HEADER_HEIGHT,
            }}>
            <Animatable.View
              animation={
                topBar?.animated === false
                  ? {0: {opacity: 1}, 1: {opacity: 1}}
                  : {
                      0: {
                        opacity: 0,
                        // translateX: 60,
                        // scale: 0.2,
                      },
                      1: {
                        opacity: 1,
                        // translateX: 0,
                        // scale: 1,
                      },
                    }
              }
              delay={100}
              duration={300}
              useNativeDriver
              style={topBar?.hideBackButton ? {width: 0} : {width: 50}}>
              {(isBackButtonVisible && topBar?.hideBackButton !== true) ||
              topBar?.onBackButtonPress ? (
                <TouchableOpacity
                  style={[
                    {
                      height: HEADER_HEIGHT,
                      justifyContent: 'center',
                      paddingLeft: 15,
                      paddingTop: topBar?.modal ? 4 : 0,
                    },
                  ]}
                  onPress={onBackButtonPress}>
                  {renderIcon()}
                </TouchableOpacity>
              ) : null}
            </Animatable.View>
            <Animatable.View
              animation={
                topBar?.animated === false
                  ? {0: {opacity: 1}, 1: {opacity: 1}}
                  : {
                      0: {
                        opacity: 0,
                        translateX: 30,
                      },
                      1: {
                        opacity: 1,
                        translateX: 0,
                      },
                    }
              }
              delay={80}
              duration={350}
              useNativeDriver
              style={{flex: 1}}>
              {title && !!title.component ? (
                title.component()
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 1,
                    alignItems: 'center',
                    color: '#555',
                    paddingLeft: topBar?.hideBackButton ? 50 : 0,
                  }}>
                  <VText
                    medium
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      color: '#fff',
                    }}
                    numberOfLines={1}>
                    {title?.text}
                  </VText>
                </View>
              )}
            </Animatable.View>
            {topBar?.rightButtons ? (
              <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                {topBar?.rightButtons?.map((button) => button.component())}
              </View>
            ) : (
              <View style={{width: 50}} />
            )}
          </View>
          <View
            style={{flexDirection: 'row'}}
            onLayout={({nativeEvent}) => onLayout(nativeEvent)}>
            {topBar?.extra ? topBar?.extra() : null}
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView edges={topBar?.modal ? ['left', 'right'] : ['top']}>
        <View
          style={{
            height: topBar?.extra
              ? appendedComponentHeight + HEADER_HEIGHT + 1
              : HEADER_HEIGHT + 1,
          }}
        />
      </SafeAreaView>
    </>
  );
});
