import React, { FC, useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { Spacer } from '@components/base/Spacer';
import { Button, Text } from '@components/base';
import { OptionsIcon } from '@components/svg/icons/Options';
import { BottomSheetRef } from '@components/composite/BottomSheet/BottomSheet.types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@navigation/stacks/RootStack';
import { useLists } from '@contexts/ListsContext';
import { BottomSheetCreateRenameGroup } from '@components/templates/BottomSheetCreateRenameGroup';
import { styles } from './styles';
import { BottomSheetSingleGroupOption } from '@screens/Lists/components/BottomSheetGroupAction';
import { AccountList } from '@models/AccountList';
import { NumberUtils } from '@utils/number';
import { BottomSheetConfirmRemoveGroup } from '@screens/Lists/components/BottomSheetConfirmRemoveGroup';

type Props = {
  group: AccountList;
};

export const GroupItem: FC<Props> = ({ group }) => {
  const { handleOnDelete, handleOnRename } = useLists((v) => v);
  const groupItemActionRef = useRef<BottomSheetRef>(null);
  const groupRenameRef = useRef<BottomSheetRef>(null);
  const groupDeleteRef = useRef<BottomSheetRef>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const handleOpenSingleGroupOption = useCallback(() => {
    groupItemActionRef.current?.show();
  }, []);

  const handleOpenRenameModal = useCallback(() => {
    groupItemActionRef.current?.dismiss();
    setTimeout(() => {
      groupRenameRef.current?.show();
    }, 900);
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    groupItemActionRef.current?.dismiss();
    setTimeout(() => {
      groupDeleteRef.current?.show();
    }, 900);
  }, []);

  const handleItemPress = () => {
    navigation.navigate('SingleAddressGroup', {
      group
    });
  };

  const tokensFormatted = useMemo(() => {
    const formattedNumber = NumberUtils.formatNumber(group.totalBalance, 0);
    return `$${formattedNumber} (${formattedNumber} AMB)`;
  }, [group.totalBalance]);

  const handleRemoveConfirm = (groupId: string) => {
    handleOnDelete(groupId);
    groupDeleteRef.current?.dismiss();
  };

  return (
    <>
      <Button type="base" onPress={handleItemPress}>
        <View style={styles.container}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{group.name}</Text>
            <Spacer value={4} />
            <View style={styles.itemSubInfo}>
              <Text style={styles.walletsCount}>
                {group.accountCount + ' addresses'}
              </Text>
              <Text style={styles.tokensCount}>{tokensFormatted}</Text>
            </View>
          </View>
          <Button
            style={styles.optionButton}
            type="base"
            onPress={handleOpenSingleGroupOption}
          >
            <OptionsIcon />
          </Button>
          <BottomSheetSingleGroupOption
            handleOnDeleteButtonPress={handleOpenDeleteModal}
            item={group}
            ref={groupItemActionRef}
            handleOnRenameButtonPress={handleOpenRenameModal}
            type="rename"
          />
          <BottomSheetConfirmRemoveGroup
            handleOnDeleteConfirm={handleRemoveConfirm}
            item={group}
            groupId={group.id}
            ref={groupDeleteRef}
          />
        </View>
      </Button>
      <BottomSheetCreateRenameGroup
        type="rename"
        groupId={group.id}
        groupTitle={group.name}
        handleOnRenameGroup={handleOnRename}
        ref={groupRenameRef}
      />
    </>
  );
};
