import React from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';

import {VText} from '~/components';
import EStyleSheet from 'react-native-extended-stylesheet';

export const VButton = ({
  title,
  onPress = () => {},
  isLoading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled}>
      <View style={[styles.container, disabled && {opacity: 0.5}]}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <VText style={{fontSize: 18, color: '#222'}} bold>
            {title}
          </VText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e01e69',
    borderRadius: '$borderRadius',
  },
});
