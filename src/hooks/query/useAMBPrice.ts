import { useQuery } from '@tanstack/react-query';
import { QueryResponse } from '@appTypes/QueryResponse';
import { API } from '@api/api';
import { AMBToken, AMBTokenDTO } from '@models/index';
import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { EVENTS } from '@constants/events';

export function useAMBPrice(): QueryResponse<AMBToken | undefined> {
  const { data, isLoading, isRefetching, error, refetch } =
    useQuery<AMBTokenDTO>(['amb-token'], API.getAMBTokenData);

  useEffect(() => {
    // TODO fix any
    const onNewNotificationReceive = (data: any) => {
      if (data.type == 'transaction-alert') {
        refetch();
      }
    };
    const notificationListener = DeviceEventEmitter.addListener(
      EVENTS.NotificationReceived,
      onNewNotificationReceive
    );
    return () => notificationListener.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: data ? new AMBToken(data) : undefined,
    loading: isLoading,
    refetching: isRefetching,
    error,
    refetch
  };
}
