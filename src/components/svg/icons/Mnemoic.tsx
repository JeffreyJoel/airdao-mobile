import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { IconProps } from './Icon.types';
import { COLORS } from '@constants/colors';

export function MnemonicIcon(props: IconProps) {
  const { scale = 1, color = COLORS.neutral300 } = props;
  const width = 108;
  const height = 86;
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      style={{ transform: [{ scale }] }}
    >
      <Path
        d="M64.65 51.181a8.081 8.081 0 100-16.162 8.081 8.081 0 000 16.162zM0 20.203C0 9.045 9.045 0 20.203 0h67.344c11.158 0 20.203 9.045 20.203 20.203v45.794c0 11.158-9.045 20.203-20.203 20.203H20.203C9.045 86.2 0 77.155 0 65.997V20.203zm20.203-4.04a4.04 4.04 0 00-4.04 4.04v45.794a4.04 4.04 0 108.08 0V20.203a4.04 4.04 0 00-4.04-4.04zm29.795 6.57a4.04 4.04 0 10-5.715 5.715l6.442 6.442a16.087 16.087 0 00-2.238 8.21c0 2.997.816 5.804 2.238 8.21l-6.442 6.442a4.04 4.04 0 105.715 5.715l6.442-6.442a16.087 16.087 0 008.21 2.238c2.997 0 5.804-.816 8.21-2.238l6.442 6.442a4.04 4.04 0 105.714-5.715l-6.441-6.442a16.087 16.087 0 002.237-8.21c0-2.997-.815-5.804-2.237-8.21l6.441-6.442a4.04 4.04 0 10-5.714-5.715l-6.442 6.442a16.087 16.087 0 00-8.21-2.238c-2.997 0-5.804.816-8.21 2.238l-6.442-6.442z"
        fill={color}
      />
    </Svg>
  );
}
