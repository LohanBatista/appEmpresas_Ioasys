import React, {Component} from 'react';
import {
  View,
  Image,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {VViewContainer, VInputForm, VButton} from '~/components';

import {reduxForm} from 'redux-form';

import {LOGO_HORIZONTAL_FRONT} from '~/assets';

import {doLogin} from '~/ducks/user';

import {request, PERMISSIONS} from 'react-native-permissions';

const validate = (value) => {
  if (!value) {
    return 'Required field';
  }
};

class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      marginTop: new Animated.Value(0),
      opacity: new Animated.Value(1),
    };

    request(PERMISSIONS.IOS.FACE_ID).then((result) => {});

    this.props.change('email', this.props.email);
    this.props.change('password', this.props.password);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => this._keyboardDidShow(),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => this._keyboardDidHide(),
    );
  }

  UNSAFE_componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    Animated.parallel([
      Animated.spring(
        this.state.opacity, // The value to drive
        {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        },
      ),
      Animated.spring(
        this.state.marginTop, // The value to drive
        {
          toValue: -120,
          duration: 250,
          useNativeDriver: true,
        },
      ),
    ]).start();
  }

  _keyboardDidHide() {
    Animated.parallel([
      Animated.spring(
        this.state.opacity, // The value to drive
        {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        },
      ),
      Animated.spring(
        this.state.marginTop, // The value to drive
        {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        },
      ),
    ]).start();
  }

  _handleSubmit(values) {
    this.props.dispatch(
      doLogin({email: values.email, password: values.password}),
    );
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <VViewContainer
        options={{
          topBar: {
            visible: false,
          },
        }}>
        <Animated.ScrollView
          style={{flex: 1, transform: [{translateY: this.state.marginTop}]}}
          keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, paddingTop: 40}}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag">
              <Animated.View
                style={{
                  paddingTop: 70,
                  opacity: this.state.opacity,
                  alignItems: 'center',
                  paddingBottom: 50,
                }}>
                <Image
                  source={LOGO_HORIZONTAL_FRONT}
                  style={{width: 280, height: 69, resizeMode: 'contain'}}
                />
              </Animated.View>

              <View style={{margin: 30, marginTop: 5}}>
                <VInputForm
                  name="email"
                  label="E-mail"
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  validate={validate}
                  style={{backgroundColor: '#f1f1f1', color: '#555'}}
                />

                <VInputForm
                  name="password"
                  password
                  label="Password"
                  placeholder="Enter your password"
                  validate={validate}
                  style={{backgroundColor: '#f1f1f1', color: '#555'}}
                />

                <View style={{marginTop: 5}}>
                  <VButton
                    onPress={handleSubmit((values) =>
                      this._handleSubmit(values),
                    )}
                    title="Sing in"
                    isLoading={this.props.isLoading}
                  />
                </View>
              </View>
              <KeyboardAvoidingView
                style={{flex: 1}}
                behavior="height"
                enabled
              />
            </ScrollView>
          </View>
        </Animated.ScrollView>
      </VViewContainer>
    );
  }
}

const mapStateToProps = ({user}) => ({
  email: user.email || '',
  password: user.password || '',
  isLoading: user.isLoading,
});

AuthScreen = connect(mapStateToProps)(AuthScreen);

export const AuthScreenConnected = reduxForm({
  form: 'login',
})(AuthScreen);
