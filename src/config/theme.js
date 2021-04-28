import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Cores base
 */

const PRIMARY_COLOR = '#FFBB00';
const PRIMARY_COLOR_HOVER = '#D99500';
const SECONDARY_COLOR = '#43404e';
const TERNARY_COLOR = '#ffffff';
const TEXT_COLOR = '#555';
const BLACK = '#000000';
const WHITE = '#ffffff';
const SUCCESS = '#78A668';

/**
 * EXPORT
 */
export class ConfigTheme {
  static build() {
    EStyleSheet.build({
      $defaultTextColor: TEXT_COLOR,
      $borderRadius: 4,
      $colors: {
        black: BLACK,
        white: WHITE,
        primary: PRIMARY_COLOR,
        primaryHover: PRIMARY_COLOR_HOVER,
        secondary: SECONDARY_COLOR,
        ternary: TERNARY_COLOR,
        success: SUCCESS,
      },
    });
  }
}
