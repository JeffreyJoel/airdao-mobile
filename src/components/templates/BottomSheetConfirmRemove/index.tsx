import React, { ForwardedRef, forwardRef, RefObject } from 'react';
import { BottomSheet, BottomSheetRef } from '@components/composite';
import { Button, Spacer, Text } from '@components/base';
import { useForwardedRef } from '@hooks';
import { View } from 'react-native';
import { styles } from '@components/templates/BottomSheetConfirmRemove/styles';
import { BottomSheetSwiperIcon } from '@components/svg/icons';
import { COLORS } from '@constants/colors';
import { useLists } from '@contexts';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CommonStackParamsList } from '@appTypes/navigation/common';

type Props = {
  ref: RefObject<BottomSheetRef>;
  address?: string;
  groupId: string;
};

export const BottomSheetConfirmRemove = forwardRef<BottomSheetRef, Props>(
  ({ address }, ref) => {
    const localRef: ForwardedRef<BottomSheetRef> = useForwardedRef(ref);
    const { handleOnDeleteAddressFromGroup } = useLists((v) => v);

    const {
      params: {
        group: { id: groupId }
      }
    } = useRoute<RouteProp<CommonStackParamsList, 'Collection'>>();

    const handleDeleteAddress = () => {
      handleOnDeleteAddressFromGroup(groupId, [address as string]);
    };

    return (
      <BottomSheet
        ref={localRef}
        height={375}
        isNestedSheet={true}
        testID="BottomSheet_Confirm_Remove"
      >
        <View>
          <View style={styles.icon}>
            <BottomSheetSwiperIcon />
          </View>
          <Spacer value={32} />
          <Text
            style={styles.text}
            fontFamily="Inter_600SemiBold"
            fontSize={20}
            color={COLORS.neutral900}
          >
            Are you sure want to remove selected {address} from Whales?
          </Text>
          <Spacer value={24} />
          <Button
            testID="BottomSheetConfirmRemove_Button"
            onPress={() => {
              handleDeleteAddress();
              localRef.current?.dismiss();
            }}
            style={styles.removeButton}
          >
            <Text
              fontFamily="Inter_600SemiBold"
              fontSize={16}
              color={COLORS.error400}
            >
              Remove
            </Text>
          </Button>
          <Spacer value={24} />
          <Button
            type="base"
            style={styles.bottomSheetCancelButton}
            onPress={() => localRef.current?.dismiss()}
          >
            <Text
              fontFamily="Inter_600SemiBold"
              color={COLORS.neutral900}
              fontSize={16}
            >
              Cancel
            </Text>
          </Button>
        </View>
      </BottomSheet>
    );
  }
);
