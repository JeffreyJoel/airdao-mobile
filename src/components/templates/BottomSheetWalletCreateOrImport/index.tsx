import React, { ForwardedRef, forwardRef } from 'react';
import {
  BottomSheet,
  BottomSheetProps,
  BottomSheetRef
} from '@components/composite';
import { View } from 'react-native';
import { Button, Spacer, Text } from '@components/base';
import { useForwardedRef } from '@hooks';
import { scale, verticalScale } from '@utils/scaling';
import { COLORS } from '@constants/colors';
import { PrimaryButton } from '@components/modular';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { HomeNavigationProp } from '@appTypes';

export const BottomSheetWalletCreateOrImport = forwardRef<
  BottomSheetRef,
  BottomSheetProps
>((props, ref) => {
  const localRef: ForwardedRef<BottomSheetRef> = useForwardedRef(ref);
  const navigation = useNavigation<HomeNavigationProp>();
  const { t } = useTranslation();

  const navigateToWalletCreate = () => {
    navigation.navigate('CreateWalletStep0');
    localRef.current?.dismiss();
  };

  return (
    <BottomSheet ref={localRef} swiperIconVisible height={verticalScale(225)}>
      <View style={{ paddingHorizontal: scale(16) }}>
        <Spacer value={verticalScale(16)} />
        <Text
          align="center"
          fontFamily="Inter_700Bold"
          fontSize={20}
          color={COLORS.nero}
        >
          {t('add.wallet')}
        </Text>
        <Spacer value={verticalScale(16)} />
        <PrimaryButton onPress={navigateToWalletCreate}>
          <Text fontFamily="Inter_500Medium" fontSize={16} color={COLORS.white}>
            {t('create.new.wallet')}
          </Text>
        </PrimaryButton>
        <Spacer value={verticalScale(16)} />
        <Button type="circular" style={{ backgroundColor: COLORS.charcoal }}>
          <Text
            align="center"
            fontFamily="Inter_500Medium"
            fontSize={16}
            color={COLORS.nero}
            style={{ marginVertical: scale(12) }}
          >
            {t('import.existing.wallet')}
          </Text>
        </Button>
      </View>
    </BottomSheet>
  );
});
