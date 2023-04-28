import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { IconProps } from '@components/svg/icons';

export function WalletsActiveIcon(props: IconProps) {
  const { scale = 1, color = '#457EFF' } = props;
  const width = 24;
  const height = 24;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ transform: [{ scale }] }}
      fill="none"
    >
      <Path
        d="M0 3.25C0 1.73122 1.23122 0.5 2.75 0.5H16.25C17.7688 0.5 19 1.73122 19 3.25V4.50822C20.9544 4.63698 22.4998 6.26302 22.4998 8.25V18.7501C22.4998 20.8211 20.8208 22.5001 18.7498 22.5001H3.75391C1.68284 22.5001 0.00390625 20.8211 0.00390625 18.7501V8.25H0V3.5H0.0112108C0.00379065 3.41766 0 3.33427 0 3.25ZM17.5 3.25C17.5 2.55964 16.9404 2 16.25 2H2.75C2.05964 2 1.5 2.55964 1.5 3.25C1.5 3.94036 2.05964 4.5 2.75 4.5H17.5V3.25ZM15.75 13.5C15.3358 13.5 15 13.8358 15 14.25C15 14.6642 15.3358 15 15.75 15H18.25C18.6642 15 19 14.6642 19 14.25C19 13.8358 18.6642 13.5 18.25 13.5H15.75Z"
        fill={color}
      />
    </Svg>
  );
}
