import { PixelRatio } from 'react-native';

export const colors = {
  darkest: '#000000',
};

export const spacings = {
  small: PixelRatio.getPixelSizeForLayoutSize(5),
};

export const fontSizes = {
  normal: PixelRatio.getFontScale() * 14,
  large: PixelRatio.getFontScale() * 20,
  huge: PixelRatio.getFontScale() * 47,
};

export const speedUnits: SpeedUnit[] = ['km/h', 'miles/h'];

export const speedLimits = {
  'km/h': ['50', '80', '110', '130'],
  'miles/h': ['35', '45', '65', '75'],
};

export const msToUnit = {
  ["km/h"]: 3.6,
  ["miles/h"]: 2.24,
};