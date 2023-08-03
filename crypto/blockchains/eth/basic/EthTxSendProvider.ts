/**
 * @author Ksu
 * @version 0.32
 */
import { AirDAOBlockchainTypes } from '../../AirDAOBlockchainTypes';
import AirDAOCryptoLog from '../../../common/AirDAOCryptoLog';
import BlocksoftUtils from '../../../common/AirDAOUtils';
import EthTmpDS from '../stores/EthTmpDS';
import EthRawDS from '../stores/EthRawDS';
import BlocksoftExternalSettings from '../../../common/AirDAOExternalSettings';
import AirDAOAxios from '../../../common/AirDAOAxios';

export default class EthTxSendProvider {
  private _web3: any;
  private _trezorServerCode: any;
  private _trezorServer: any;
  private _settings: any;
  private _mainCurrencyCode: string;
  private _mainChainId: any;

  constructor(
    web3: any,
    trezorServerCode: any,
    mainCurrencyCode: string,
    mainChainId: any,
    settings: any
  ) {
    this._web3 = web3;
    this._trezorServerCode = trezorServerCode;
    this._trezorServer = 'to_load';
    this._settings = settings;

    this._mainCurrencyCode = mainCurrencyCode;
    this._mainChainId = mainChainId;
  }

  async sign(
    tx: AirDAOBlockchainTypes.EthTx,
    privateData: AirDAOBlockchainTypes.TransferPrivateData,
    txRBF: any,
    logData: any
  ): Promise<{ transactionHash: string; transactionJson: any }> {
    // @ts-ignore
    await AirDAOCryptoLog.log(
      this._settings.currencyCode + ' EthTxSendProvider._innerSign started',
      logData
    );
    // noinspection JSUnresolvedVariable
    if (privateData.privateKey.substr(0, 2) !== '0x') {
      privateData.privateKey = '0x' + privateData.privateKey;
    }
    if (tx.value.toString().substr(0, 1) === '-') {
      throw new Error('SERVER_RESPONSE_NOTHING_LEFT_FOR_FEE');
    }
    // noinspection JSUnresolvedVariable
    if (this._mainChainId) {
      tx.chainId = this._mainChainId;
    }
    let signData = false;
    try {
      signData = await this._web3.eth.accounts.signTransaction(
        tx,
        privateData.privateKey
      );
    } catch (e) {
      throw new Error(
        this._settings.currencyCode +
          ' EthTxSendProvider._innerSign signTransaction error ' +
          e.message
      );
    }
    return signData.rawTransaction;
  }

  async send(
    tx: AirDAOBlockchainTypes.EthTx,
    privateData: AirDAOBlockchainTypes.TransferPrivateData,
    txRBF: any,
    logData: any
  ): Promise<{ transactionHash: string; transactionJson: any }> {
    // @ts-ignore
    await AirDAOCryptoLog.log(
      this._settings.currencyCode + ' EthTxSendProvider._innerSendTx started',
      logData
    );

    const rawTransaction = await this.sign(tx, privateData, txRBF, logData);

    // @ts-ignore
    await AirDAOCryptoLog.log(
      this._settings.currencyCode + ' EthTxSendProvider._innerSendTx signed',
      tx
    );
    await AirDAOCryptoLog.log(
      this._settings.currencyCode + ' EthTxSendProvider._innerSendTx hex',
      rawTransaction
    );

    let link = BlocksoftExternalSettings.getStatic(
      this._trezorServerCode + '_SEND_LINK'
    );
    if (!link || link === '') {
      if (this._trezorServerCode) {
        if (this._trezorServerCode === 'TRX') {
          link = this._trezorServerCode;
        } else if (this._trezorServerCode.indexOf('http') === -1) {
          this._trezorServer = await BlocksoftExternalSettings.getTrezorServer(
            this._trezorServerCode,
            'ETH.Send.sendTx'
          );
          link = this._trezorServer + '/api/v2/sendtx/';
        }
      } else {
        link = this._trezorServerCode; // actually is direct url like link = 'https://dex.binance.org/api/v1/broadcast'
      }
    }

    // const { apiEndpoints } = config.proxy;
    // const baseURL = MarketingEvent.DATA.LOG_TESTER
    //   ? apiEndpoints.baseURLTest
    //   : apiEndpoints.baseURL;
    // const proxy = baseURL + '/send/checktx';
    // const errorProxy = baseURL + '/send/errortx';
    // const successProxy = baseURL + '/send/sendtx';
    let checkResult = false;
    try {
      // await AirDAOCryptoLog.log(
      //   this._settings.currencyCode +
      //     ' EthTxSendProvider.send proxy checkResult start ' +
      //     proxy,
      //   logData
      // );
      // checkResult = await AirDAOAxios.post(proxy, {
      //   raw: rawTransaction,
      //   txRBF,
      //   logData,
      //   marketingData: MarketingEvent.DATA
      // });
    } catch (e) {
      await AirDAOCryptoLog.log(
        this._settings.currencyCode +
          ' EthTxSendProvider.send proxy error checkResult ' +
          e.message
      );
    }

    if (checkResult !== false) {
      if (typeof checkResult.data !== 'undefined') {
        await AirDAOCryptoLog.log(
          this._settings.currencyCode +
            ' EthTxSendProvider.send proxy checkResult1 ',
          checkResult.data
        );
        if (
          typeof checkResult.data.status === 'undefined' ||
          checkResult.data.status === 'error'
        ) {
          checkResult = false;
        } else if (checkResult.data.status === 'notice') {
          throw new Error(checkResult.data.msg);
        }
      } else {
        await AirDAOCryptoLog.log(
          this._settings.currencyCode +
            ' EthTxSendProvider.send proxy checkResult2 ',
          checkResult
        );
      }
    } else {
    }
    logData.checkResult =
      checkResult && typeof checkResult.data !== 'undefined' && checkResult.data
        ? JSON.parse(JSON.stringify(checkResult.data))
        : false;

    await AirDAOCryptoLog.log(
      this._settings.currencyCode + ' EthTxSendProvider.send will send'
    );
    let result;
    let sendLink;
    try {
      if (
        this._mainCurrencyCode === 'MATIC' ||
        this._mainCurrencyCode === 'FTM' ||
        !link
      ) {
        /**
         * curl http://matic.trusteeglobal.com:8545 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0x..."],"id":83}'
         */
        await AirDAOCryptoLog.log(
          this._settings.currencyCode +
            ' EthTxSendProvider.send sendSignedTransaction to ' +
            this._web3.LINK,
          rawTransaction
        );
        sendLink = this._web3.LINK;
        const tmp = await AirDAOAxios.postWithoutBraking(sendLink, {
          jsonrpc: '2.0',
          method: 'eth_sendRawTransaction',
          params: [rawTransaction],
          id: 1
        });
        await AirDAOCryptoLog.log(
          this._settings.currencyCode +
            ' EthTxSendProvider.send sendSignedTransaction to ' +
            this._web3.LINK +
            ' result ',
          tmp
        );
        if (!tmp || typeof tmp.data === 'undefined') {
          throw new Error('SERVER_RESPONSE_NOT_CONNECTED');
        }
        if (typeof tmp.data.error !== 'undefined' && tmp.data.error) {
          throw new Error(
            typeof tmp.data.error.message !== 'undefined'
              ? tmp.data.error.message
              : tmp.data.error
          );
        }
        result = {
          data: {
            result:
              typeof tmp.data.result !== 'undefined' ? tmp.data.result : false
          }
        };
      } else if (this._mainCurrencyCode === 'BNB') {
        /**
         * {"blockHash": "0x01d48fd5de1ebb62275096f749acb6849bd97f3c050acb07358222cea0a527bc",
         * "blockNumber": 5223318, "contractAddress": null,
         * "cumulativeGasUsed": 14465279, "from": "0xf1cff704c6e6ce459e3e1544a9533cccbdad7b99",
         * "gasUsed": 21000, "logs": [],
         * "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
         * "status": true, "to": "0xf1cff704c6e6ce459e3e1544a9533cccbdad7b99", "transactionHash": "0x1fa5646517b625d422863e6c27082104e1697543a6f912421527bb171c6173f2", "transactionIndex": 95}
         */
        await AirDAOCryptoLog.log(
          this._settings.currencyCode +
            ' EthTxSendProvider.send sendSignedTransaction ',
          rawTransaction
        );
        sendLink = this._web3.LINK;
        const tmp = await this._web3.eth.sendSignedTransaction(rawTransaction);
        result = {
          data: {
            result:
              typeof tmp.transactionHash !== 'undefined'
                ? tmp.transactionHash
                : false
          }
        };
      } else {
        sendLink = link;
        await AirDAOCryptoLog.log(
          this._settings.currencyCode + ' EthTxSendProvider.send post ',
          rawTransaction
        );
        result = await AirDAOAxios.post(sendLink, rawTransaction);
      }
      // @ts-ignore
      await AirDAOCryptoLog.log(
        this._settings.currencyCode + ' EthTxSendProvider.send result ',
        typeof result !== 'undefined' && result ? result.data : 'NO RESULT'
      );
    } catch (e) {
      try {
        // logData.error = e.message;
        // await AirDAOCryptoLog.log(
        //   this._settings.currencyCode +
        //     ' EthTxSendProvider.send proxy errorTx start ' +
        //     errorProxy,
        //   logData
        // );
        // const res2 = await AirDAOAxios.post(errorProxy, {
        //   raw: rawTransaction,
        //   txRBF,
        //   logData,
        //   marketingData: MarketingEvent.DATA
        // });
        // await AirDAOCryptoLog.log(
        //   this._settings.currencyCode + ' EthTxSendProvider.send proxy errorTx',
        //   typeof res2.data !== 'undefined' ? res2.data : res2
        // );
        // throw new Error('res2.data : ' + res2.data);
      } catch (e2) {
        await AirDAOCryptoLog.log(
          this._settings.currencyCode +
            ' EthTxSendProvider.send proxy error errorTx ' +
            e2.message
        );
      }
      if (
        this._settings.currencyCode !== 'ETH' &&
        this._settings.currencyCode !== 'ETH_ROPSTEN' &&
        e.message.indexOf('bad-txns-in-belowout') !== -1
      ) {
        throw new Error('SERVER_RESPONSE_NOT_ENOUGH_FEE');
      } else if (e.message.indexOf('dust') !== -1) {
        throw new Error('SERVER_RESPONSE_NOT_ENOUGH_AMOUNT_AS_DUST');
      } else if (
        e.message.indexOf('bad-txns-inputs-spent') !== -1 ||
        e.message.indexOf('txn-mempool-conflict') !== -1
      ) {
        throw new Error('SERVER_RESPONSE_NO_RESPONSE');
      } else if (
        e.message.indexOf('min relay fee not met') !== -1 ||
        e.message.indexOf('fee for relay') !== -1 ||
        e.message.indexOf('insufficient priority') !== -1
      ) {
        throw new Error('SERVER_RESPONSE_NOT_ENOUGH_AMOUNT_AS_FEE');
      } else if (
        e.message.indexOf('insufficient fee, rejecting replacement') !== -1
      ) {
        if (
          this._settings.currencyCode !== 'ETH' &&
          this._settings.currencyCode !== 'ETH_ROPSTEN'
        ) {
          throw new Error(
            'SERVER_RESPONSE_NOT_ENOUGH_AMOUNT_AS_FEE_FOR_REPLACEMENT'
          );
        } else {
          throw new Error('UI_CONFIRM_CHANGE_AMOUNT_FOR_REPLACEMENT');
        }
      } else if (e.message.indexOf('too-long-mempool-chain') !== -1) {
        throw new Error('SERVER_RESPONSE_NO_RESPONSE');
      } else {
        await BlocksoftExternalSettings.setTrezorServerInvalid(
          this._trezorServerCode,
          this._trezorServer
        );
        e.message += ' link: ' + link;
        throw e;
      }
    }

    // @ts-ignore
    if (typeof result.data.result === 'undefined' || !result.data.result) {
      throw new Error('SERVER_RESPONSE_NOT_CONNECTED');
    }

    // @ts-ignore
    const transactionHash = result.data.result;
    if (transactionHash === '') {
      throw new Error('SERVER_RESPONSE_BAD_CODE');
    }

    checkResult = false;
    try {
      // logData.txHash = transactionHash;
      // await AirDAOCryptoLog.log(
      //   this._settings.currencyCode +
      //     ' EthTxSendProvider.send proxy successTx start ' +
      //     successProxy,
      //   logData
      // );
      // checkResult = await AirDAOAxios.post(successProxy, {
      //   raw: rawTransaction,
      //   txRBF,
      //   logData,
      //   marketingData: MarketingEvent.DATA
      // });
    } catch (e3) {
      await AirDAOCryptoLog.log(
        this._settings.currencyCode +
          ' EthTxSendProvider.send proxy error successTx ' +
          e3.message
      );
    }

    if (checkResult !== false) {
      if (typeof checkResult.data !== 'undefined') {
        await AirDAOCryptoLog.log(
          this._settings.currencyCode +
            ' EthTxSendProvider.send proxy successResult1 ',
          checkResult.data
        );
        if (
          typeof checkResult.data.status === 'undefined' ||
          checkResult.data.status === 'error'
        ) {
          checkResult = false;
        } else if (checkResult.data.status === 'notice') {
          throw new Error(checkResult.data.msg);
        }
      } else {
        await AirDAOCryptoLog.log(
          this._settings.currencyCode +
            ' EthTxSendProvider.send proxy successResult2 ',
          checkResult
        );
      }
    } else {
    }
    logData.successResult =
      checkResult && typeof checkResult.data !== 'undefined' && checkResult.data
        ? JSON.parse(JSON.stringify(checkResult.data))
        : false;
    logData.txRBF = txRBF;

    const nonce =
      typeof logData.setNonce !== 'undefined'
        ? logData.setNonce
        : BlocksoftUtils.hexToDecimal(tx.nonce);

    const transactionJson = {
      nonce,
      gasPrice:
        typeof logData.gasPrice !== 'undefined'
          ? logData.gasPrice
          : BlocksoftUtils.hexToDecimal(tx.gasPrice)
    };

    await EthRawDS.saveRaw({
      address: tx.from,
      currencyCode: this._settings.currencyCode,
      transactionUnique: tx.from + '_' + nonce,
      transactionHash,
      transactionRaw: rawTransaction,
      transactionLog: logData
    });

    AirDAOCryptoLog.log(
      this._settings.currencyCode +
        ' EthTxSendProvider.send save nonce ' +
        nonce +
        ' from ' +
        tx.from +
        ' ' +
        transactionHash
    );
    await EthTmpDS.saveNonce(
      this._mainCurrencyCode,
      tx.from,
      'send_' + transactionHash,
      nonce
    );

    return { transactionHash, transactionJson };
  }
}
