import React, { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { BottomSheetRef, CheckBox } from '@components/composite';
import { Button, Input, Row, Spacer, Text } from '@components/base';
import { ChevronRightIcon, PlusIcon } from '@components/svg/icons';
import { scale, verticalScale } from '@utils/scaling';
import { BottomSheetCreateRenameGroup } from '../BottomSheetCreateRenameGroup';
import { useLists } from '@contexts/ListsContext';
import { AddWalletToList } from '../AddWalletToList';
import { BottomSheetWithHeader } from '@components/modular';
import { ListsOfAddressesGroupType } from '@appTypes/ListsOfAddressGroup';
import { useFullscreenModalHeight } from '@hooks';
import { Cache, CacheKey } from '@utils/cache';
import { ExplorerAccount } from '@models/Explorer';
import { styles } from './styles';

interface EditWalletProps {
  wallet: ExplorerAccount;
  name: string;
  isPersonalAddress: boolean;
  onNameChange: (newName: string) => unknown;
  onIsPersonalAddressChange: (newFlag: boolean) => unknown;
}

export const EditWallet = (props: EditWalletProps): JSX.Element => {
  const {
    wallet,
    name,
    isPersonalAddress,
    onIsPersonalAddressChange,
    onNameChange
  } = props;
  const {
    listsOfAddressGroup,
    setListsOfAddressGroup,
    handleOnCreate,
    createGroupRef
  } = useLists((v) => v);
  const fullscreenModalHeight = useFullscreenModalHeight();
  const [localLists, setLocalLists] = useState(listsOfAddressGroup);

  const selectedLists = listsOfAddressGroup.filter(
    (list) =>
      list.listOfAddresses.findIndex(
        (address) => address.addressId === wallet.address
      ) > -1
  );

  const selectedListText = useMemo(() => {
    if (selectedLists.length === 0) return 'None';
    if (selectedLists.length === 1) return selectedLists[0].groupTitle;
    return `${selectedLists.length} lists`;
  }, [selectedLists]);

  const addToListModal = useRef<BottomSheetRef>(null);
  const showCreateNewListModal = () => {
    createGroupRef.current?.show();
  };

  const showAddToListModal = () => {
    addToListModal.current?.show();
  };

  const hideAddToListModal = () => {
    addToListModal.current?.dismiss();
  };

  const saveNewLists = async () => {
    // TODO refactor lists and use lists context
    setListsOfAddressGroup(localLists);
    await Cache.setItem(CacheKey.AddressLists, localLists);
    hideAddToListModal();
  };

  const onPressListItem = (list: ListsOfAddressesGroupType) => {
    const listFromLocalLists = localLists.find(
      (l) => l.groupId === list.groupId
    );
    if (!listFromLocalLists) return;
    const idx = listFromLocalLists.listOfAddresses.findIndex(
      (address) => address.addressId === wallet.address
    );
    if (idx > -1) {
      listFromLocalLists.listOfAddresses.splice(idx, 1);
      listFromLocalLists.addressesCount--;
    } else {
      listFromLocalLists.listOfAddresses.push({
        addressId: wallet.address,
        addressTitle: wallet.name,
        addressToken: wallet.ambBalance.toString(),
        addressPrice: '',
        addressProgress: ''
      });
      listFromLocalLists.addressesCount++;
    }
    setLocalLists([...localLists]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text title color="#222222" fontFamily="Inter_600SemiBold">
          Address name
        </Text>
        <Spacer value={verticalScale(8)} />
        <Input
          placeholder="Placeholder"
          style={styles.input}
          value={name}
          onChangeValue={onNameChange}
        />
        <Spacer value={24} />
        <Button onPress={() => onIsPersonalAddressChange(!isPersonalAddress)}>
          <Row alignItems="center">
            <CheckBox
              type="square"
              value={isPersonalAddress}
              fillColor="#646464"
              color="#FFFFFF"
            />
            <Spacer horizontal value={12} />
            <Text title color="#162C5D" fontFamily="Inter_600SemiBold">
              This is my peronal Address
            </Text>
          </Row>
        </Button>
        <Spacer value={12} />
        <Text
          fontWeight="400"
          color="#646464"
          fontSize={12}
          fontFamily="Inter_600SemiBold"
        >
          {'Personal Addresses will be added to “My Addresses” by default'}
        </Text>
        <Spacer value={verticalScale(64)} />
        <Text fontSize={20} fontFamily="Inter_700Bold">
          Add to Lists
        </Text>
        <Spacer value={verticalScale(12)} />
        <Button onPress={showAddToListModal}>
          <Row alignItems="center" justifyContent="space-between">
            <Text title fontFamily="Inter_600SemiBold">
              Select list
            </Text>
            <Row alignItems="center">
              <Text
                fontFamily="Inter_600SemiBold"
                fontSize={13}
                color="#828282"
              >
                {selectedListText}
              </Text>
              <Spacer horizontal value={scale(12)} />
              <ChevronRightIcon color="#828282" />
            </Row>
          </Row>
        </Button>
        <Spacer value={verticalScale(32)} />
        <Button
          type="circular"
          style={styles.newListButton}
          onPress={showCreateNewListModal}
        >
          <Row alignItems="center">
            <PlusIcon color="#000000" />
            <Text title fontFamily="Inter_600SemiBold">
              {'  '}
              Create new list
            </Text>
          </Row>
        </Button>
      </View>
      <BottomSheetCreateRenameGroup
        ref={createGroupRef}
        type="create"
        handleOnCreateGroup={handleOnCreate}
      />
      <BottomSheetWithHeader
        ref={addToListModal}
        height={fullscreenModalHeight}
        title="Add to lists"
        actionTitle="Save"
        onActionPress={saveNewLists}
      >
        <AddWalletToList
          wallet={wallet}
          lists={localLists}
          onPressList={onPressListItem}
        />
      </BottomSheetWithHeader>
    </View>
  );
};
