import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './Icon.types';
import { COLORS } from '@constants/colors';

export function ShareIcon(props: IconProps) {
  const { scale = 1, color = COLORS.neutral0 } = props;
  const width = 14,
    height = 16;
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      style={{ transform: [{ scale }] }}
    >
      <Path
        d="M12.75 7.25C13.1297 7.25 13.4435 7.53215 13.4932 7.89823L13.5 8V13.25C13.5 14.7125 12.3583 15.9084 10.9175 15.995L10.75 16H3.25C1.78747 16 0.591596 14.8583 0.505019 13.4175L0.5 13.25V8C0.5 7.58579 0.835786 7.25 1.25 7.25C1.6297 7.25 1.94349 7.53215 1.99315 7.89823L2 8V13.25C2 13.8972 2.49187 14.4295 3.12219 14.4935L3.25 14.5H10.75C11.3972 14.5 11.9295 14.0081 11.9935 13.3778L12 13.25V8C12 7.58579 12.3358 7.25 12.75 7.25ZM2.22703 4.46231L6.46967 0.21967C6.73594 -0.0465967 7.1526 -0.0708026 7.44621 0.147052L7.53033 0.21967L11.773 4.46231C12.0659 4.7552 12.0659 5.23008 11.773 5.52297C11.5067 5.78924 11.09 5.81344 10.7964 5.59559L10.7123 5.52297L7.75 2.56V10.25C7.75 10.6297 7.46785 10.9435 7.10177 10.9932L7 11C6.6203 11 6.30651 10.7178 6.25685 10.3518L6.25 10.25V2.56L3.28769 5.52297C3.02142 5.78924 2.60476 5.81344 2.31115 5.59559L2.22703 5.52297C1.96076 5.2567 1.93656 4.84004 2.15441 4.54643L2.22703 4.46231L6.46967 0.21967L2.22703 4.46231Z"
        fill={color}
      />
    </Svg>
  );
}
