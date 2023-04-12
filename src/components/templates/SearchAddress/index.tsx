import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  View,
  useWindowDimensions
} from 'react-native';
import { WatchlistAddSuccess } from '../WatchlistAddSuccess';
import { ExplorerAccountView } from '../ExplorerAccount';
import { AccountTransactions } from '../ExplorerAccount/ExplorerAccount.Transactions';
import { BarcodeScanner } from '../BarcodeScanner';
import {
  Button,
  InputRef,
  KeyboardDismissingView,
  Row,
  Spacer,
  Spinner,
  Text
} from '@components/base';
import {
  BottomSheet,
  BottomSheetRef,
  InputWithIcon
} from '@components/composite';
import { CloseIcon, ScannerIcon, SearchIcon } from '@components/svg/icons';
import { scale, verticalScale } from '@utils/scaling';
import {
  useAMBPrice,
  useExplorerInfo,
  useSearchAccount,
  useTransactionsOfAccount,
  useWatchlist
} from '@hooks';
import { etherumAddressRegex } from '@constants/regex';
import { FloatButton } from '@components/base/FloatButton';
import { BottomSheetWithHeader } from '@components/modular';
import { styles } from './styles';

interface SearchAdressProps {
  onContentVisibilityChanged?: (contentVisible: boolean) => unknown;
}

const LIMIT = 10;

export const SearchAdress = (props: SearchAdressProps): JSX.Element => {
  const { onContentVisibilityChanged = () => null } = props;
  const { data: ambToken } = useAMBPrice();
  const { height: WINDOW_HEIGHT } = useWindowDimensions();
  const { data: explorerInfo } = useExplorerInfo();
  const [address, setAddress] = useState('');
  const initialMount = useRef(true);
  const {
    data: account,
    loading,
    error
  } = useSearchAccount(address, !initialMount.current && !!address);
  const {
    data: transactions,
    loading: transactionsLoading,
    fetchNextPage,
    hasNextPage
  } = useTransactionsOfAccount(address, 1, LIMIT, '', !!address);
  const { watchlist, addToWatchlist } = useWatchlist();

  const inputRef = useRef<InputRef>(null);
  const scannerModalRef = useRef<BottomSheetRef>(null);

  const successModal = useRef<BottomSheetRef>(null);

  const onInputFocused = () => {
    onContentVisibilityChanged(true);
  };

  const onInputBlur = () => {
    if (!account && !loading) {
      onContentVisibilityChanged(false);
    }
  };

  const onInputSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    initialMount.current = false;
    setAddress(e.nativeEvent.text);
  };

  const loadMoreTransactions = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const clearInput = () => {
    inputRef.current?.clear();
    setAddress('');
    onContentVisibilityChanged(false);
  };

  const showScanner = () => {
    scannerModalRef.current?.show();
  };

  const hideScanner = () => {
    scannerModalRef.current?.dismiss();
  };
  const onQRCodeScanned = (data: string) => {
    const res = data.match(etherumAddressRegex);
    if (res && res?.length > 0) {
      hideScanner();
      inputRef.current?.setText(res[0]);
      onContentVisibilityChanged(true);
      setTimeout(() => {
        initialMount.current = false;
        setAddress(res[0]);
      }, 500);
    } else {
      Alert.alert('Invalid QR Code');
    }
  };

  const trackAddress = async () => {
    if (account) {
      if (watchlist.findIndex((a) => a.addressId === account.address) > -1) {
        // TODO navigate to watchlist
        return;
      }
      if (ambToken) {
        await addToWatchlist({
          addressTitle: '',
          addressPrice: (account.ambBalance * ambToken.priceUSD).toString(),
          addressToken: account.ambBalance.toString(),
          addressProgress: '',
          addressId: address
        });
        showSuccessModal();
      }
    }
  };

  const hideSuccessModal = () => {
    successModal.current?.dismiss();
  };

  const showSuccessModal = () => {
    successModal.current?.show();
  };

  const addressInWatchlist = useMemo(() => {
    const idx = watchlist.findIndex((w) => w.addressId === address);
    if (idx > -1) return watchlist[idx];
    return null;
  }, [watchlist, address]);

  return (
    <>
      <KeyboardDismissingView>
        <Row
          alignItems="center"
          justifyContent="space-between"
          style={styles.top}
        >
          <InputWithIcon
            ref={inputRef}
            style={styles.input}
            iconLeft={<SearchIcon color="#2f2b4399" />}
            iconRight={
              <Button onPress={clearInput} style={{ zIndex: 1000 }}>
                <CloseIcon color="#2f2b4399" scale={0.75} />
              </Button>
            }
            placeholder={'Search public address'}
            returnKeyType="search"
            onFocus={onInputFocused}
            onBlur={onInputBlur}
            onSubmitEditing={onInputSubmit}
          />
          <Spacer value={scale(7.5)} horizontal />
          <Button onPress={showScanner} type="circular" style={styles.scanner}>
            <ScannerIcon color="#000000" />
          </Button>
        </Row>
      </KeyboardDismissingView>
      <BottomSheet height={WINDOW_HEIGHT} ref={scannerModalRef}>
        <BarcodeScanner onScanned={onQRCodeScanned} onClose={hideScanner} />
      </BottomSheet>
      {loading && !!address && <Spinner />}
      {error && !!address && (
        <View style={styles.error}>
          <Text>Could not find the address</Text>
        </View>
      )}
      {account && explorerInfo && (
        <View style={{ paddingBottom: '20%', flex: 1 }}>
          <Spacer value={verticalScale(22)} />
          <KeyboardDismissingView>
            <ExplorerAccountView
              account={account}
              totalSupply={explorerInfo.totalSupply}
            />
          </KeyboardDismissingView>
          <Spacer value={verticalScale(24)} />
          <View style={styles.divider} />
          <Spacer value={verticalScale(24)} />
          <AccountTransactions
            transactions={transactions}
            onEndReached={loadMoreTransactions}
            loading={transactionsLoading && !!address}
          />
          <FloatButton
            title={addressInWatchlist ? 'Go to watchlist' : 'Track Address'}
            icon={<></>}
            onPress={trackAddress}
          />
          <BottomSheetWithHeader ref={successModal} fullscreen title="">
            {ambToken && (
              <WatchlistAddSuccess
                onDone={hideSuccessModal}
                wallet={
                  addressInWatchlist || {
                    addressTitle: '',
                    addressPrice: (
                      account.ambBalance * ambToken.priceUSD
                    ).toString(),
                    addressToken: account.ambBalance.toString(),
                    addressProgress: '',
                    addressId: address
                  }
                }
              />
            )}
          </BottomSheetWithHeader>
        </View>
      )}
    </>
  );
};
