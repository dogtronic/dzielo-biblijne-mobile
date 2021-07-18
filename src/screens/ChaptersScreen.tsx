import React from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import * as actions from '../store/actions';

// Styles
import Loader from '../components/Loader';
import Colors from '../constants/Colors';
import {RightArrowIcon} from '../assets/svg';
import ChapterButton from '../components/ChapterButton';

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
  const chapters = useAppSelector(state => state.bible.chapters);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.bible.isChaptersLoading);

  React.useEffect(() => {
    dispatch(actions.getChapters.request({bookId}));
  }, [dispatch, bookId]);

  if (loading) {
    return <Loader isAbsolute />;
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

      {chapters.map(v => (
        <ChapterButton key={v.id} item={v} />
      ))}
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
});
