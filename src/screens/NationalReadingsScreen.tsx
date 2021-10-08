import React, {useCallback, useState, useLayoutEffect} from 'react';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

// Components
import {StyleSheet, FlatList, View} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import SearchInput from '../components/SearchInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ContentError from '../components/ContentError';
import RoundedListHeader from '../components/RoundedListHeader';
import Loader from '../components/Loader';
import Typography, {TypographyType} from '../components/Typography';

// Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

// Utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import {debounce} from 'ts-debounce';

// Styles
import Colors from '../constants/Colors';

// Models
import {Reading} from '../store/types/Reading.model';

type NationalReadingsListScreenProps = {
  navigation: StackNavigationProp<
    RootNavigatorParamList,
    'NationalReadingsListScreen'
  >;
  route: RouteProp<RootNavigatorParamList, 'NationalReadingsListScreen'>;
};

const NationalReadingsListScreen: React.VFC<NationalReadingsListScreenProps> =
  ({navigation}) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const [offset, setOffest] = useState(30);
    const [filter, setFilter] = useState('');

    const nationalReadings = useAppSelector(
      state => state.readings.nationalReadings,
    );
    const sectionImages = useAppSelector(state => state.settings.sectionImages);
    const loading = useAppSelector(
      state => state.readings.areNationalReadingsLoading,
    );
    const areMoreData = useAppSelector(
      state => state.readings.areMoreNationalReadings,
    );
    const error = useAppSelector(state => state.readings.nationalReadingsError);
    console.log(nationalReadings);
    useLayoutEffect(() => {
      dispatch(
        actions.getNationalReadings.request({
          offset: 0,
          limit: 30,
          withReset: true,
        }),
      );
    }, [dispatch]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getNationalReadings = useCallback(
      debounce((withResetOffest?: boolean, customFilter?: string) => {
        let customOffset = offset;

        if (withResetOffest) {
          setOffest(0);
          customOffset = 0;
        }

        dispatch(
          actions.getNationalReadings.request({
            offset: withResetOffest ? 0 : offset,
            limit: 30,
            filter: customFilter,
            withReset: withResetOffest,
          }),
        );

        setOffest(customOffset + 30);
      }, 400),
      [offset],
    );

    const onChangeText = (value: string) => {
      setFilter(value);
      getNationalReadings(true, value);
    };

    const onReachEnd = () => {
      if (areMoreData && !loading) {
        getNationalReadings();
      }
    };

    const renderItem = useCallback(
      ({item}: {item: Reading}) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate('ReadingsDrawerNavigator', {reading: item})
          }>
          <Typography type={TypographyType.Text} numberOfLines={1}>
            {item.description}
          </Typography>
        </TouchableOpacity>
      ),
      [navigation],
    );

    if (error) {
      return (
        <ContentError
          onPressRefresh={() =>
            dispatch(
              actions.getNationalReadings.request({
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
      <FlatList<Reading>
        bounces={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <ImageHeader
              uri={remoteAsset(sectionImages?.national_readings?.url) || ''}>
              <ImageHeaderText content={t('menu:nationalReadings')} />
            </ImageHeader>

            <SearchInput value={filter} onChange={onChangeText} />

            <RoundedListHeader />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          loading ? (
            <View style={styles.loaderContainer}>
              <Loader />
            </View>
          ) : undefined
        }
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={nationalReadings}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReachedThreshold={100}
        onEndReached={onReachEnd}
      />
    );
  };

export default NationalReadingsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  headerContainer: {
    backgroundColor: Colors.background,
    marginBottom: -20,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 30,
  },
  loaderContainer: {
    height: 80,
  },
  itemContainer: {
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
});
