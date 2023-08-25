import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Row, Spacer, Spinner, Text } from '@components/base';
import { Header } from '@components/composite';
import { useAddWalletContext } from '@contexts';
import { scale, verticalScale } from '@utils/scaling';
import { COLORS } from '@constants/colors';
import { WalletUtils } from '@utils/wallet';
import { useNavigation } from '@react-navigation/native';
import { AddWalletStackNavigationProp } from '@appTypes/navigation/add-wallet';
import { useTranslation } from 'react-i18next';

export const CreateWalletStep2 = () => {
  const navigation = useNavigation<AddWalletStackNavigationProp>();
  const { walletMnemonic } = useAddWalletContext();
  const { t } = useTranslation();
  const [walletMnemonicSelected, setWalletMnemonicSelected] = useState<
    string[]
  >([]);
  const [loading] = useState<boolean>(false);
  const [isMnemonicCorrect, setIsMnemonicCorrect] = useState<boolean>(false);

  const walletMnemonicArrayDefault = walletMnemonic.split(' ');
  const walletMnemonicRandomSorted = useMemo(
    () => walletMnemonicArrayDefault.sort(() => 0.5 - Math.random()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletMnemonicArrayDefault.length]
  );

  const validateMnemonicOrder = () => {
    setIsMnemonicCorrect(
      JSON.stringify(walletMnemonicSelected) ===
        JSON.stringify(walletMnemonicArrayDefault)
    );
  };

  const numColumns = Math.ceil(walletMnemonicArrayDefault.length / 4);

  let globalWordIndex = 0;

  const renderWord = useMemo(
    () => (word: string, flow: 'inner' | 'mnemonic', index: number) => {
      globalWordIndex++;
      const selectedIdx = walletMnemonicSelected.indexOf(word);
      const isCorrect =
        walletMnemonicArrayDefault.indexOf(word) === selectedIdx;

      const onPress = () => {
        if (selectedIdx > -1) {
          walletMnemonicSelected.splice(selectedIdx, 1);
        } else {
          walletMnemonicSelected.push(word);
        }
        setWalletMnemonicSelected([...walletMnemonicSelected]);
        validateMnemonicOrder();
      };

      const buttonTextColorInner = selectedIdx !== -1 ? '#A1A6B2' : COLORS.nero;

      const buttonTextColorMnemonic = isCorrect
        ? COLORS.jungleGreen
        : walletMnemonicSelected.includes(word)
        ? COLORS.crimsonRed
        : COLORS.nero;

      let countDisplay = null;

      if (flow === 'mnemonic' && selectedIdx !== -1) {
        countDisplay = (
          <Text
            align="center"
            fontFamily="Inter_600SemiBold"
            fontSize={12}
            color={COLORS.nero}
            key={`count-display-${globalWordIndex}`}
          >
            {globalWordIndex}.
          </Text>
        );
      }

      return (
        <React.Fragment key={`word-${globalWordIndex}`}>
          <Button
            key={word}
            style={{
              backgroundColor:
                selectedIdx !== -1 && flow === 'mnemonic'
                  ? 'transparent'
                  : '#E6E6E6',
              borderRadius: 48,
              width: scale(98)
            }}
            onPress={onPress}
            disabled={selectedIdx !== -1 && flow === 'inner'}
          >
            <Text
              align="center"
              fontFamily="Inter_600SemiBold"
              fontSize={12}
              color={
                flow === 'mnemonic'
                  ? buttonTextColorMnemonic
                  : buttonTextColorInner
              }
              style={{ marginHorizontal: scale(15), marginVertical: scale(8) }}
            >
              {countDisplay} {''}
              {word}
            </Text>
          </Button>
          <Spacer value={verticalScale(20)} />
        </React.Fragment>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletMnemonicSelected, walletMnemonicArrayDefault]
  );

  const handleVerifyPress = useCallback(async () => {
    if (walletMnemonicSelected.length !== walletMnemonicArrayDefault.length) {
      return;
    }
    const isMnemonicValid =
      JSON.stringify(walletMnemonicSelected) ===
      JSON.stringify(walletMnemonicArrayDefault);

    if (!isMnemonicValid) {
      return;
    }

    const isOrderCorrect = walletMnemonicSelected.every(
      (word, index) => word === walletMnemonicArrayDefault[index]
    );

    if (!isOrderCorrect) {
      return;
    }

    try {
      // @ts-ignore
      const { address } = await WalletUtils.processWallet({
        number: 0,
        mnemonic: walletMnemonic,
        name: ''
      });
      console.log(address);
      navigation.navigate('SuccessBackupComplete');
    } catch (error) {
      console.log(error, 'error');
    }
  }, [
    navigation,
    walletMnemonic,
    walletMnemonicArrayDefault,
    walletMnemonicSelected
  ]);

  return (
    <SafeAreaView edges={['top']} style={styles.createWalletStep2Container}>
      <Header style={styles.header} />
      <Text
        align="center"
        fontSize={24}
        fontFamily="Inter_700Bold"
        color={COLORS.nero}
      >
        {t('double.check')}
      </Text>
      <Spacer value={verticalScale(12)} />
      <Text
        align="center"
        fontSize={15}
        fontFamily="Inter_500Medium"
        color={COLORS.nero}
      >
        {t('tap.words.in.correct.order')}
      </Text>
      <Spacer value={verticalScale(24)} />
      <View style={styles.mnemoicContainer}>
        {Array.isArray(walletMnemonicSelected) && (
          <Row style={styles.words}>
            {Array.from({ length: numColumns }, (_, columnIndex) => (
              <View
                key={columnIndex}
                style={{
                  width: '33%',
                  alignItems: 'center',
                  flex: 1
                }}
              >
                {walletMnemonicSelected
                  .slice(columnIndex * 4, (columnIndex + 1) * 4)
                  .map((word, wordIndex) =>
                    renderWord(word, 'mnemonic', wordIndex)
                  )}
              </View>
            ))}
          </Row>
        )}
      </View>
      <Spacer value={verticalScale(24)} />
      {loading && <Spinner size="large" />}
      <View style={styles.innerContainer}>
        <Spacer value={verticalScale(36)} />
        {Array.isArray(walletMnemonicRandomSorted) && (
          <Row style={styles.words}>
            {Array.from({ length: numColumns }, (_, columnIndex) => (
              <View key={columnIndex} style={styles.column}>
                {walletMnemonicRandomSorted
                  .slice(columnIndex * 4, (columnIndex + 1) * 4)
                  .map((word, wordIndex) =>
                    renderWord(word, 'inner', wordIndex)
                  )}
              </View>
            ))}
          </Row>
        )}
        <Spacer value={verticalScale(12)} />
      </View>
      <Button
        disabled={!isMnemonicCorrect}
        onPress={handleVerifyPress}
        type="circular"
        style={{
          backgroundColor: isMnemonicCorrect
            ? COLORS.mainBlue
            : COLORS.neutralGray,
          marginBottom: scale(44),
          width: '90%',
          alignSelf: 'center'
        }}
      >
        <Text
          fontSize={16}
          fontFamily="Inter_600SemiBold"
          color={isMnemonicCorrect ? COLORS.white : '#0E0E0E4D'}
          style={{ marginVertical: scale(12) }}
        >
          {t('verify.btn')}
        </Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  createWalletStep2Container: {
    flex: 1
  },
  header: {
    shadowColor: 'transparent'
  },
  word: {
    backgroundColor: '#E6E6E6',
    borderRadius: 48
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
    alignItems: 'center',
    alignSelf: 'center'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  words: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    rowGap: scale(16),
    columnGap: verticalScale(16),
    flexDirection: 'row'
  },
  mnemoicContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    borderColor: COLORS.gray100,
    borderWidth: 2,
    backgroundColor: COLORS.charcoal,
    width: '90%',
    height: verticalScale(232),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20)
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%'
  }
});
