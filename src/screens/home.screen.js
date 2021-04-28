import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {VViewContainer, VText, VIcon} from '~/components';
import {connect} from 'react-redux';

import EStyleSheet from 'react-native-extended-stylesheet';

import {ExternalActionsService} from '~/services/index';

import {pushToNotificationsScreen} from '~/navigation';

import {
  LOGO_EMPRESAS,
  LOGO_HORIZONTAL,
  DOTS_VECTOR,
  LOGO_01,
} from '~/assets/index';

import {
  pushToEnterpriseFilterScreen,
  pushToEnterpriseScreen,
  pushToFilesScreen,
  pushToLeadsHistoryScreen,
  pushToLeadsScreen,
} from '~/navigation/index';

import EventEmitter from 'sm-event-emitter';

const {width} = Dimensions.get('screen');

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.tabListener = EventEmitter.on('tabPress', (e) => {
      const current = this.props.route.key.split('-');
      const target = e.target.split('-');
      if (target[0] === current[0]) {
        this._scrollToTop();
      }
    });

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // this.props.dispatch(getLeads(2));
    });
  }

  componentWillUnmount() {
    EventEmitter.remove(this.tabListener);
  }

  _scrollToTop() {
    if (this.scroll) {
      this.scroll.scrollTo({x: 0, y: 0, animated: true});
    }
  }

  render() {
    return (
      <VViewContainer
        tabBar
        options={{
          topBar: {
            hideBackButton: true,
            animated: false,
            title: {
              component: () => (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingLeft: 50,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={LOGO_01}
                    style={{
                      width: 162,
                      height: 60,
                      marginTop: -10,
                    }}
                    resizeMode="contain"
                  />
                </View>
              ),
            },
          },
        }}>
        <View style={{flex: 0.3, zIndex: 2}} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',

            justifyContent: 'center',
          }}>
          <Image
            source={LOGO_EMPRESAS}
            style={{marginTop: -100, width: 200, height: 200}}
            resizeMode="contain"
          />
          <View
            style={{
              height: 2,
              width: width - 40,
              marginVertical: 10,
              backgroundColor: '#e01e69',
            }}
          />
        </View>
        <ScrollView
          ref={(e) => (this.scroll = e)}
          contentContainerStyle={{paddingBottom: 50}}>
          <View style={{padding: 20}}>
            <VText style={{color: '#000'}}>Welcome</VText>
            <View
              style={{
                height: 1,
                width: 100,
                marginVertical: 10,
                backgroundColor: '#e01e69',
              }}
            />
            <VText
              style={{fontSize: 20, textTransform: 'uppercase', color: '#000'}}>
              Teste Apple
            </VText>
          </View>

          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={pushToEnterpriseScreen}>
              <VIcon name="dots" style={styles.menuItemIcon} />
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  marginTop: 20,
                  flexDirection: 'column',
                }}>
                <VText style={styles.menuItemText}>Business listing</VText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={pushToEnterpriseFilterScreen}>
              <VIcon name="dots" style={styles.menuItemIcon} />
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  marginTop: 20,
                  flexDirection: 'column',
                }}>
                <VText style={styles.menuItemText}>
                  Business listing by type
                </VText>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',

            justifyContent: 'center',
          }}>
          <Image
            source={DOTS_VECTOR}
            style={{width: width, height: 100, marginTop: 60, opacity: 0.8}}
            // resizeMode="contain"
          />
        </View>
      </VViewContainer>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export const HomeScreenConnected = connect(mapStateToProps)(HomeScreen);

const styles = EStyleSheet.create({
  menuItem: {
    backgroundColor: '#f2f2f2',
    opacity: 0.8,
    width: width - 32,
    paddingVertical: 20,

    margin: 6,
    borderRadius: '$borderRadius',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    color: '#555',
    fontSize: 42,
    paddingLeft: 10,
  },
  menuItemIconBottom: {
    color: '#555',
    fontSize: 35,
    paddingLeft: 10,
  },

  menuItemText: {
    fontSize: 18,
    color: '#555',
    marginLeft: 24,
    marginTop: -18,
    textTransform: 'uppercase',
  },
});
