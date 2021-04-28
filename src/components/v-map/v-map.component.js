import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, View} from 'react-native';
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {mapStyle} from './style.js';
import {VIcon} from '../v-icon/v-icon.component.js';
import {
  PIN,
  PIN2,
  PIN_DONE,
  PIN_DONE_SELECTED,
  PIN_ME,
} from '~/assets/index.js';
import {VText} from '../v-text/v-text.component.js';
import MapView from 'react-native-map-clustering';
import EStyleSheet from 'react-native-extended-stylesheet';

import {delay} from '~/core';

export const VMap = ({
  markers,
  onSelect,
  onChange,
  mapRef,
  selected,
  onGroupSelect,
  initialRegion,
  superClusterRef,
}) => {
  // const mapRef = useRef();
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     fadeAnim: new Animated.Value(0),
  //     selected: selected,
  //   };

  //   Animated.timing(this.state.fadeAnim, {
  //     toValue: 1,
  //     duration: 450,
  //     delay: 200,
  //     useNativeDriver: true,
  //   }).start();
  // }

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const [selected2, setSelected] = useState(selected);
  const [selectedCluster, setSelectedCluster] = useState(-1);
  const [lastClusterId, setLastClusterId] = useState(-1);

  // useEffect(() => {
  //   // onSelect(selected);
  // }, [markers]);

  async function goTo({event, selected}) {
    const {coordinate} = event.nativeEvent;

    setSelectedCluster(-1);
    onSelect(selected);
    setSelected(selected);

    const camera = await mapRef.current.getCamera();

    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          },
          zoom: camera.zoom,
        },
        600,
      );
    }
  }

  async function onClusterPress(cluster, mar) {
    const arr = mar.map((m) => m.properties.marker);
    const camera1 = await mapRef.current.getCamera();
    onGroupSelect(arr);
    setSelectedCluster(cluster);

    if (mapRef.current && arr?.length) {
      mapRef.current.animateCamera({
        center: {
          latitude: arr[0].lat,
          longitude: arr[0].lng,
        },
        zoom: camera1.zoom,
      });
    }
  }

  function getImage(marker, isSelected) {
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

  function onRegionChange(region) {
    // console.log(region);
    onChange(region);
    // }
    // function onMarkerDragEnd(coord) {
    //   let newRegion = {
    //     latitude: parseFloat(coord.latitude),
    //     longitude: parseFloat(coord.longitude),
    //     latitudeDelta: 0.0522,
    //     longitudeDelta: 0.0321,
    //   };

    // console.log('dragEnd', this.newRegion.latitude);

    // this.setState({
    //   region: newRegion,
    // });
  }
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: '#000',
        opacity: fadeAnim,
      }}>
      <MapView
        ref={mapRef}
        superClusterRef={superClusterRef}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        customMapStyle={mapStyle}
        spiralEnabled={false}
        layoutAnimationConf={null}
        preserveClusterPressBehavior={true}
        maxZoomLevel={20}
        maxZoom={20}
        renderCluster={(cluster) => {
          const {geometry, onPress, id} = cluster;

          const mar = superClusterRef.current.getLeaves(id, Infinity);
          console.warn(mar);

          const current = mar.find(
            (m) =>
              m?.properties?.marker?.dados?.leadID === selected?.dados?.leadID,
          );

          if (current && lastClusterId !== id) {
            setLastClusterId(id);
            onClusterPress(cluster, mar);
          }

          const isSelected = id === selectedCluster.id;

          return (
            <Marker
              key={`${geometry.coordinates[0]}_${geometry.coordinates[1]}`}
              coordinate={{
                longitude: geometry.coordinates[0],
                latitude: geometry.coordinates[1],
              }}
              style={{
                zIndex: isSelected ? 100 : 1,
              }}
              onPress={onPress}>
              <View
                style={{
                  paddingTop: 4,
                  paddingRight: 4,
                }}>
                <Image
                  source={isSelected ? PIN : PIN2}
                  style={{
                    width: 55,
                    height: 71,
                    transform: [
                      {scale: isSelected ? 1 : 0.8},
                      {translateY: isSelected ? 0 : 13},
                    ],
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    backgroundColor: EStyleSheet.value('$colors.primary'),
                    borderRadius: 30,
                    zIndex: 101,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    minWidth: 30,
                    minHeight: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [
                      {scale: id === selectedCluster.id ? 1 : 0.8},
                      {translateY: id === selectedCluster.id ? 0 : 13},
                    ],
                  }}>
                  <VText style={{fontSize: 16, color: '#000'}} bold>
                    {mar.length}
                  </VText>
                </View>
              </View>
            </Marker>
          );
        }}
        onClusterPress={(cluster, mar) => onClusterPress(cluster, mar)}
        mapPadding={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        initialRegion={{
          // latitude: -23.573366082740442,
          // longitude: -46.6568197683846,
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.0021,
        }}>
        <Marker
          draggable
          onDragEnd={(e) => {
            console.log('dragEnd', e.nativeEvent.coordinate);
            onChange(e.nativeEvent.coordinate);
          }}
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}>
          <View>
            <Image
              source={PIN_ME}
              style={{
                width: 55,
                height: 71,
                transform: [{scale: 0.5}, {translateY: 20}],
              }}
            />
          </View>
        </Marker>
        {markers?.map((marker) => {
          debugger;
          const isSelected = selected?.dados?.leadID === marker?.dados.leadID;
          return (
            <Marker
              coordinate={{latitude: marker.lat, longitude: marker.lng}}
              marker={marker}
              onPress={(event) => goTo({event, selected: marker})}>
              <View>
                <Image
                  source={getImage(marker, isSelected)}
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
};
