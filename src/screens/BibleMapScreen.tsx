import React, {useCallback, useEffect, useRef, useState} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

//components
import {StyleSheet, ScrollView} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import ContentError from '../components/ContentError';
import MapView from 'react-native-maps-osmdroid';
import MapMarker from '../components/MapMarker';
import PlaceModal from '../components/PlaceModal';
import MapControl from '../components/MapControl';
import {
  DisableFullScreenIcon,
  FullScreenIcon,
  MapMinusIcon,
} from '../assets/svg';
import Loader from '../components/Loader';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import {useTranslation} from 'react-i18next';
import {getLatLngCenter} from '../utils/getLatLngCenter';
import {polishCountriesTranslations} from '../assets/translations/countries';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Models
import {Country, Place, Region} from '../store/types/Region.model';

type BibleMapScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'BibleMapScreen'>;
  route: RouteProp<RootNavigatorParamList, 'BibleMapScreen'>;
};

const altitude: {[key in string]: number} = {
  '3': 10311040,
  '4': 5932713,
  '5': 2966357,
  '6': 1483178,
  '7': 741589,
  '8': 243624,
  '10': 100000,
  '11': 36310,
};

const BibleMapScreen: React.VFC<BibleMapScreenProps> = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const mapRef = useRef<MapView>(null);

  const [fullScreen, setFullScreen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const countries = useAppSelector(state => state.map.countries);
  const regions = useAppSelector(state => state.map.regions);
  const places = useAppSelector(state => state.map.places);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.map.areRegionsLoading);
  const placesLoading = useAppSelector(state => state.map.arePlacesLoading);
  const error = useAppSelector(state => state.map.regionsError);

  useEffect(() => {
    if (selectedRegion) {
      dispatch(
        actions.getPlacesFromRegion.request({regionId: selectedRegion.id}),
      );
    }
  }, [selectedRegion, dispatch]);

  const animateMap = useCallback(
    ({lat, lng, zoom}: {lat: number; lng: number; zoom?: number}) => {
      mapRef.current?.animateCamera({
        center: {
          latitude: lat || 0,
          longitude: lng || 0,
        },
        zoom,
        altitude: zoom ? altitude[zoom?.toString()] : undefined,
      });
    },
    [mapRef],
  );

  useEffect(() => {
    if (countries) {
      const point = getLatLngCenter(countries);
      setTimeout(() => {
        animateMap({lat: point.lat, lng: point.lng, zoom: 5});
      }, 500);
    }
  }, [countries, animateMap]);

  useEffect(() => {
    dispatch(actions.getRegions.request());
  }, [dispatch]);

  useEffect(() => {
    if (places.length) {
      const point = getLatLngCenter(places);
      setTimeout(() => {
        animateMap({lat: point.lat, lng: point.lng, zoom: 11});
      }, 500);
    }
  }, [places, animateMap]);

  const zoomOut = useCallback(() => {
    if (selectedRegion) {
      setSelectedRegion(null);
      const selectedRegions = regions.filter(
        w => w.country === selectedCountry?.alpha2,
      );
      const point = getLatLngCenter(selectedRegions);
      animateMap({lat: point.lat, lng: point.lng, zoom: 7});
      return;
    }

    if (selectedCountry) {
      setSelectedCountry(null);
      const point = getLatLngCenter(countries);
      animateMap({lat: point.lat, lng: point.lng, zoom: 5});
      return;
    }
  }, [selectedRegion, selectedCountry, countries, animateMap, regions]);

  const selectCountry = useCallback(
    (v: Country) => {
      setSelectedCountry(v);

      const selectedRegions = regions.filter(w => w.country === v.alpha2);
      const point = getLatLngCenter(selectedRegions);

      setTimeout(() => {
        animateMap({lat: point.lat, lng: point.lng, zoom: 7});
      }, 500);
    },
    [animateMap, regions],
  );

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
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {!fullScreen && (
        <ImageHeader uri={remoteAsset(sectionImages?.bible_map?.url) || ''}>
          <ImageHeaderText content={t('menu:biblemap')} />
        </ImageHeader>
      )}

      <TopRoundedContainer
        style={[
          styles.textContainer,
          fullScreen && styles.fullScreenTopContainer,
        ]}>
        <MapView ref={mapRef} style={styles.mapContainer} rotateEnabled={false}>
          {!selectedCountry &&
            countries.map(v => (
              <MapMarker
                key={v.alpha2}
                coordinate={{
                  latitude: v.lat,
                  longitude: v.lng,
                }}
                onPress={() => selectCountry(v)}
                title={polishCountriesTranslations[v.alpha2].name_pl}
              />
            ))}

          {selectedCountry &&
            !selectedRegion &&
            regions
              .filter(v => v.country === selectedCountry.alpha2)
              .map(region => (
                <MapMarker
                  key={region.id.toString()}
                  coordinate={{
                    latitude: region.lat,
                    longitude: region.lng,
                  }}
                  onPress={() => setSelectedRegion(region)}
                  title={region.name}
                />
              ))}

          {selectedRegion &&
            places.map(place => (
              <MapMarker
                key={place.id.toString()}
                coordinate={{
                  latitude: place.lat,
                  longitude: place.lng,
                }}
                title={place.name}
                onPress={() => setSelectedPlace(place)}
              />
            ))}
        </MapView>

        <MapControl
          containerStyle={styles.fullScreenButton}
          onPress={() => setFullScreen(!fullScreen)}>
          {fullScreen ? <DisableFullScreenIcon /> : <FullScreenIcon />}
        </MapControl>

        {selectedCountry && (
          <MapControl containerStyle={styles.zoomOutButton} onPress={zoomOut}>
            <MapMinusIcon />
          </MapControl>
        )}

        <PlaceModal
          place={selectedPlace}
          isVisible={!!selectedPlace}
          toggleModal={() => setSelectedPlace(null)}
        />

        {placesLoading && (
          <Loader isAbsolute backgroundColor={'rgba(255,255,255,0.3)'} />
        )}
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
  mapContainer: {
    flex: 1,
  },
  textContainer: {
    marginTop: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
    backgroundColor: 'red',
    paddingBottom: 0,
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
  fullScreenButton: {
    top: 20,
    right: 20,
  },
  zoomOutButton: {
    top: 20,
    right: 80,
  },
  fullScreenTopContainer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: 0,
  },
});
