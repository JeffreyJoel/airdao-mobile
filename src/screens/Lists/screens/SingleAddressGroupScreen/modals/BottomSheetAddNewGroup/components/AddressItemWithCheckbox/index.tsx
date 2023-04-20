import React from 'react';
import { Spacer } from '@components/base';
import { View } from 'react-native';
import { styles } from '../../styles';
import { CheckBox } from '@components/base/CheckBox';
import { ExplorerAccount } from '@models/Explorer';
import { WalletItem } from '@components/templates';

type Props = {
  item: ExplorerAccount;
  idsOfSelectedAddresses: string[];
  handleCheckBoxPress: (id: string) => void;
};
export const AddressItemWithCheckbox = ({
  item,
  idsOfSelectedAddresses,
  handleCheckBoxPress
}: Props) => {
  const { address } = item;
  return (
    <>
      <Spacer value={29} />
      <View style={styles.itemContainer}>
        <View style={styles.checkboxPadding}>
          <CheckBox
            onPress={() => handleCheckBoxPress(address)}
            isChecked={idsOfSelectedAddresses.includes(address)}
          />
        </View>
        <WalletItem item={item} />
      </View>
    </>
  );
};
