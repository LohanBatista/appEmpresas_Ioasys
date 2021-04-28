import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, View} from 'react-native';
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {mapStyle} from './style.js';
import {VIcon} from '../v-icon/v-icon.component.js';
import {PIN, PIN2, PIN_DONE, PIN_DONE_SELECTED} from '~/assets/index.js';
import {VText} from '../v-text/v-text.component.js';
import MapView from 'react-native-map-clustering';

export class VMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
      selected: this.props.selected,
    };

    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 450,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }

  static getDerivedStateFromProps(props, state) {
    return {
      selected:
        props.selected !== state.selected ? props.selected : state.selected,
    };
  }

  goTo({event, selected}) {
    const {coordinate} = event.nativeEvent;

    if (this.props.onSelect) {
      this.props.onSelect(selected);
    }

    this.setState({selected: selected});

    if (this.map) {
      this.map.animateCamera(
        {
          center: {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          },
          zoom: 18,
        },
        600,
      );
    }
  }

  getImage(marker, isSelected) {
    if (isSelected && marker?.dados.done) {
      return PIN_DONE_SELECTED;
    }

    if (isSelected) {
      return PIN;
    }

    if (marker?.dados.done) {
      return PIN_DONE;
    }

    return PIN2;
  }

  setRef(e) {
    debugger;
    this.map = e;
    this.props.refName(e);
  }

  render() {
    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: '#000',
          opacity: this.state.fadeAnim,
        }}>
        <MapView
          ref={this.setRef}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          customMapStyle={mapStyle}
          spiralEnabled={false}
          mapPadding={{
            top: 20,
            right: 20,
            bottom: 55,
            left: 20,
          }}
          initialRegion={{
            latitude: -29.379684448242188,
            longitude: -50.87385177612305,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0021,
          }}>
          {this.props.markers?.map((marker) => {
            const isSelected =
              this.state.selected?.dados?.leadID === marker?.dados.leadID;
            return (
              <Marker
                coordinate={{latitude: marker.lat, longitude: marker.lng}}
                onPress={(event) => this.goTo({event, selected: marker})}>
                <View>
                  <Image
                    source={this.getImage(marker, isSelected)}
                    style={{
                      width: 55,
                      height: 71,
                      zIndex: isSelected ? 100 : 1,
                      transform: [
                        {scale: isSelected ? 1 : 0.8},
                        {translateY: isSelected ? 0 : 13},
                      ],
                    }}
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
      </Animated.View>
    );
  }
}
