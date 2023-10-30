import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { RotateTransform } from 'react-native';
import { IconProps } from '@components/svg/icons';
import { COLORS } from '@constants/colors';
import { moderateScale } from '@utils/scaling';

export function ChevronDownIcon(
  props: IconProps & {
    rotate?: RotateTransform['rotate'];
  }
) {
  const { color = COLORS.brand500, rotate = '0deg' } = props;
  const width = moderateScale(24),
    height = moderateScale(24);
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={{ transform: [{ rotate }] }}
    >
      <Path
        d="M4.293 8.293a1 1 0 011.414 0L12 14.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
        fill={color}
      />
    </Svg>
  );
}
