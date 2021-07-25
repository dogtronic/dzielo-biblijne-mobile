import React, {useCallback, useState, useEffect} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

//components
import {StyleSheet, FlatList, View, Text} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import SearchInput from '../components/SearchInput';
import {TouchableOpacity} from 'react-native-gesture-handler';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import {debounce} from 'ts-debounce';

// Styles
import Loader from '../components/Loader';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

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

    const [offset, setOffest] = useState(10);
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

    useEffect(() => {
      dispatch(
        actions.getNationalReadings.request({
          offset: 0,
          limit: 10,
          withReset: true,
        }),
      );
    }, [dispatch]);

    const getNationalReadings = debounce(
      (withResetOffest?: boolean, customFilter?: string) => {
        let customOffset = offset;

        if (withResetOffest) {
          setOffest(0);
          customOffset = 0;
        }

        dispatch(
          actions.getNationalReadings.request({
            offset: withResetOffest ? 0 : offset,
            limit: 10,
            filter: customFilter,
            withReset: withResetOffest,
          }),
        );

        setOffest(customOffset + 10);
      },
      400,
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
          <Text style={styles.itemText} numberOfLines={1}>
            {item.description}
          </Text>
        </TouchableOpacity>
      ),
      [navigation],
    );

    return (
      <FlatList<Reading>
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <ImageHeader
              uri={remoteAsset(sectionImages?.national_readings?.url) || ''}>
              <ImageHeaderText content={t('menu:nationalReadings')} />
            </ImageHeader>

            <SearchInput value={filter} onChange={onChangeText} />
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
  headerContainer: {
    backgroundColor: Colors.background,
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
  itemText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
  },
});
