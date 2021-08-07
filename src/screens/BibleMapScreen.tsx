import React, {useEffect, useState} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

//components
import {StyleSheet, ScrollView, Text, Image} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import ContentError from '../components/ContentError';
import MapView, {Marker} from 'react-native-maps-osmdroid';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import {useTranslation} from 'react-i18next';

// Styles
import Loader from '../components/Loader';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {Country, Region} from '../store/types/Region.model';

type BibleMapScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'BibleMapScreen'>;
  route: RouteProp<RootNavigatorParamList, 'BibleMapScreen'>;
};

const BibleMapScreen: React.VFC<BibleMapScreenProps> = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const countries = useAppSelector(state => state.map.countries);
  const regions = useAppSelector(state => state.map.regions);
  const places = useAppSelector(state => state.map.places);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.map.areRegionsLoading);
  const error = useAppSelector(state => state.map.regionsError);

  useEffect(() => {
    if (selectedRegion) {
      dispatch(
        actions.getPlacesFromRegion.request({regionId: selectedRegion.id}),
      );
    }
  }, [selectedRegion, dispatch]);

  useEffect(() => {
    dispatch(actions.getRegions.request());
  }, [dispatch]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() => dispatch(actions.getRegions.request())}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.bible_map?.url) || ''}>
        <ImageHeaderText content={t('menu:biblemap')} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <MapView style={{flex: 1}}>
          {!selectedCountry &&
            countries.map(v => (
              <Marker
                key={v.alpha2}
                coordinate={{
                  latitude: v.latitude,
                  longitude: v.longitude,
                }}
                onPress={() => setSelectedCountry(v)}>
                <Text style={styles.markerText}>{v.country}</Text>
                <Image
                  style={styles.markerImage}
                  source={require('../assets/images/map_pin.png')}
                />
              </Marker>
            ))}

          {selectedCountry &&
            !selectedRegion &&
            regions
              .filter(v => v.country === selectedCountry.alpha2)
              .map(region => (
                <Marker
                  key={region.id.toString()}
                  coordinate={{
                    latitude: region.lat,
                    longitude: region.lng,
                  }}
                  onPress={() => setSelectedRegion(region)}>
                  <Text style={styles.markerText}>{region.name}</Text>
                  <Image
                    style={styles.markerImage}
                    source={require('../assets/images/map_pin.png')}
                  />
                </Marker>
              ))}

          {selectedRegion &&
            places.map(place => (
              <Marker
                key={place.id.toString()}
                coordinate={{
                  latitude: place.lat,
                  longitude: place.lng,
                }}>
                <Text style={styles.markerText}>{place.name}</Text>
                <Image
                  style={styles.markerImage}
                  source={require('../assets/images/map_pin.png')}
                />
              </Marker>
            ))}
        </MapView>
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default BibleMapScreen;

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
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
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
  markerText: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: Colors.white,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  markerImage: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
});
