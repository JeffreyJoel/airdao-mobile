import React from 'react';
import { FlatList, View } from 'react-native';
import { SingleAsset } from '@components/templates/WalletTransactionsAndAssets/WalletAssets/SingleAsset';
import { LocalizedRenderEmpty } from '@components/templates';
import { useNavigation } from '@react-navigation/native';
import { Spinner } from '@components/base';
import { useTranslation } from 'react-i18next';
import { HomeNavigationProp } from '@appTypes';
import { ExplorerAccount, TokenDTO } from '@models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { verticalScale } from '@utils/scaling';

interface WalletAssetsProps {
  tokens: TokenDTO[] | undefined;
  loading: boolean;
  error: boolean;
  account: ExplorerAccount;
}

export const WalletAssets = (props: WalletAssetsProps): JSX.Element => {
  const { tokens, loading, account, error } = props;
  const navigation = useNavigation<HomeNavigationProp>();

  const { t } = useTranslation();

  const navigateToAssetScreen = (
    tokenInfo: TokenDTO,
    walletAccount: string
  ) => {
    navigation.navigate('AssetScreen', { tokenInfo, walletAccount });
  };

  const renderToken = ({ item }: { item: TokenDTO }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToAssetScreen(item, account.address)}
      >
        <SingleAsset token={item} />
      </TouchableOpacity>
    );
  };

  const ambTokenData: TokenDTO[] = [
    {
      name: 'AMB',
      address: account.address,
      balance: { wei: '', ether: account.ambBalance },
      symbol: 'AMB'
    }
  ];

  const data = [...ambTokenData, ...(tokens || [])];

  return (
    <View style={{ flex: 1, paddingBottom: verticalScale(100) }}>
      {!data && error && loading ? (
        <LocalizedRenderEmpty text={t('no.assets.yet')} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderToken}
          ListFooterComponent={() => (loading ? <Spinner /> : <></>)}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
