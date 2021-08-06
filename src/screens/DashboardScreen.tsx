import React from 'react';

// Redux
import {useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';
import {useDispatch} from 'react-redux';

// Components
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import TopRoundedContainer from '../components/TopRoundedContainer';
import {ReadingListItem} from '../components/ReadingListItem';
import {CalendarIcon} from '../assets/svg';
import {Notification} from '../components/Notification';
import WeeklyPhoto from '../components/WeeklyPhoto';

// Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

// Utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import dayjs from 'dayjs';
import pl from 'dayjs/locale/pl';

// Styles
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

type DashboardScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'DashboardScreen'>;
  route: RouteProp<RootNavigatorParamList, 'DashboardScreen'>;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const DashboardScreen: React.VFC<DashboardScreenProps> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const sectionImages = useAppSelector(state => state.settings.sectionImages);

  const removedNotificationFromDashboard = useAppSelector(
    state => state.user.removedNotificationsFromDashboard || {},
  );
  const readNotifications = useAppSelector(
    state => state.user.readNotifications || {},
  );

  const newNotifications = useAppSelector(state =>
    state.notifications.newNotifications.filter(
      v => !removedNotificationFromDashboard[v.id],
    ),
  );

  const photoOfTheWeek = useAppSelector(state => state.settings.photoOfTheWeek);

  const today = capitalizeFirstLetter(
    dayjs().locale(pl).format('dddd, D MMMM').toString(),
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.insideContainer}>
        <View style={styles.todayContainer}>
          <CalendarIcon />
          <Text style={styles.todayText}>{today}</Text>
        </View>
      </View>

      {photoOfTheWeek && <WeeklyPhoto photo={photoOfTheWeek} />}

      {newNotifications.map(v => (
        <Notification
          key={v.id.toString()}
          title={v.title}
          description={v.content}
          isRead={readNotifications[v.id]}
          onPressClose={() =>
            dispatch(actions.setRemovedNotificationFromDashboard(v.id))
          }
          onPressButton={() =>
            navigation.navigate('NotificationDetailsScreen', {
              notificationId: v.id,
            })
          }
        />
      ))}

      <TopRoundedContainer style={styles.textContainer}>
        <ReadingListItem
          title={t('dashboard:bibleHeader')}
          description={t('dashboard:bibleDescription')}
          uri={remoteAsset(sectionImages?.bible?.url)}
          onPressButton={() => navigation.navigate('BibleScreen')}
        />

        <ReadingListItem
          title={t('dashboard:sundayReadingsHeader')}
          description={t('dashboard:sundayReadingsDescription')}
          uri={remoteAsset(sectionImages?.sunday_readings?.url)}
          onPressButton={() => navigation.navigate('ReadingsScreen')}
        />

        <ReadingListItem
          title={t('dashboard:homilyHeader')}
          description={t('dashboard:homilyDescription')}
          uri={remoteAsset(sectionImages?.homily?.url)}
          onPressButton={() => navigation.navigate('HomiliesListScreen')}
        />

        <ReadingListItem
          title={t('dashboard:nationalReadingsHeader')}
          description={t('dashboard:nationalReadingsDescription')}
          uri={remoteAsset(sectionImages?.national_readings?.url)}
          onPressButton={() =>
            navigation.navigate('NationalReadingsListScreen')
          }
        />
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingTop: 25,
    flexGrow: 1,
  },
  textContainer: {
    flexGrow: 1,
    marginTop: 20,
  },
  insideContainer: {
    marginHorizontal: 25,
  },
  todayContainer: {
    flexDirection: 'row',
  },
  todayText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: Fonts.MartelRegular,
  },
});
