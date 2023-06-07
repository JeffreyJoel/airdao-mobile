import { NotificationSettings } from '@appTypes/notification';

export const DefaultNotificationSettings: NotificationSettings = {
  priceAlerts: true,
  priceThreshold: {
    min: null,
    max: null
  },
  transactionAlerts: true,
  transactionThreshold: {
    min: null,
    max: null
  },
  pricePercentThreshold: 5,
  balancePercentChange: 5
};

export const CRYPTO_ADDRESS_MAX_LENGTH = 62;

export const CMC_API_KEY = '2f5614ab-6b43-4866-89c0-35352f985851';
