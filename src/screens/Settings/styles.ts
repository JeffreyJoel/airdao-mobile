import { COLORS } from '@constants/colors';
import { moderateScale, scale, verticalScale } from '@utils/scaling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(18)
  },
  innerContainer: {
    paddingTop: verticalScale(20),
    rowGap: verticalScale(16)
  },
  menuItem: {
    borderRadius: moderateScale(16),
    backgroundColor: COLORS.alphaBlack5,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16)
    // justifyContent: 'center',
    // height: verticalScale(56)
  }
});
