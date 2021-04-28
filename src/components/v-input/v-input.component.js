import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {VText, VIcon} from '~/components';
import * as Animatable from 'react-native-animatable';

export class VInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actived: false,
      text: '',
      valid: true,
      showErrors: false,
      message: '',
      showPassword: false,
    };
  }

  _change(text) {
    this.setState({showErrors: false});

    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  }

  render() {
    const {meta, small} = this.props;
    const error = !meta?.valid && meta?.submitFailed;

    return (
      <View style={{marginBottom: this.props.noMargin ? 0 : 20}}>
        {this.props.label ? (
          <View style={{paddingBottom: 10}}>
            <VText style={[{color: '#555'}, small && {fontSize: 14}]} medium>
              {this.props.label}
            </VText>
          </View>
        ) : null}

        <View
          style={[styles.inputWrapper, error ? styles.inputWrapperError : {}]}>
          <TextInput
            {...this.props}
            {...this.props.input}
            error={error}
            ref={this.props.refName}
            style={[
              styles.input,
              error ? styles.inputError : {},
              this.props.password && {paddingRight: 30},
              this.props.style,
              small && {height: 40, paddingHorizontal: 10},
            ]}
            autoCorrect={false}
            autoCapitalize={this.props.autoCapitalize || 'none'}
            editable={!this.props.disabled}
            secureTextEntry={this.props.password && !this.state.showPassword}
            maxLength={this.props.maxLength}
            keyboardType={this.props.keyboardType}
            onChangeText={(text) => this._change(text)}
            placeholderTextColor={'#555'}
            underlineColorAndroid={'transparent'}
          />
          {error ? (
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
                paddingVertical: 0,
                borderRadius: 4,
              }}>
              <VText style={{color: '#fff', fontSize: 12}}>
                {meta.error || 'Campo obrigatório'}
              </VText>
            </Animatable.View>
          ) : null}
          {this.props.password ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                top: 0,
                right: 0,
                paddingLeft: 10,
                paddingRight: 10,
                justifyContent: 'center',
              }}
              onPress={() =>
                this.setState({showPassword: !this.state.showPassword})
              }>
              <VIcon
                name={this.state.showPassword ? 'eye-off' : 'eye'}
                size={18}
                style={{color: '#999'}}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#444',
    height: 48,
    fontSize: 16,
    padding: 0,
    borderWidth: 1,
    color: '#fff',
    borderColor: '#666',
    borderRadius: 4,
    paddingHorizontal: 15,
    fontFamily: 'Montserrat-Medium',
  },
});
