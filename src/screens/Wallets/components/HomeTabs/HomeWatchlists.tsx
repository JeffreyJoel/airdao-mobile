import React from 'react';
import { useWatchlist } from '@hooks';
import { View } from 'react-native';
import { Button, Spacer, Spinner } from '@components/base';
import { useNavigation } from '@react-navigation/native';
import { PortfolioNavigationProp } from '@appTypes';
import { styles } from '@screens/Wallets/components/HomeTabs/styles';
import { WalletItem, LocalizedRenderEmpty } from '@components/templates';
import { ExplorerAccount } from '@models';
import { verticalScale } from '@utils/scaling';
import { useAllAddressesContext } from '@contexts';
import { sortListByKey } from '@utils/sort';

const ITEM_COUNT = 4;

export const HomeWatchlists = () => {
  const { watchlist } = useWatchlist();
  const { addressesLoading } = useAllAddressesContext((v) => v);

  const navigation = useNavigation<PortfolioNavigationProp>();

  if (watchlist.length === 0) {
    return <LocalizedRenderEmpty text={'no.addresses.yet'} />;
  }

  const navigateToAddressDetails = (item: ExplorerAccount) => {
    return navigation.navigate('Address', { address: item.address });
  };

  if (addressesLoading) {
    return (
      <View style={styles.loading}>
        <Spinner />
      </View>
    );
  }

  return (
    <View style={styles.homeWatchlistsContainer} testID="Home_Watchlists">
      {sortListByKey(watchlist, 'ambBalance', 'desc')
        .slice(0, ITEM_COUNT)
        .map((item, index) => {
          return (
            <View key={item._id}>
              <Button onPress={() => navigateToAddressDetails(item)}>
                <WalletItem item={item} indicatorVisible={true} />
              </Button>
              {index !== ITEM_COUNT - 1 && <Spacer value={verticalScale(24)} />}
            </View>
          );
        })}
    </View>
  );
};
