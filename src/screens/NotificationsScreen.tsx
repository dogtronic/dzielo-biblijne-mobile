import React, {useCallback, useState, useEffect} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

//components
import {StyleSheet, FlatList, View} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import {Notification as NotificationComponent} from '../components/Notification';
import ContentError from '../components/ContentError';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import {debounce} from 'ts-debounce';

// Styles
import Loader from '../components/Loader';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Models
import {Notification} from '../store/types/Notification.model';

type NotificationsScreenProps = {
  navigation: StackNavigationProp<
    RootNavigatorParamList,
    'NotificationsScreen'
  >;
  route: RouteProp<RootNavigatorParamList, 'NotificationsScreen'>;
};

const NotificationsScreen: React.VFC<NotificationsScreenProps> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [offset, setOffest] = useState(10);

  const notifications = useAppSelector(
    state => state.notifications.notifications,
  );
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(
    state => state.notifications.areNotificationsLoading,
  );
  const areMoreData = useAppSelector(
    state => state.notifications.areMoreNotifications,
  );
  const error = useAppSelector(
    state => state.notifications.notificationDetailsError,
  );

  const readNotifications = useAppSelector(
    state => state.user.readNotifications || {},
  );

  useEffect(() => {
    dispatch(
      actions.getNotifications.request({offset: 0, limit: 10, withReset: true}),
    );
  }, [dispatch]);

  const getNotifications = debounce(
    (withResetOffest?: boolean, customFilter?: string) => {
      let customOffset = offset;

      if (withResetOffest) {
        setOffest(0);
        customOffset = 0;
      }

      dispatch(
        actions.getNotifications.request({
          offset: withResetOffest ? 0 : offset,
          limit: 10,
          filter: customFilter,
          withReset: withResetOffest,
        }),
      );

      setOffest(customOffset + 10);
    },
    400,
  );

  const onReachEnd = () => {
    if (areMoreData && !loading) {
      getNotifications();
    }
  };

  const renderItem = useCallback(
    ({item}: {item: Notification}) => (
      <NotificationComponent
        title={item.title}
        description={item.content}
        onPressButton={() =>
          navigation.navigate('NotificationDetailsScreen', {
            notificationId: item.id,
          })
        }
        isRead={readNotifications[item.id]}
      />
    ),
    [navigation, readNotifications],
  );

  if (error) {
    return (
      <ContentError
        onPressRefresh={() =>
          dispatch(
            actions.getNotifications.request({
              offset: 0,
              limit: 10,
              withReset: true,
            }),
          )
        }
      />
    );
  }

  return (
    <FlatList<Notification>
      bounces={false}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <ImageHeader
            uri={remoteAsset(sectionImages?.notifications?.url) || ''}>
            <ImageHeaderText content={t('menu:announcements')} />
          </ImageHeader>
        </View>
      }
      ListFooterComponent={
        loading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : undefined
      }
      style={styles.container}
      data={notifications}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReachedThreshold={100}
      onEndReached={onReachEnd}
    />
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    backgroundColor: Colors.background,
    paddingBottom: 30,
  },
  loaderContainer: {
    height: 80,
  },
  itemContainer: {
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  itemText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
  },
});
