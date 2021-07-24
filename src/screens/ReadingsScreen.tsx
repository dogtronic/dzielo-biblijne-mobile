import React from 'react';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

// Components
import {StyleSheet, ScrollView} from 'react-native';
import TopRoundedContainer from '../components/TopRoundedContainer';
import {ReadingListItem} from '../components/ReadingListItem';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import Loader from '../components/Loader';

// Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

// Utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';

// Styles
import Colors from '../constants/Colors';

type ReadingsScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'ReadingsScreen'>;
  route: RouteProp<RootNavigatorParamList, 'ReadingsScreen'>;
};

const ReadingsScreen: React.VFC<ReadingsScreenProps> = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const readings = useAppSelector(state => state.readings.readings);
  const loading = useAppSelector(state => state.readings.areReadingsLoading);

  const mainReaddings = readings.filter(v => v.reading_type.type === 'Glowne');
  // const additionalReadings = readings.filter(
  //   v => v.reading_type.type === 'Poboczne',
  // );

  React.useEffect(() => {
    dispatch(actions.getCurrentReadings.request());
  }, [dispatch]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.sunday_readings?.url) || ''}>
        <ImageHeaderText content={t('menu:sundayReading')} />
      </ImageHeader>

      <TopRoundedContainer style={styles.insideContainer}>
        {mainReaddings.map(v => (
          <ReadingListItem
            key={v.id}
            title={v.reading_type.name}
            description={v.description}
            uri={remoteAsset(v.reading_type.image.url)}
            onPressButton={() => null}
          />
        ))}
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default ReadingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: Colors.background,
    flexGrow: 1,
  },
  insideContainer: {
    marginTop: 30,
  },
});
