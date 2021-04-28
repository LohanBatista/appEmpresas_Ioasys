import React from 'react';
import {View} from 'react-native';

export const VCard = ({children}) => {
  return (
    <View
      style={{
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 4,
      }}>
      {children}
    </View>
  );
};
