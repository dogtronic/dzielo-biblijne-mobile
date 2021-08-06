import React, {useState, useEffect, useCallback} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

//components
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import ContentButton from '../components/ContentButton';
import Loader from '../components/Loader';
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

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Models
import {CuriosityBase} from '../store/types/Curiosity.model';
import {ScrollView} from 'react-native-gesture-handler';

type CuriosityBaseScreenProps = {
  navigation: StackNavigationProp<
    RootNavigatorParamList,
    'CuriosityBaseScreen'
  >;
  route: RouteProp<RootNavigatorParamList, 'CuriosityBaseScreen'>;
};

const CuriosityBaseScreen: React.VFC<CuriosityBaseScreenProps> = ({route}) => {
  const {type, curiosities: customCuriosities} = route.params;
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [offset, setOffest] = useState(10);
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

    const params = {offset: 0, limit: 10, withReset: true};
    if (type === 'curiosity') {
      dispatch(actions.getCuriosities.request(params));
    } else {
      dispatch(actions.getPhotos.request(params));
    }
  }, [dispatch, type, customCuriosities]);

  useEffect(() => {
    getEntities();
  }, [getEntities]);

  const getCuriosities = debounce((withResetOffest?: boolean) => {
    let customOffset = offset;

    if (withResetOffest) {
      setOffest(0);
      customOffset = 0;
    }

    const params = {
      offset: withResetOffest ? 0 : offset,
      limit: 10,
      withReset: withResetOffest,
    };

    if (type === 'curiosity') {
      dispatch(actions.getCuriosities.request(params));
    } else {
      dispatch(actions.getPhotos.request(params));
    }

    setOffest(customOffset + 10);
  }, 200);

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
            type === 'curiosity' ? t('menu:curiosities') : t('menu:photos')
          }
        />
      </ImageHeader>

      {currentCuriosity?.image?.url && (
        <ImageBackground
          style={styles.image}
          source={{uri: remoteAsset(currentCuriosity?.image?.url)}}
        />
      )}

      <TopRoundedContainer style={styles.textContainer}>
        {currentCuriosity?.title && (
          <Text style={styles.title}>{currentCuriosity.title}</Text>
        )}
        {currentCuriosity?.comment && (
          <Text style={styles.description}>{currentCuriosity.comment}</Text>
        )}

        <View style={styles.buttonsContainer}>
          <ContentButton
            title={t('common:previous')}
            onPress={prevCuriosity}
            disabled={curiosityIndex === 0}
          />

          {!customCuriosities && <ContentButton title={t('common:random')} />}

          <ContentButton
            title={t('common:next')}
            onPress={nextCuriosity}
            disabled={
              (customCuriosities?.length || curiosities.length) - 1 ===
                curiosityIndex && !areMoreData
            }
          />
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
  contentContainer: {
    flexGrow: 1,
  },
  textContainer: {
    marginTop: 35,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
    color: Colors.black,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
