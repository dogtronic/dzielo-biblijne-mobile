import React, {useCallback, useState, useEffect} from 'react';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

// Components
import {StyleSheet, FlatList, View, Text} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import SearchInput from '../components/SearchInput';
import ContentError from '../components/ContentError';
import RoundedListHeader from '../components/RoundedListHeader';
import Loader from '../components/Loader';

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
import Fonts from '../constants/Fonts';

// Models
import {Term} from '../store/types/Term.model';
import {TouchableOpacity} from 'react-native-gesture-handler';

type TermsListScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'TermsListScreen'>;
  route: RouteProp<RootNavigatorParamList, 'TermsListScreen'>;
};

const TermsListScreen: React.VFC<TermsListScreenProps> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [offset, setOffest] = useState(10);
  const [filter, setFilter] = useState('');

  const terms = useAppSelector(state => state.terms.terms);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.terms.areTermsLoading);
  const areMoreData = useAppSelector(state => state.terms.areMoreTerms);
  const error = useAppSelector(state => state.terms.termsError);

  useEffect(() => {
    dispatch(actions.getTerms.request({offset: 0, limit: 10, withReset: true}));
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTerms = useCallback(
    debounce((withResetOffest?: boolean, customFilter?: string) => {
      let customOffset = offset;
      console.log('call');
      if (withResetOffest) {
        setOffest(0);
        customOffset = 0;
      }

      dispatch(
        actions.getTerms.request({
          offset: withResetOffest ? 0 : offset,
          limit: 10,
          filter: customFilter,
          withReset: withResetOffest,
        }),
      );

      setOffest(customOffset + 10);
    }, 600),
    [offset],
  );

  const onChangeText = (value: string) => {
    setFilter(value);
    getTerms(true, value);
  };

  const onReachEnd = () => {
    if (areMoreData && !loading) {
      getTerms();
    }
  };

  const renderItem = useCallback(
    ({item}: {item: Term}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('TermDetailsScreen', {termId: item.id})
        }>
        <Text style={styles.itemText} numberOfLines={1}>
          {item.term}
        </Text>
      </TouchableOpacity>
    ),
    [navigation],
  );

  if (error) {
    return (
      <ContentError
        onPressRefresh={() =>
          dispatch(
            actions.getTerms.request({offset: 0, limit: 10, withReset: true}),
          )
        }
      />
    );
  }

  return (
    <FlatList<Term>
      bounces={false}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <ImageHeader uri={remoteAsset(sectionImages?.terms?.url) || ''}>
            <ImageHeaderText content={t('menu:words')} />
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
      data={terms}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReachedThreshold={200}
      onEndReached={onReachEnd}
    />
  );
};

export default TermsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    backgroundColor: Colors.background,
    marginBottom: -30,
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
