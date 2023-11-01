import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Transaction } from '@models';
import { Row, Spacer, Text } from '@components/base';
import { scale, verticalScale } from '@utils/scaling';
import { COLORS } from '@constants/colors';
import { DownArrowIcon } from '@components/svg/icons';
import { StringUtils } from '@utils/string';
import { useUSDPrice } from '@hooks';
import { NumberUtils } from '@utils/number';
import { AirDAODictTypes } from '@crypto/common/AirDAODictTypes';
import { styles } from './styles';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = (props: TransactionItemProps): JSX.Element => {
  const { transaction } = props;
  const isSent = transaction.isSent;
  const { t } = useTranslation();
  const usdAmount = useUSDPrice(
    transaction.amount,
    transaction.value.symbol as AirDAODictTypes.Code.AMB
  );

  return (
    <View>
      <Row alignItems="center" justifyContent="space-between">
        <Row alignItems="center">
          <View
            style={[
              styles.icon,
              { transform: [{ rotate: isSent ? '180deg' : '0deg' }] }
            ]}
          >
            <DownArrowIcon color={COLORS.neutral900} />
          </View>
          <Spacer value={scale(8)} horizontal />
          <View>
            <Text
              fontSize={14}
              fontFamily="Inter_500Medium"
              color={COLORS.neutral900}
            >
              {isSent
                ? t('common.transaction.sent')
                : t('common.transaction.received')}
            </Text>
            <Spacer value={verticalScale(4)} />
            <Text
              fontSize={12}
              fontFamily="Inter_500Medium"
              color={COLORS.alphaBlack50}
            >
              {t('common.transaction.from')}{' '}
              {StringUtils.formatAddress(transaction.from, 5, 5)}
            </Text>
          </View>
        </Row>
        <View>
          <Text
            fontSize={14}
            align="right"
            fontFamily="Mersad_600SemiBold"
            color={COLORS.neutral900}
          >
            {NumberUtils.formatNumber(transaction.amount, 2)}{' '}
            {transaction.value.symbol}
          </Text>
          <Spacer value={verticalScale(4)} />
          <Text
            fontSize={12}
            align="right"
            fontFamily="Inter_500Medium"
            color={COLORS.alphaBlack50}
          >
            ${NumberUtils.formatNumber(usdAmount, 2)}
          </Text>
        </View>
      </Row>
    </View>
  );
};
