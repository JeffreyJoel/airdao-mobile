/**
 * @version 0.11
 */
// @ts-ignore
import settingsActions from '../../../../app/appstores/Stores/Settings/SettingsActions';
import AirDAOAxios from '../../../common/AirDAOAxios';
import AirDAOCryptoLog from '../../../common/AirDAOCryptoLog';

interface ApiResponse {
  data: any;
}

export default class XmrUnspentsProvider {
  private _settings: any;
  private _link: string | false;
  private _cache: { [key: string]: any };
  private _serverUrl: string | undefined;

  constructor(settings: any) {
    this._settings = settings;
    this._link = false;
    this._cache = {};
  }

  init(): void {
    if (this._link) return;
    this._serverUrl = settingsActions.getSettingStatic('xmrServer');
    if (!this._serverUrl) {
      this._serverUrl = 'api.mymonero.com:8443';
    }

    if (typeof this._serverUrl === 'string') {
      let link = this._serverUrl.trim();
      if (link.substr(0, 4).toLowerCase() !== 'http') {
        link = 'https://' + this._serverUrl;
      }
      if (link[link.length - 1] !== '/') {
        link = link + '/';
      }

      this._link = link;
      this._cache = {};
    }
  }

  async _getUnspents(
    params: any,
    fn?: (err: Error | null, data: any) => void
  ): Promise<any> {
    try {
      const key = JSON.stringify(params);
      let res: ApiResponse;
      if (typeof this._cache[key] === 'undefined') {
        // @ts-ignore
        AirDAOCryptoLog.log('XmrUnspentsProvider Xmr._getUnspents', key);
        /*
                const linkParams = {
                    address: params.address,
                    view_key: params.privViewKey,
                    amount: params.amount.toString(),
                    mixin: '10',
                    use_dust: true,
                    dust_threshold: '2000000000'
                }
                */
        // @ts-ignore
        res = await AirDAOAxios.post(this._link + 'get_unspent_outs', params);
        AirDAOCryptoLog.log(
          'XmrUnspentsProvider Xmr._getUnspents res ' +
            JSON.stringify(res.data).substr(0, 200)
        );
        this._cache[key] = res.data;
      } else {
        res = { data: this._cache[key] };
      }
      if (typeof fn === 'undefined' || !fn) {
        return res.data;
      } else {
        fn(null, res.data);
      }
    } catch (e: any) {
      e.message += ' while Xmr._getUnspents';
      if (typeof fn === 'undefined' || !fn) {
        throw e;
      } else {
        fn(e, null);
      }
    }
  }

  async _getRandomOutputs(
    params: any,
    fn?: (err: Error | null, data: any) => void
  ): Promise<any> {
    try {
      AirDAOCryptoLog.log('XmrUnspentsProvider Xmr._getRandomOutputs', params);

      /*
            const amounts = usingOuts.map(o => (o.rct ? '0' : o.amount.toString()))
            const linkParams = {
                amounts,
                count: (mixin * 1 + 1)
            }
            */

      // @ts-ignore
      const res: ApiResponse = await AirDAOAxios.post(
        this._link + 'get_random_outs',
        params
      );
      await AirDAOCryptoLog.log(
        'XmrUnspentsProvider Xmr._getRandomOutputs res ' +
          JSON.stringify(res.data).substr(0, 200)
      );

      if (
        typeof res === 'object' &&
        res.data &&
        typeof res.data.amount_outs !== 'undefined' &&
        res.data.amount_outs &&
        res.data.amount_outs.length > 0
      ) {
        if (typeof fn === 'undefined' || !fn) {
          return res.data;
        } else {
          fn(null, res.data);
        }
      } else {
        throw new Error('SERVER_RESPONSE_NO_RESPONSE_XMR');
      }
    } catch (e: any) {
      if (e.message.indexOf('SERVER_RESPONSE') === -1) {
        e.message += ' while Xmr._getRandomOutputs';
      }
      if (typeof fn === 'undefined' || !fn) {
        throw e;
      } else {
        fn(e, null);
      }
    }
  }
}
