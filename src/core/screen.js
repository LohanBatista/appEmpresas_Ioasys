import { Dimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const MIN_WIDTH = 375;

export function isSmallDevice() {
  return WINDOW_WIDTH < MIN_WIDTH;
}
