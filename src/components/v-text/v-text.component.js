import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const VText = (props) => {
  return (
    <Text
      ellipsizeMode="tail"
      {...props}
      style={[
        styles.text,
        props.style,
        props.medium && {fontFamily: 'Montserrat-Medium'},
        props.bold && {fontFamily: 'Montserrat-Bold'},
        props.black && {fontFamily: 'Montserrat-Black'},
      ]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#ccc',
    fontFamily: 'Montserrat',
  },
});
