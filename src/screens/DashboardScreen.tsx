import React from 'react';

//redux
import {useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import TopRoundedContainer from '../components/TopRoundedContainer';
import {ReadingListItem} from '../components/ReadingListItem';
import {CalendarIcon} from '../assets/svg';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import dayjs from 'dayjs';
import pl from 'dayjs/locale/pl';
import Fonts from '../constants/Fonts';

type DashboardScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'DashboardScreen'>;
  route: RouteProp<RootNavigatorParamList, 'DashboardScreen'>;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const DashboardScreen: React.VFC<DashboardScreenProps> = () => {
  const {t} = useTranslation();

  const sectionImages = useAppSelector(state => state.settings.sectionImages);

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

      <TopRoundedContainer>
        <ReadingListItem
          title={t('dashboard:bibleHeader')}
          description={t('dashboard:bibleDescription')}
          uri={remoteAsset(sectionImages?.bible?.url)}
        />

        <ReadingListItem
          title={t('dashboard:sundayReadingsHeader')}
          description={t('dashboard:sundayReadingsDescription')}
          uri={remoteAsset(sectionImages?.sunday_readings?.url)}
        />

        <ReadingListItem
          title={t('dashboard:homilyHeader')}
          description={t('dashboard:homilyDescription')}
          uri={remoteAsset(sectionImages?.homily?.url)}
        />

        <ReadingListItem
          title={t('dashboard:nationalReadingsHeader')}
          description={t('dashboard:nationalReadingsDescription')}
          uri={remoteAsset(sectionImages?.national_readings?.url)}
        />
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 30,
  },
  insideContainer: {
    marginHorizontal: 20,
  },
  todayContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: Fonts.MartelRegular,
  },
});
