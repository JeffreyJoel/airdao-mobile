/**
 * @version 0.20
 */
import { AirDAOBlockchainTypes } from '../../AirDAOBlockchainTypes';
import BtcUnspentsProvider from '../providers/BtcUnspentsProvider';
import DogeTxInputsOutputs from '../../doge/tx/DogeTxInputsOutputs';
import AirDAOCryptoLog from '../../../common/AirDAOCryptoLog';
import DaemonCache from '../../../../src/daemons/DaemonCache';
import BlocksoftDict from '@crypto/common/BlocksoftDict';
import { Database } from '@database';

export default class BtcTxInputsOutputs
  extends DogeTxInputsOutputs
  implements AirDAOBlockchainTypes.TxInputsOutputs
{
  async _addressForChange(
    data: AirDAOBlockchainTypes.TransferData
  ): Promise<string> {
    const btcShowTwoAddress = await Database.localStorage.get(
      'btcShowTwoAddress'
    );
    const btcLegacyOrSegwit = await Database.localStorage.get(
      'btc_legacy_or_segwit'
    );

    const mainCurrencyCode =
      this._settings.currencyCode === 'LTC' ? 'LTC' : 'BTC';
    const legacyPrefix =
      BlocksoftDict.Currencies[mainCurrencyCode].addressPrefix;
    const segwitPrefix =
      BlocksoftDict.CurrenciesForTests[mainCurrencyCode + '_SEGWIT']
        .addressPrefix;

    let needFindSegwit = true;
    if (btcShowTwoAddress === '1' || data.useLegacy === 1) {
      // @todo as btcShowTwoAddress this will be deprecated simplify the code
      // its only for wallets with old setting of two addresses where there was useLegacy on
      // console.log('will legacy')
      needFindSegwit = false;
    } else if (btcShowTwoAddress === '1' || btcLegacyOrSegwit === 'segwit') {
      needFindSegwit = true;
    } else if (btcLegacyOrSegwit === 'legacy') {
      needFindSegwit = false;
      // console.log('will legacy 2')
    }

    AirDAOCryptoLog.log(
      'BtcTxInputsOutputs needFindSegwit ' + JSON.stringify(needFindSegwit)
    );
    try {
      const CACHE_FOR_CHANGE = await BtcUnspentsProvider.getCache(
        data.walletHash,
        this._settings.currencyCode
      );
      AirDAOCryptoLog.log(
        'BtcTxInputsOutputs CACHE_FOR_CHANGE ' + data.walletHash,
        CACHE_FOR_CHANGE
      );

      let addressForChange = false;
      if (needFindSegwit) {
        addressForChange = CACHE_FOR_CHANGE[segwitPrefix];
      } else {
        addressForChange = CACHE_FOR_CHANGE[legacyPrefix];
      }
      // @ts-ignore
      AirDAOCryptoLog.log(
        this._settings.currencyCode +
          ' ' +
          mainCurrencyCode +
          ' BtcTxInputsOutputs _addressForChange addressForChange logic ',
        {
          needFindSegwit,
          addressForChange,
          CACHE: CACHE_FOR_CHANGE
        }
      );
      if (addressForChange && addressForChange !== '') {
        return addressForChange;
      }
    } catch (e) {
      AirDAOCryptoLog.err(
        this._settings.currencyCode +
          ' ' +
          mainCurrencyCode +
          ' BtcTxInputsOutputs _addressForChange error ' +
          e.message
      );
    }

    return data.addressFrom;
  }

  async getInputsOutputs(
    data: AirDAOBlockchainTypes.TransferData,
    unspents: AirDAOBlockchainTypes.UnspentTx[],
    feeToCount: {
      feeForByte?: string;
      feeForAll?: string;
      autoFeeLimitReadable?: string | number;
    },
    additionalData: AirDAOBlockchainTypes.TransferAdditionalData,
    subtitle = 'default'
  ): Promise<AirDAOBlockchainTypes.PreparedInputsOutputsTx> {
    const res = await super._getInputsOutputs(
      data,
      unspents,
      feeToCount,
      additionalData,
      subtitle + ' btced'
    );

    if (this._settings.currencyCode !== 'BTC') {
      return res;
    }

    const tmp = DaemonCache.getCacheAccountStatic(data.walletHash, 'USDT');
    if (tmp.balance === '0' || tmp.balance === 0) {
      return res;
    }

    let usdtCount = 0;
    for (const unspent of unspents) {
      if (unspent.address === tmp.address) {
        usdtCount++;
      }
    }
    if (usdtCount === 0) {
      res.outputs.push({
        to: tmp.address,
        amount: '546',
        isChange: true,
        logType: 'FOR_LEGACY_USDT_KEEP_FROM_BTC'
      });
      return res;
    }

    let usdtUsed = 0;
    for (const input of res.inputs) {
      if (input.address === tmp.address) {
        usdtUsed++;
      }
    }
    AirDAOCryptoLog.log(
      'BtxTxInputsOutputs for ' +
        tmp.address +
        ' usdtUsed ' +
        usdtUsed +
        ' usdtCount ' +
        usdtCount
    );

    if (usdtUsed >= usdtCount) {
      let found = false;
      for (const input of res.inputs) {
        if (input.address === tmp.address && !found && input.value === '546') {
          input.value = '0';
          found = true;
        }
      }
      if (!found) {
        for (const input of res.inputs) {
          if (input.address === tmp.address) {
            res.outputs.push({
              to: tmp.address,
              amount: '546',
              isChange: true,
              logType: 'FOR_LEGACY_USDT_KEEP_FROM_BTC'
            });
            break;
          }
        }
      }

      if (found) {
        const inputs = [];
        for (const input of res.inputs) {
          if (input.value !== '0') {
            inputs.push(input);
          }
        }
        res.inputs = inputs;
      }
    }

    res.countedFor = 'BTC';

    return res;
  }
}
