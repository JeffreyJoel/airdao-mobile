import React from 'react';
import { ClipPath, Defs, G, Mask, Path, Rect, Svg } from 'react-native-svg';
import { IconProps } from './Icon.types';
import { COLORS } from '@constants/colors';

export function USDCoinLogo(props: IconProps) {
  const { scale = 1, color = '#2775CA' } = props;
  const width = 33;
  const height = 33;
  const color2 = COLORS.neutral0;
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      style={{ transform: [{ scale }] }}
    >
      <G clip-path="url(#clip0_1395_6199)">
        <Mask
          id="mask0_1395_6199"
          // style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="33"
          height="33"
        >
          <Path d="M32.5 0.5H0.5V32.5H32.5V0.5Z" fill={color2} />
        </Mask>
        <G mask="url(#mask0_1395_6199)">
          <Path
            d="M16.5 32.5C25.3667 32.5 32.5 25.3667 32.5 16.5C32.5 7.63328 25.3667 0.5 16.5 0.5C7.63328 0.5 0.5 7.63328 0.5 16.5C0.5 25.3667 7.63328 32.5 16.5 32.5Z"
            fill={color}
          />
          <Path
            d="M20.9001 19.0333C20.9001 16.7 19.5001 15.9 16.7001 15.5668C14.7001 15.3 14.3001 14.7668 14.3001 13.8333C14.3001 12.8999 14.9668 12.3 16.3001 12.3C17.5001 12.3 18.1668 12.7 18.5001 13.7C18.5668 13.9 18.7668 14.0333 18.9668 14.0333H20.0333C20.3001 14.0333 20.5001 13.8333 20.5001 13.5667V13.5C20.2333 12.0333 19.0333 10.9 17.5001 10.7667V9.16674C17.5001 8.90002 17.3001 8.70002 16.9668 8.6333H15.9668C15.7001 8.6333 15.5001 8.8333 15.4333 9.16674V10.7C13.4334 10.9667 12.1668 12.3 12.1668 13.9668C12.1668 16.1668 13.5001 17.0333 16.3001 17.3668C18.1668 17.7 18.7668 18.1 18.7668 19.1668C18.7668 20.2334 17.8333 20.9668 16.5668 20.9668C14.8333 20.9668 14.2333 20.2333 14.0333 19.2333C13.9668 18.9668 13.7668 18.8333 13.5668 18.8333H12.4334C12.1668 18.8333 11.9668 19.0333 11.9668 19.3V19.3668C12.2334 21.0333 13.3001 22.2333 15.5001 22.5668V24.1668C15.5001 24.4333 15.7001 24.6333 16.0333 24.7H17.0333C17.3001 24.7 17.5001 24.5 17.5668 24.1668V22.5668C19.5668 22.2333 20.9001 20.8333 20.9001 19.0333Z"
            fill={color2}
          />
          <Path
            d="M13.1003 26.033C7.90032 24.1665 5.2336 18.3665 7.16704 13.2331C8.16704 10.4331 10.367 8.29978 13.1003 7.29978C13.367 7.1665 13.5003 6.9665 13.5003 6.63306V5.69978C13.5003 5.43306 13.367 5.23306 13.1003 5.1665C13.0336 5.1665 12.9003 5.1665 12.8336 5.23306C6.50032 7.23306 3.0336 13.9665 5.0336 20.2998C6.2336 24.033 9.10032 26.8998 12.8336 28.0998C13.1003 28.233 13.367 28.0998 13.4336 27.833C13.5003 27.7665 13.5003 27.6998 13.5003 27.5665V26.633C13.5003 26.433 13.3003 26.1665 13.1003 26.033ZM20.167 5.23306C19.9003 5.09978 19.6337 5.23306 19.567 5.49978C19.5003 5.5665 19.5003 5.63306 19.5003 5.7665V6.69978C19.5003 6.9665 19.7003 7.23306 19.9003 7.3665C25.1003 9.23306 27.767 15.033 25.8337 20.1665C24.8337 22.9665 22.6337 25.0998 19.9003 26.0998C19.6337 26.233 19.5003 26.433 19.5003 26.7665V27.6998C19.5003 27.9665 19.6337 28.1665 19.9003 28.233C19.967 28.233 20.1003 28.233 20.167 28.1665C26.5003 26.1665 29.967 19.433 27.967 13.0998C26.767 9.29978 23.8337 6.43306 20.167 5.23306Z"
            fill={color2}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_1395_6199">
          <Rect
            width="32"
            height="32"
            fill={color2}
            transform="translate(0.5 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
