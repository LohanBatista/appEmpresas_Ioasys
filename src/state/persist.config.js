import AsyncStorage from '@react-native-community/async-storage';

// AsyncStorage.clear();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 0,
  whitelist: ['user'],
};

export default persistConfig;
