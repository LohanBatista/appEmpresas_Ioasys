import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {VViewContainer, VText, VIcon} from '~/components';
import {connect} from 'react-redux';

import {ScrollView} from 'react-native-gesture-handler';
import {showAlert} from '~/ducks/alert';
import {doLogout} from '~/ducks/user';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _alertLogout() {
    this.props.dispatch(
      showAlert({
        title: 'Atention!',
        body: {
          text: 'Do you want to exit the app?',
        },
        buttons: [
          {
            text: 'Get out',
            primary: true,
            onPress: () => this.props.dispatch(doLogout()),
          },
          {
            text: 'Cancel',
          },
        ],
      }),
    );
  }

  _getAvatar() {
    const words = 'TA';
    if (words.length > 1) {
      return `${words[0].substring(0, 1)}${words[1].substring(0, 1)}`;
    } else {
      return words[0].substring(0, 2);
    }
  }

  render() {
    return (
      <VViewContainer
        options={{
          topBar: {
            hideBackButton: true,
            animated: false,
            title: {
              text: 'My account',
            },
          },
        }}>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: '#222',
                marginBottom: 20,
                marginTop: 30,
              }}>
              <VText style={{fontSize: 30}} medium>
                {this._getAvatar()}
              </VText>
            </View>

            <View>
              <VText style={{fontSize: 22, color: '#555'}}>Teste Apple</VText>
            </View>
          </View>

          <View style={{padding: 20, marginTop: 10}}>
            <TouchableOpacity
              activeOpacity={0.65}
              onPress={() => this._alertLogout()}
              style={{marginBottom: 15}}>
              <View
                style={{
                  backgroundColor: '#f2f2f2',
                  opacity: 0.8,
                  borderRadius: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: '#ddd',
                  paddingVertical: 15,
                  paddingLeft: 15,
                }}>
                <VIcon
                  name="exitRun"
                  style={{color: '#555', marginRight: 10}}
                />
                <VText style={{flex: 1, fontSize: 16, color: '#555'}}>
                  Get out
                </VText>

                <VIcon
                  name="chevronRight"
                  size={15}
                  style={{color: '#555', marginRight: 15}}
                />
              </View>
            </TouchableOpacity>
          </View>

          <VText style={{textAlign: 'center', fontSize: 12, color: '#555'}}>
            Version: 1.0.0
          </VText>
        </ScrollView>
      </VViewContainer>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    user: user.current,
  };
};

export const ProfileScreenConnected = connect(mapStateToProps)(ProfileScreen);
