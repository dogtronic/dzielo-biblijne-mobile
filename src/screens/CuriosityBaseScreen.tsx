import React, {useState, useLayoutEffect, useCallback} from 'react';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

// Components
import {StyleSheet, View, ImageBackground} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import ContentButton from '../components/ContentButton';
import Loader from '../components/Loader';
import ContentError from '../components/ContentError';
import {ScrollView} from 'react-native-gesture-handler';
import Typography, {TypographyType} from '../components/Typography';

// Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

// Utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import {debounce} from 'ts-debounce';
import DeviceInfo from 'react-native-device-info';

// Styles
import Colors from '../constants/Colors';

// Models
import {CuriosityBase} from '../store/types/Curiosity.model';

type CuriosityBaseScreenProps = {
  navigation: StackNavigationProp<
    RootNavigatorParamList,
    'CuriosityBaseScreen'
  >;
  route: RouteProp<RootNavigatorParamList, 'CuriosityBaseScreen'>;
};

const CuriosityBaseScreen: React.VFC<CuriosityBaseScreenProps> = ({route}) => {
  const {type, curiosities: customCuriosities, photoOfTheWeek} = route.params;
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const isTablet = DeviceInfo.isTablet();

  const [offset, setOffest] = useState(50);
  const [curiosityIndex, setCuriosityIndex] = useState(0);

  const sectionImages = useAppSelector(state => state.settings.sectionImages);

  const curiosities: CuriosityBase[] = useAppSelector(state =>
    type === 'curiosity' ? state.readings.curiosities : state.readings.photos,
  );

  const currentCuriosity = customCuriosities?.length
    ? customCuriosities[curiosityIndex]
    : curiosities?.length
    ? curiosities[curiosityIndex]
    : undefined;

  const loading = useAppSelector(state =>
    type === 'curiosity'
      ? state.readings.areCuriositiesLoading
      : state.readings.arePhotosLoading,
  );
  const areMoreData = useAppSelector(state =>
    type === 'curiosity'
      ? state.readings.areMoreCuriosities
      : state.readings.areMorePhotos,
  );
  const error = useAppSelector(state =>
    type === 'curiosity'
      ? state.readings.curiositiesError
      : state.readings.photosError,
  );

  const getEntities = useCallback(() => {
    if (customCuriosities) {
      return;
    }

    const params = {offset: 0, limit: 50, withReset: true};
    if (type === 'curiosity') {
      dispatch(actions.getCuriosities.request(params));
    } else {
      dispatch(actions.getPhotos.request(params));
    }
  }, [dispatch, type, customCuriosities]);

  useLayoutEffect(() => {
    getEntities();
  }, [getEntities]);

  const getCuriosities = debounce(
    (withResetOffest?: boolean, random?: boolean) => {
      let customOffset = offset;

      if (withResetOffest) {
        setCuriosityIndex(0);
        setOffest(0);
        customOffset = 0;
      }

      const params = {
        offset: withResetOffest ? 0 : offset,
        limit: 50,
        withReset: withResetOffest,
        random,
      };

      if (type === 'curiosity') {
        dispatch(actions.getCuriosities.request(params));
      } else {
        dispatch(actions.getPhotos.request(params));
      }

      setOffest(customOffset + 50);
    },
    200,
  );

  const nextCuriosity = () => {
    if (
      curiosities.length - 1 === curiosityIndex &&
      areMoreData &&
      !customCuriosities
    ) {
      getCuriosities();
    }

    setCuriosityIndex(curiosityIndex + 1);
  };

  const prevCuriosity = () => {
    if (curiosityIndex) {
      setCuriosityIndex(curiosityIndex - 1);
    }
  };

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return <ContentError onPressRefresh={getEntities} />;
  }

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}>
      <ImageHeader
        uri={
          remoteAsset(
            type === 'curiosity'
              ? sectionImages?.curiosities?.url
              : sectionImages?.photos?.url,
          ) || ''
        }>
        <ImageHeaderText
          content={
            type === 'curiosity'
              ? t('menu:curiosities')
              : photoOfTheWeek
              ? t('dashboard:photoOfWeek')
              : t('menu:photos')
          }
        />
      </ImageHeader>

      {currentCuriosity?.image?.url && (
        <ImageBackground
          style={[styles.image, isTablet && styles.imageTablet]}
          source={{uri: remoteAsset(currentCuriosity?.image?.url)}}
        />
      )}

      <TopRoundedContainer style={styles.textContainer}>
        {currentCuriosity?.title && (
          <Typography
            type={TypographyType.Title}
            style={styles.title}
            resizeable>
            {currentCuriosity.title}
          </Typography>
        )}
        {currentCuriosity?.comment && (
          <Typography
            type={TypographyType.Text}
            style={styles.description}
            resizeable>
            {currentCuriosity.comment}
          </Typography>
        )}

        <View style={styles.buttonsContainer}>
          <View style={styles.separator}>
            {curiosityIndex !== 0 && (
              <ContentButton
                title={t('common:previous')}
                onPress={prevCuriosity}
                disabled={curiosityIndex === 0}
              />
            )}
          </View>

          {!customCuriosities && (
            <ContentButton
              title={t('common:random')}
              onPress={() => getCuriosities(true, true)}
            />
          )}

          <View style={[styles.separator, styles.rightSeparator]}>
            {!(
              (customCuriosities?.length || curiosities.length) - 1 ===
                curiosityIndex && !areMoreData
            ) && (
              <ContentButton
                title={t('common:next')}
                onPress={nextCuriosity}
                disabled={
                  (customCuriosities?.length || curiosities.length) - 1 ===
                    curiosityIndex && !areMoreData
                }
              />
            )}
          </View>
        </View>
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default CuriosityBaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    height: 265,
    marginTop: 35,
    marginHorizontal: 30,
    borderRadius: 5,
    overflow: 'hidden',
  },
  imageTablet: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    height: 400,
  },
  contentContainer: {
    flexGrow: 1,
  },
  textContainer: {
    marginTop: 35,
    flexGrow: 1,
    paddingVertical: 30,
  },
  title: {
    marginBottom: 20,
  },
  description: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  separator: {
    width: 120,
  },
  rightSeparator: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
