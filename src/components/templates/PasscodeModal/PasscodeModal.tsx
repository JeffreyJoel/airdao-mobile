import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { KeyboardDismissingView, Spacer, Text } from '@components/base';
import { COLORS } from '@constants/colors';
import { Alert, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Passcode } from '@components/base/Passcode/Passcode';
import {
  BottomSheet,
  BottomSheetProps,
  BottomSheetRef
} from '@components/composite';
import { useAppState, useForwardedRef } from '@hooks';
import { verticalScale } from '@utils/scaling';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '@components/templates/PasscodeModal/styles';
import { useTranslation } from 'react-i18next';
import * as LocalAuthentication from 'expo-local-authentication';
import { PrimaryButton } from '@components/modular';
import usePasscode from '@contexts/Passcode';

interface PasscodeModalProps {
  isPasscodeEnabled: boolean;
  isFaceIDEnabled: boolean;
}

export const PasscodeModal = forwardRef<
  BottomSheetRef,
  BottomSheetProps & PasscodeModalProps
>((props, ref) => {
  const localRef: ForwardedRef<BottomSheetRef> = useForwardedRef(ref);
  const { top, bottom } = useSafeAreaInsets();
  const { prevState } = useAppState();
  const { t } = useTranslation();
  const { savedPasscode, isFaceIDEnabled } = usePasscode();

  const [faceIDAuthRes, setFaceIDAuthRes] = useState<boolean>(true);

  const handlePasscode = (typedPasscode: string[]) => {
    if (typedPasscode.length === 4) {
      if (JSON.stringify(savedPasscode) === JSON.stringify(typedPasscode)) {
        localRef.current?.dismiss();
      } else {
        Alert.alert(t('passcode.doesnt.match'), t('please.try.again'), [
          {
            text: t('try.again'),
            onPress: () => null,
            style: 'cancel'
          }
        ]);
      }
    }
  };

  const authenticateWithFaceID = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t('authenticate.with.face.id'),
        fallbackLabel: t('enter.pin')
      });
      if (result.success) {
        setFaceIDAuthRes(true);
        localRef.current?.dismiss();
      } else {
        setFaceIDAuthRes(false);
      }
    } catch (error) {
      setFaceIDAuthRes(false);
      console.error('Authentication error:', error);
    }
  };

  useEffect(() => {
    if (props.isFaceIDEnabled && prevState === 'background') {
      authenticateWithFaceID();
    }
    if (props.isFaceIDEnabled && prevState === null) {
      authenticateWithFaceID();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isFaceIDEnabled, localRef, prevState]);

  return (
    <BottomSheet
      swipingEnabled={false}
      ref={localRef}
      containerStyle={styles.container}
      height={Dimensions.get('screen').height}
    >
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={{
          top,
          flex: 1
        }}
      >
        <KeyboardDismissingView>
          <Text
            fontSize={24}
            fontFamily="Inter_700Bold"
            color={COLORS.neutral800}
            align="center"
            style={{ paddingTop: verticalScale(160) }}
          >
            {t('enter.your.passcode')}
          </Text>
          <Spacer value={verticalScale(24)} />
          <Passcode
            onPasscodeChange={handlePasscode}
            autoFocus={!isFaceIDEnabled}
            type="change"
          />
        </KeyboardDismissingView>
      </KeyboardAvoidingView>
      {!faceIDAuthRes ? (
        <KeyboardDismissingView>
          <PrimaryButton
            onPress={authenticateWithFaceID}
            style={{
              width: '90%',
              alignSelf: 'center',
              bottom
            }}
          >
            <Text
              align="center"
              fontFamily="Inter_500Medium"
              fontSize={16}
              color={COLORS.neutral0}
            >
              {t('sign.in.with.face.id')}
            </Text>
          </PrimaryButton>
        </KeyboardDismissingView>
      ) : (
        <></>
      )}
    </BottomSheet>
  );
});
