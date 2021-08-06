import React from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView, View} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import ChapterButton from '../components/ChapterButton';
import Loader from '../components/Loader';
import {RightArrowIcon} from '../assets/svg';
import ContentError from '../components/ContentError';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import * as actions from '../store/actions';

// Styles
import Colors from '../constants/Colors';

type BibleScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'ChaptersScreen'>;
  route: RouteProp<RootNavigatorParamList, 'ChaptersScreen'>;
};

const BibleScreen: React.VFC<BibleScreenProps> = ({route}) => {
  const {bookId, testament} = route.params;

  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const book = useAppSelector(state =>
    state.bible.books.find(v => v.id === bookId),
  );
  const chapters = useAppSelector(state =>
    state.bible.chapters.sort((v, w) => (v.number < w.number ? -1 : 1)),
  );
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.bible.isChaptersLoading);
  const error = useAppSelector(state => state.bible.chaptersError);

  React.useEffect(() => {
    dispatch(actions.getChapters.request({bookId}));
  }, [dispatch, bookId]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() => dispatch(actions.getChapters.request({bookId}))}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader
        uri={
          testament === 'Stary'
            ? remoteAsset(sectionImages?.old_testament?.url) || ''
            : remoteAsset(sectionImages?.new_testament?.url) || ''
        }>
        <ImageHeaderText content={book?.name || ''} underline />
        <RightArrowIcon style={styles.headerArrow} />
        <ImageHeaderText content={t('bible:chapter')} disabled />
      </ImageHeader>

      <View style={styles.chaptersMiddleContainer}>
        <View style={styles.chaptersContainer}>
          {chapters.map(v => (
            <ChapterButton key={v.id} item={v} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default BibleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  insideContainer: {
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  headerArrow: {
    marginHorizontal: 5,
  },
  chaptersMiddleContainer: {
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  chaptersContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
