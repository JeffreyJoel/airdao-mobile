import { WalletInitSource, WalletMetadata } from '@appTypes';
import { Wallet } from '@models/Wallet';
import { Crypto } from './crypto';
import { MnemonicUtils } from './mnemonics';
import AirDAOStorage from '@lib/helpers/AirDAOKeysStorage';

const _saveWallet = async (wallet: WalletMetadata) => {
  let storedKey = '';
  try {
    const prepared = {
      mnemonic: wallet.newMnemonic ? wallet.newMnemonic : wallet.mnemonic,
      hash: '?'
    };

    prepared.mnemonic = MnemonicUtils.recheckMnemonic(prepared.mnemonic);
    prepared.hash = await Crypto.hashMnemonic(prepared.mnemonic);

    const checkKey = await AirDAOStorage.isMnemonicAlreadySaved(prepared);
    if (checkKey) {
      // @misha should we do something or ui is enough
    }
    storedKey = await AirDAOStorage.saveMnemonic(prepared);
  } catch (e) {}
  return storedKey;
};

const addressToToken = (address: string) => {
  // any algo could be used to "hide" actual address
  return Buffer.from(address).toString('base64').slice(3, 11);
};

const _getWalletName = async () => {
  // TODO
  return 'AirDAO Wallet';
};

const processWallet = async (
  data: Pick<WalletMetadata, 'mnemonic' | 'name' | 'number'>,
  source = WalletInitSource.GENERATION
) => {
  const hash = await _saveWallet(data); // done
  let tmpWalletName = data.name;

  if (!tmpWalletName || tmpWalletName === '') {
    tmpWalletName = await _getWalletName();
  }
  const fullWallet: Wallet = new Wallet({ ...data, hash, name: tmpWalletName });
  // TODO save to local db
  await Wallet.saveWallet(fullWallet);
  try {
  } catch (error) {
    throw error;
  }
};

export const WalletUtils = { processWallet, addressToToken };
