import React from 'react';
import { COLORS } from '@constants/colors';
import { GradientButton, GradientButtonProps } from './Gradient';

export const PrimaryButton = (props: GradientButtonProps) => {
  const {
    colors = [COLORS.blue500, COLORS.blue600],
    start = { x: 0.5, y: 0 },
    end = { x: 0.5, y: 1 },
    locations = [0, 1],
    ...restProps
  } = props;
  return (
    <GradientButton
      colors={colors}
      start={start}
      end={end}
      locations={locations}
      {...restProps}
    />
  );
};