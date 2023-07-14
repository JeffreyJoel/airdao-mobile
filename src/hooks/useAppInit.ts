import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { DeviceService, NotificationService, PermissionService } from '@lib';
import { CacheableAccount, Permission } from '@appTypes';
import { API } from '@api/api';
import { Cache, CacheKey } from '@utils/cache';
import {
  DEFAULT_WATCHLIST,
  DefaultNotificationSettings
} from '@constants/variables';

/* eslint camelcase: 0 */
export const useAppInit = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    async function prepareNotifications() {
      const notificationPermissionGranted =
        await PermissionService.getPermission(Permission.Notifications, {
          requestAgain: true,
          openSettings: true
        });
      await Cache.setItem(CacheKey.NotificationSettings, {
        ...DefaultNotificationSettings,
        priceAlerts: notificationPermissionGranted,
        transactionAlerts: notificationPermissionGranted
      });
      const notificationService = new NotificationService();
      notificationService.setup();
      let notificationTokenSavedToRemoteDB = false;
      let alreadyWatchedAddresses: string[] = [];
      try {
        const watcherInfo =
          await API.watcherService.getWatcherInfoOfCurrentUser();
        alreadyWatchedAddresses = watcherInfo
          ? watcherInfo.addresses.map((a) => a.address)
          : ([] as string[]);
        notificationTokenSavedToRemoteDB = Boolean(watcherInfo);
      } catch (error) {
        alreadyWatchedAddresses = [] as string[];
        notificationTokenSavedToRemoteDB = false;
      }
      if (!notificationTokenSavedToRemoteDB) {
        try {
          const watchlist = (
            ((await Cache.getItem(CacheKey.AllAddresses)) ||
              []) as CacheableAccount[]
          ).filter((a) => a.isOnWatchlist);
          await API.watcherService.createWatcherForCurrentUser();
          if (watchlist.length > 0) {
            // save under new push token
            API.watcherService.watchAddresses(watchlist.map((w) => w.address));
          }
        } catch (error) {
          // ignore
        }
      }
      const notWatchedDefaultAddresses = DEFAULT_WATCHLIST.filter(
        (adress) => alreadyWatchedAddresses.indexOf(adress) === -1
      );
      API.watcherService.watchAddresses(notWatchedDefaultAddresses);
    }
    async function prepare() {
      try {
        prepareNotifications();
        DeviceService.setupUniqueDeviceID();
        await Font.loadAsync({
          Inter_400Regular: require('../../assets/fonts/Inter-Regular.ttf'),
          Inter_500Medium: require('../../assets/fonts/Inter-Medium.ttf'),
          Inter_600SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
          Inter_700Bold: require('../../assets/fonts/Inter-Bold.ttf'),
          Mersad_600SemiBold: require('../../assets/fonts/Mersad-SemiBold.ttf')
        });
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
      } finally {
        setIsAppReady(true);
      }
    }
    prepare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAppReady };
};
