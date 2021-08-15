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
import DeviceInfo from 'react-native-device-info';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Models
import {Term} from '../store/types/Term.model';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TopRoundedContainer from '../components/TopRoundedContainer';
import TermDetailsTablet from '../components/TermDetailsTablet';

type TermsListScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'TermsListScreen'>;
  route: RouteProp<RootNavigatorParamList, 'TermsListScreen'>;
};

const TermsListScreen: React.VFC<TermsListScreenProps> = ({
  navigation,
  route,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const isTablet = DeviceInfo.isTablet();

  const {type} = route.params;

  const [offset, setOffest] = useState(30);
  const [filter, setFilter] = useState('');
  const [selectedTermId, setSelectedTermId] = useState<number | undefined>(
    undefined,
  );

  const terms = useAppSelector(state => state.terms.terms);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.terms.areTermsLoading);
  const areMoreData = useAppSelector(state => state.terms.areMoreTerms);
  const error = useAppSelector(state => state.terms.termsError);

  useEffect(() => {
    dispatch(
      actions.getTerms.request({offset: 0, limit: 30, withReset: true, type}),
    );
  }, [dispatch, type]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTerms = useCallback(
    debounce((withResetOffest?: boolean, customFilter?: string) => {
      let customOffset = offset;

      if (withResetOffest) {
        setOffest(0);
        customOffset = 0;
      }

      dispatch(
        actions.getTerms.request({
          offset: withResetOffest ? 0 : offset,
          limit: 30,
          filter: customFilter,
          withReset: withResetOffest,
          type,
        }),
      );

      setOffest(customOffset + 30);
    }, 600),
    [offset, type],
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
        style={[
          styles.itemContainer,
          isTablet && styles.itemContainerTablet,
          isTablet &&
            item.id === selectedTermId &&
            styles.itemContainerSelectedTablet,
        ]}
        onPress={() =>
          isTablet
            ? setSelectedTermId(item.id)
            : navigation.navigate('TermDetailsScreen', {termId: item.id, type})
        }>
        <Text
          style={[
            styles.itemText,
            isTablet &&
              item.id === selectedTermId &&
              styles.itemSelectedTextTablet,
          ]}
          numberOfLines={1}>
          {item.term}
        </Text>
      </TouchableOpacity>
    ),
    [navigation, type, isTablet, selectedTermId],
  );

  if (error) {
    return (
      <ContentError
        onPressRefresh={() =>
          dispatch(
            actions.getTerms.request({
              offset: 0,
              limit: 30,
              withReset: true,
              type,
            }),
          )
        }
      />
    );
  }

  if (isTablet) {
    return (
      <View style={styles.tabletContainer}>
        <View style={styles.headerContainerTablet}>
          <ImageHeader
            uri={
              (type === 'words'
                ? remoteAsset(sectionImages?.terms?.url)
                : remoteAsset(sectionImages?.bible_dictionary?.url)) || ''
            }>
            <ImageHeaderText
              content={
                type === 'words' ? t('menu:words') : t('menu:bibleDictionary')
              }
            />
          </ImageHeader>

          <SearchInput value={filter} onChange={onChangeText} />
        </View>

        <TopRoundedContainer style={styles.textContainerTablet}>
          <FlatList<Term>
            bounces={false}
            ListFooterComponent={
              loading ? (
                <View style={styles.loaderContainer}>
                  <Loader />
                </View>
              ) : undefined
            }
            data={terms}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            onEndReachedThreshold={200}
            onEndReached={onReachEnd}
            style={styles.flexContainer}
          />
          <View style={[styles.flexContainer]}>
            <TermDetailsTablet termId={selectedTermId} type={type} />
          </View>
        </TopRoundedContainer>
      </View>
    );
  }

  return (
    <FlatList<Term>
      bounces={false}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <ImageHeader
            uri={
              (type === 'words'
                ? remoteAsset(sectionImages?.terms?.url)
                : remoteAsset(sectionImages?.bible_dictionary?.url)) || ''
            }>
            <ImageHeaderText
              content={
                type === 'words' ? t('menu:words') : t('menu:bibleDictionary')
              }
            />
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
  },
  headerContainer: {
    backgroundColor: Colors.background,
    marginBottom: -30,
  },
  headerContainerTablet: {
    backgroundColor: Colors.background,
    paddingBottom: 30,
  },
  textContainerTablet: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingTop: 30,
    alignItems: 'flex-start',
  },
  tabletContainer: {
    flex: 1,
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
  itemContainerTablet: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    marginHorizontal: 10,
    marginRight: 20,
  },
  itemContainerSelectedTablet: {
    marginLeft: 20,
    borderBottomColor: Colors.primary,
  },
  itemSelectedTextTablet: {
    color: Colors.primary,
  },
  itemText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
  },
  flexContainer: {
    flex: 1,
  },
});
