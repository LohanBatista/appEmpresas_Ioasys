import React, {PureComponent} from 'react';

import {
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Animated,
  TextInput,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {VText, VIcon} from '~/components';
import {connect} from 'react-redux';

import * as Animatable from 'react-native-animatable';

import {pop} from '~/navigation/core';

const {width, height} = Dimensions.get('screen');

class VAlert extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.alert.body?.selected,
      error: false,
      visible: true,
      marginTop: new Animated.Value(0),
      text: '',
    };
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
        this.state.marginTop, // The value to drive
        {
          toValue: -120,
          duration: 250,
          useNativeDriver: true,
        },
      ),
    ]).start();
    // this.setState({ marginTop: -90 });
    // alert('Keyboard Shown');
  }

  _keyboardDidHide() {
    Animated.parallel([
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

  close(button) {
    if (this.view && this.overlay) {
      this.view
        .animate(
          {
            0: {
              opacity: 1,
              translateY: 0,
              scale: 1,
            },
            0.9: {
              opacity: 1,
              translateY: 0,
              scale: 1.05,
            },
            1: {
              opacity: 0,
              translateY: 60,
              scale: 0.7,
            },
          },
          200,
        )
        .then(() => {
          const selected = this.props.alert.body?.input
            ? this.state.text
            : this.state.selected;
          this.setState({selected: '', error: false, visible: false});
          pop();
          if (button?.onPress) {
            button.dispatch
              ? this.props.dispatch(button.onPress(selected))
              : button.onPress(selected);
          }
        });
    } else {
      const selected = this.props.alert.body?.input
        ? this.state.text
        : this.state.selected;
      if (button?.onPress) {
        button.dispatch
          ? this.props.dispatch(button.onPress(selected))
          : button.onPress(selected);
      }

      this.setState({selected: '', error: false, visible: false});
      setTimeout(() => {
        pop();
      }, 200);
    }
  }

  renderOption({index}) {
    const num = index;
    return (
      <TouchableOpacity
        onPress={() => this.update(num)}
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          paddingHorizontal: 5,
          borderBottomWidth: index === 30 ? 0 : 1,
          borderColor: '#f1f1f1',
        }}>
        {this.props.product?.quantidade === num ? (
          <VText bold style={{flex: 1, color: '#555', fontSize: 18}}>
            {num}
          </VText>
        ) : (
          <VText style={{flex: 1, color: '#555', fontSize: 18}}>{num}</VText>
        )}

        <View
          style={{
            width: 28,
            height: 28,
            backgroundColor: '#rgba(0,0,0,0.07)',
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {this.props.product?.quantidade === num ? (
            <View
              style={{
                width: 14,
                height: 14,
                backgroundColor: '#fff',
                borderRadius: 4,
              }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }

  _onPress(button) {
    if (!button.onPress) {
      this.close(button);
    } else if (
      (this.props.alert.body?.options?.length && this.state.selected === '') ||
      (this.props.alert.body?.options?.length && this.state.selected < 0) ||
      (this.state.text?.length === 0 && this.props.alert.body?.input)
    ) {
      this.setState({error: true});
    } else {
      this.close(button);
    }
  }

  _setOption(index) {
    this.setState({selected: index, error: false});
  }

  render() {
    const alert = this.props.alert;

    return (
      <View
        style={{
          zIndex: 2001,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: 'transparent',
        }}>
        {this.state.visible ? (
          <Animated.View
            style={{
              transform: [{translateY: this.state.marginTop}],
              zIndex: 2,
            }}>
            <Animatable.View
              ref={(view) => (this.view = view)}
              animation={{
                0: {
                  opacity: 0,
                  translateY: 60,
                  scale: 0.7,
                },
                0.9: {
                  opacity: 1,
                  translateY: 0,
                  scale: 1.05,
                },
                1: {
                  opacity: 1,
                  translateY: 0,
                  scale: 1,
                },
              }}
              delay={100}
              duration={200}
              useNativeDriver
              style={{
                width: width * 0.9,
                maxWidth: 340,
                backgroundColor: '#f1f1f1',
                borderRadius: 4,
                zIndex: 2,
              }}>
              {alert.title ? (
                <View
                  style={{
                    paddingTop: 12,
                    paddingHorizontal: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <VText style={{color: '#555'}} bold>
                      {alert.title}
                    </VText>
                  </View>
                </View>
              ) : null}
              <Animatable.View
                animation="fadeIn"
                delay={200}
                duration={200}
                useNativeDriver>
                {alert.body?.component ? (
                  alert.body.component()
                ) : (
                  <View style={{padding: 20}}>
                    <View style={{flexDirection: 'row'}}>
                      <VText style={[{fontSize: 18, color: '#555'}]}>
                        {alert.body?.text}
                      </VText>
                    </View>
                    {alert.body?.input ? (
                      <View
                        style={{
                          paddingTop: 15,
                          paddingBottom: 15,
                          paddingRight: 15,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <VText
                          style={{color: '#999', fontSize: 18, marginRight: 6}}>
                          Troco para
                        </VText>
                        <TextInput
                          value={this.state.text}
                          onChangeText={(text) =>
                            this.setState({text, error: false})
                          }
                          autoCorrect={false}
                          placeholder="0"
                          autoFocus
                          placeholderTextColor="#ccc"
                          keyboardType="numeric"
                          style={{
                            height: 44,
                            backgroundColor: '#EFEFF4',
                            borderRadius: 4,
                            fontSize: 16,
                            width: 80,
                            color: '#555',
                            borderWidth: 1,
                            borderColor: '#EFEFF4',
                            paddingLeft: 15,
                            paddingRight: 15,
                            fontSize: 18,
                          }}
                        />
                        <VText
                          style={{color: '#999', fontSize: 18, marginLeft: 6}}>
                          {this.state.text === '1' ? 'real' : 'reais'}
                        </VText>
                      </View>
                    ) : null}
                    {alert.body?.options?.length ? (
                      <ScrollView
                        contentContainerStyle={{paddingTop: 10}}
                        style={{
                          height: alert.body?.height
                            ? alert.body?.height
                            : height * 0.5,
                          marginTop: 10,
                          paddingHorizontal: 20,
                          borderTopWidth: 1,
                          borderColor: '#555',
                          marginLeft: -20,
                          marginRight: -20,
                          backgroundColor: '#e2e2e2',
                          opacity: 0.8,
                        }}>
                        {alert.body.options.map((o, index) => {
                          return (
                            <>
                              <TouchableOpacity
                                onPress={() => this._setOption(index)}>
                                <View
                                  style={{
                                    paddingVertical: 16,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      width: 28,
                                      height: 28,
                                      backgroundColor: '#fff',
                                      borderRadius: 30,
                                      marginRight: 10,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    {index === this.state.selected ? (
                                      <View
                                        style={{
                                          width: 14,
                                          height: 14,
                                          backgroundColor: '#e01e69',
                                          borderRadius: 30,
                                        }}
                                      />
                                    ) : null}
                                  </View>
                                  <VText style={{flex: 1, color: '#555'}}>
                                    {o.label || o}
                                  </VText>
                                </View>
                              </TouchableOpacity>
                              {index + 1 !== alert.body.options.length ? (
                                <View
                                  style={{
                                    height: 1,
                                    backgroundColor: '#e2e2e2',
                                  }}
                                />
                              ) : null}
                            </>
                          );
                        })}
                      </ScrollView>
                    ) : null}

                    {this.state.error ? (
                      <Animatable.View
                        animation={{
                          0: {
                            opacity: 0,
                            translateX: 10,
                          },
                          1: {
                            opacity: 1,
                            translateX: 0,
                          },
                        }}
                        duration={500}
                        style={{
                          position: 'absolute',
                          bottom: -8,
                          right: 10,
                          backgroundColor: '#FF3838',
                          paddingHorizontal: 7,
                          paddingVertical: 1,
                          borderRadius: 4,
                        }}>
                        <VText style={{color: '#fff', fontSize: 12}}>
                          {'Campo obrigatório'}
                        </VText>
                      </Animatable.View>
                    ) : null}
                  </View>
                )}
                <View style={{padding: 15}}>
                  {alert.buttons?.map((button, index) => {
                    return (
                      <>
                        {index > 0 ? (
                          <View>
                            <View style={{height: 8}} />
                          </View>
                        ) : null}
                        <TouchableOpacity onPress={() => this._onPress(button)}>
                          <View
                            style={[
                              {
                                alignItems: 'center',
                                height: 44,
                                justifyContent: 'center',
                              },
                              button.bold && {
                                backgroundColor: 'transparent',
                                borderRadius: 4,
                              },
                              (this.state.selected === '' &&
                                this.props.alert.body?.options?.length) ||
                              (this.state.text?.length === 0 &&
                                alert.body?.input)
                                ? {opacity: 0.9}
                                : {opacity: 1},
                              button.primary && {
                                backgroundColor: '#e01e69',
                              },
                              {borderRadius: 4},
                            ]}>
                            <VText
                              medium={button.bold}
                              style={[
                                {color: '#555'},
                                {fontSize: 16},
                                button.bold && {color: '#222'},
                                button.primary && {color: '#222'},
                              ]}>
                              {button.text}
                            </VText>
                          </View>
                        </TouchableOpacity>
                      </>
                    );
                  })}
                </View>
              </Animatable.View>
            </Animatable.View>
          </Animated.View>
        ) : null}
        <Animatable.View
          ref={(overlay) => (this.overlay = overlay)}
          animation="fadeIn"
          duration={300}
          useNativeDriver
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.close()}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          />
        </Animatable.View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAlertVisible: state.alert.isAlertVisible,
    alert: state.alert.alert,
  };
};

export const VAlertConnected = connect(mapStateToProps)(VAlert);
