import React, { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@constants/colors';
import { Text } from '@components/base';

type Props = {
  title: string;
  icon?: JSX.Element;
  onPress: () => void;
  bottomPadding?: number;
};

const DEFAULT_BOTTOM_TAB_HEIGHT = 65;

export const FloatButton = memo(
  ({ title, icon, onPress, bottomPadding }: Props) => {
    const bottomSafeArea = useSafeAreaInsets().bottom || 34;
    const bottomTabBarHeight =
      bottomPadding !== undefined ? bottomPadding : DEFAULT_BOTTOM_TAB_HEIGHT;
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.buttonStyle,
          {
            bottom: bottomTabBarHeight + bottomSafeArea
          }
        ]}
      >
        {icon}
        <Text style={styles.bottomButtonText}>{title}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: COLORS.deepBlue,
    borderRadius: 1000,
    justifyContent: 'center',
    width: '90%'
  },
  bottomButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    paddingVertical: 16,
    color: COLORS.white
  }
});
