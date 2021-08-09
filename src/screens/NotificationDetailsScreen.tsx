import React, {useEffect} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

//components
import {StyleSheet, ScrollView, Text} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import Loader from '../components/Loader';
import ContentError from '../components/ContentError';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import {useTranslation} from 'react-i18next';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type NotificationDetailsScreenProps = {
  navigation: StackNavigationProp<
    RootNavigatorParamList,
    'NotificationDetailsScreen'
  >;
  route: RouteProp<RootNavigatorParamList, 'NotificationDetailsScreen'>;
};

const NotificationDetailsScreen: React.VFC<NotificationDetailsScreenProps> = ({
  route,
}) => {
  const {notificationId} = route.params;

  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const notification = useAppSelector(
    state => state.notifications.notificationDetails,
  );
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(
    state => state.notifications.isNotificationLoading,
  );
  const error = useAppSelector(state => state.notifications.notificationsError);
  const fontSize = useAppSelector(state => state.user.fontSize);

  useEffect(() => {
    dispatch(actions.getNotificationDetails.request({notificationId}));
  }, [dispatch, notificationId]);

  useEffect(() => {
    if (notification) {
      dispatch(actions.setReadNotification(notificationId));
    }
  }, [dispatch, notification, notificationId]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() =>
          dispatch(actions.getNotificationDetails.request({notificationId}))
        }
      />
    );
  }

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.notifications?.url) || ''}>
        <ImageHeaderText content={t('menu:announcements')} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <Text style={styles.title}>{notification?.title}</Text>
        <Text style={[styles.description, {fontSize}]}>
          {notification?.content}
        </Text>
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default NotificationDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  textContainer: {
    marginTop: 40,
    paddingVertical: 30,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
    marginTop: 30,
  },
});
