import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Row, Spacer, Text } from '@components/base';
import { scale, verticalScale } from '@utils/scaling';
import { COLORS } from '@constants/colors';
import { styles } from '@components/templates/WalletTransactionsAndAssets/WalletAssets/SingleAsset/styles';
import { useAMBPrice, useUSDPrice } from '@hooks';
import { NumberUtils } from '@utils/number';
import { PercentChange } from '@components/composite';
import {
  EthereumLogo,
  AirDAOTokenLogo,
  TetherLogo,
  BUSDLogo,
  USDCoinLogo,
  UndefinedTokenLogo
} from '@components/svg/icons';
import { TokenDTO } from '@models';

interface SingleAssetProps {
  token: TokenDTO;
}

export const SingleAsset = (props: SingleAssetProps): JSX.Element => {
  const { token } = props;
  const { name, balance, symbol } = token;
  const usdPrice = useUSDPrice(balance.ether);
  const { data: ambTokenData } = useAMBPrice();

  const logoComponent = useMemo(() => {
    switch (name) {
      case 'AirDAO':
        return <AirDAOTokenLogo />;
      case 'Ethereum':
        return <EthereumLogo />;
      case 'BUSD':
        return <BUSDLogo />;
      case 'USDCoin':
        return <USDCoinLogo />;
      case 'Tether':
        return <TetherLogo />;
      case '':
        return <UndefinedTokenLogo />;
      default:
        return <AirDAOTokenLogo />;
    }
  }, [name]);

  return (
    <View style={styles.container}>
      <Row>
        {logoComponent}
        <Spacer horizontal value={scale(8)} />
        <View style={styles.item}>
          <Row justifyContent="space-between">
            <Text
              fontFamily="Inter_500Medium"
              fontSize={16}
              color={COLORS.neutral800}
            >
              {name || 'NULL'}
            </Text>
            <Text
              fontFamily="Mersad_600SemiBold"
              fontSize={16}
              color={COLORS.neutral800}
            >
              ${NumberUtils.formatNumber(usdPrice, 2)}
            </Text>
          </Row>
          <Spacer horizontal value={scale(8)} />
          <Row justifyContent="space-between">
            <Text
              fontFamily="Inter_500Medium"
              fontSize={14}
              color={COLORS.neutral400}
            >
              {NumberUtils.formatNumber(balance.ether, 2)} {symbol}
            </Text>
            <Text
              fontFamily="Inter_400Regular"
              fontSize={14}
              color={COLORS.neutral800}
            >
              {name === 'AMB' ? (
                <View style={{ paddingTop: verticalScale(3) }}>
                  <PercentChange
                    change={ambTokenData?.percentChange24H || 0}
                    fontSize={14}
                  />
                </View>
              ) : (
                ''
              )}
            </Text>
          </Row>
        </View>
      </Row>
    </View>
  );
};
