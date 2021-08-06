import React, {useEffect} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView, Text} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import {RightArrowIcon} from '../assets/svg';
import HtmlViewer from '../components/HtmlViewer';
import Loader from '../components/Loader';
import ContentError from '../components/ContentError';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import * as actions from '../store/actions';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type BibleScreenProps = {
  navigation: StackNavigationProp<
    RootNavigatorParamList,
    'ChapterDetailsScreen'
  >;
  route: RouteProp<RootNavigatorParamList, 'ChapterDetailsScreen'>;
};

const BibleScreen: React.VFC<BibleScreenProps> = ({route}) => {
  const {chapterId} = route.params;

  const dispatch = useAppDispatch();

  const chapter = useAppSelector(state => state.bible.chapterDetails);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.bible.isChapterDetailsLoading);
  const error = useAppSelector(state => state.bible.chapterDetailsError);

  useEffect(() => {
    dispatch(actions.getChapterDetails.request({chapterId}));
  }, [dispatch, chapterId]);

  useEffect(() => {
    if (chapter) {
      dispatch(
        actions.setLastReadBibleFragment({
          chapterId: chapter.id,
          bookId: chapter.bible_book.id,
          siglum: chapter.bible_book.siglum,
          chapterNumber: chapter.number,
        }),
      );
    }
  }, [chapter, dispatch]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() => actions.getChapterDetails.request({chapterId})}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <ImageHeader
        uri={
          chapter?.bible_book.testament === 'Stary'
            ? remoteAsset(sectionImages?.old_testament?.url) || ''
            : remoteAsset(sectionImages?.new_testament?.url) || ''
        }>
        <ImageHeaderText content={chapter?.bible_book.name || ''} underline />
        <RightArrowIcon style={styles.headerArrow} />
        <ImageHeaderText content={chapter?.number.toString()} underline />
      </ImageHeader>

      <Text style={styles.title}>{chapter?.title}</Text>

      <HtmlViewer html={chapter?.text} containerStyle={styles.content} />
    </ScrollView>
  );
};

export default BibleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  headerArrow: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    marginTop: 20,
    marginHorizontal: 20,
  },
});
