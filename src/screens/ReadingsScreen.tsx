import React from 'react';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

// Components
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import TopRoundedContainer from '../components/TopRoundedContainer';
import {ReadingListItem} from '../components/ReadingListItem';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import Loader from '../components/Loader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ContentError from '../components/ContentError';
import EmptyData from '../components/EmptyData';

// Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

// Utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import DeviceInfo from 'react-native-device-info';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type ReadingsScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'ReadingsScreen'>;
  route: RouteProp<RootNavigatorParamList, 'ReadingsScreen'>;
};

const ReadingsScreen: React.VFC<ReadingsScreenProps> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const isTablet = DeviceInfo.isTablet();

  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const readings = useAppSelector(state => state.readings.readings);
  const loading = useAppSelector(state => state.readings.areReadingsLoading);
  const error = useAppSelector(state => state.readings.readingsError);

  const mainReaddings =
    readings?.filter(v => v.reading_type.type === 'Glowne') || [];
  const additionalReadings =
    readings?.filter(v => v.reading_type.type === 'Poboczne') || [];

  React.useEffect(() => {
    dispatch(actions.getCurrentReadings.request());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() => dispatch(actions.getCurrentReadings.request())}
      />
    );
  }

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.sunday_readings?.url) || ''}>
        <ImageHeaderText content={t('menu:sundayReading')} />
      </ImageHeader>

      <TopRoundedContainer style={styles.insideContainer}>
        {!mainReaddings.length && !additionalReadings.length && <EmptyData />}

        <View style={[isTablet && styles.tabletReadingsContainer]}>
          {mainReaddings.map((v, index) => (
            <ReadingListItem
              key={v.id}
              title={v.reading_type.name}
              description={v.description}
              uri={remoteAsset(v.reading_type.image.url)}
              onPressButton={() =>
                navigation.navigate('ReadingsDrawerNavigator', {
                  reading: v,
                  isSundayReading: true,
                })
              }
              containerStyle={[
                isTablet && styles.tabletItem,
                isTablet && index % 2 === 1 && styles.evenTabletItem,
              ]}
            />
          ))}
        </View>

        <View
          style={[
            styles.rowContainer,
            isTablet && styles.tabletBottomRowContainer,
          ]}>
          {additionalReadings.map(v => (
            <ImageBackground
              style={[
                styles.itemContainer,
                isTablet && styles.tabletBottomItemContainer,
              ]}
              key={v.id}
              source={{uri: remoteAsset(v.reading_type.image.url)}}>
              <TouchableOpacity
                style={styles.topContainer}
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate('ReadingsDrawerNavigator', {
                    reading: v,
                    isSundayReading: true,
                  })
                }>
                <Text style={styles.topContainerText}>
                  {v.reading_type.name}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          ))}
        </View>
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
  itemContainer: {
    height: 130,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 30,
    flex: 1,
    marginHorizontal: 5,
  },
  tabletBottomItemContainer: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  topContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
  },
  topContainerText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 16,
    color: Colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  tabletBottomRowContainer: {
    marginHorizontal: -15,
  },
  tabletReadingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabletItem: {
    width: Dimensions.get('screen').width / 2 - 50,
    marginTop: 20,
  },
  evenTabletItem: {
    marginLeft: 50,
  },
});
