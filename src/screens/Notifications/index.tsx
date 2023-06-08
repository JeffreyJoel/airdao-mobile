import React, { useEffect, useRef } from 'react';
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  View
} from 'react-native';
import dayjs from 'dayjs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetNotificationSettings } from '@components/templates';
import { BottomSheetRef } from '@components/composite';
import { Spacer, Text } from '@components/base';
import { NotificationsHeader as Header, NotificationBox } from './components';
import { Notification } from '@models/Notification';
import { verticalScale } from '@utils/scaling';
import { COLORS } from '@constants/colors';
import { useObserveNotifications } from '@hooks';
import { Q } from '@nozbe/watermelondb';
import { DatabaseService } from '@lib';
import { BellIcon } from '@components/svg/icons';
import { styles } from './styles';

interface NotificationSection {
  title: string;
  data: Notification[];
  index: number;
}

const DAY_FORMAT = 'DD MMMM YYYY';

export const Notifications = (): JSX.Element => {
  const notifications = useObserveNotifications(Q.sortBy('created_at', 'desc'));

  useEffect(() => {
    const databaseService = new DatabaseService();
    const unreadNotifications = notifications.filter((n) => !n.isRead);
    databaseService.markAsRead(unreadNotifications);
  }, [notifications]);

  const settingsModal = useRef<BottomSheetRef>(null);

  const sectionizedNotificaitons: NotificationSection[] = React.useMemo(() => {
    const sectionMap = new Map<string, Notification[]>();
    notifications.forEach((n) => {
      const key = dayjs(n.createdAt).format(DAY_FORMAT);
      const notificationsInSection = sectionMap.get(key) || [];
      notificationsInSection.push(n);
      sectionMap.set(key, notificationsInSection);
    });
    const sections: NotificationSection[] = [];
    let index = 0;
    for (const [date, notifications] of sectionMap) {
      const today = dayjs().format(DAY_FORMAT);
      const yesterday = dayjs().subtract(1, 'day').format(DAY_FORMAT);
      const title =
        date === today ? 'Today' : date === yesterday ? 'Yesterday' : date;
      sections.push({ title, data: notifications, index });
      index++;
    }
    return sections;
  }, [notifications]);

  const showSettingsModal = () => {
    settingsModal.current?.show();
  };

  const renderNotification = (
    args: SectionListRenderItemInfo<Notification>
  ) => {
    const { item } = args;
    return <NotificationBox notification={item} />;
  };

  const renderSectionHeader = (info: {
    section: SectionListData<Notification, NotificationSection>;
  }) => {
    return (
      <>
        {info.section.index !== 0 && (
          <>
            <Spacer value={verticalScale(40)} />
          </>
        )}
        <Text
          fontFamily="Inter_600SemiBold"
          fontSize={12}
          color={COLORS.smokyBlack50}
        >
          {info.section.title.toUpperCase()}
        </Text>
        <Spacer value={verticalScale(20)} />
      </>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <BellIcon />
        <Spacer value={verticalScale(16)} />
        <Text
          align="center"
          color={COLORS.davysGray}
          fontSize={15}
          fontFamily="Inter_400Regular"
        >
          You have no notifications right now.{'\n'} Come back later.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView testID="NotificationScreen" style={styles.container}>
      <Header onSettingsPress={showSettingsModal} />
      <SectionList<Notification, NotificationSection>
        keyExtractor={(item) => item._id}
        sections={sectionizedNotificaitons}
        renderItem={renderNotification}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <Spacer value={verticalScale(32)} />}
        contentContainerStyle={styles.list}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
      <BottomSheetNotificationSettings ref={settingsModal} />
    </SafeAreaView>
  );
};
