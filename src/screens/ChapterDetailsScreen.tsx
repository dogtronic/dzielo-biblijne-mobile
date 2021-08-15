import React, {useEffect} from 'react';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

// Components
import {StyleSheet, ScrollView, useWindowDimensions, View} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import {RightArrowIcon} from '../assets/svg';
import HtmlViewer from '../components/HtmlViewer';
import Loader from '../components/Loader';
import ContentError from '../components/ContentError';
import TopRoundedContainer from '../components/TopRoundedContainer';
import Typography, {TypographyType} from '../components/Typography';
import ContentButton from '../components/ContentButton';

// Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

// Utils
import {remoteAsset} from '../utils/remoteAsset';
import * as actions from '../store/actions';
import {useTranslation} from 'react-i18next';

// Styles
import Colors from '../constants/Colors';

type BibleScreenProps = {
  navigation: StackNavigationProp<
    RootNavigatorParamList,
    'ChapterDetailsScreen'
  >;
  route: RouteProp<RootNavigatorParamList, 'ChapterDetailsScreen'>;
};

const BibleScreen: React.VFC<BibleScreenProps> = ({route, navigation}) => {
  const {chapterId} = route.params;

  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const windowWidth = useWindowDimensions().width;

  const chapter = useAppSelector(state => state.bible.chapterDetails);
  const {isNextChapter, isPreviousChapter} = useAppSelector(
    state => state.bible,
  );
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
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <ImageHeader
        uri={
          chapter?.bible_book.testament === 'Stary'
            ? remoteAsset(sectionImages?.old_testament?.url) || ''
            : remoteAsset(sectionImages?.new_testament?.url) || ''
        }>
        <ImageHeaderText
          content={chapter?.bible_book.name || ''}
          underline
          onPress={() => navigation.navigate('BibleScreen')}
          textStyle={{maxWidth: windowWidth - 130}}
        />
        <RightArrowIcon style={styles.headerArrow} />
        {chapter?.bible_book && (
          <ImageHeaderText
            content={chapter?.number.toString()}
            underline
            onPress={() =>
              navigation.navigate('ChaptersScreen', {
                bookId: chapter?.bible_book.id,
                testament: chapter?.bible_book.testament,
              })
            }
          />
        )}
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <Typography type={TypographyType.Title} style={styles.title} resizeable>
          {chapter?.title}
        </Typography>

        <HtmlViewer html={chapter?.text} containerStyle={styles.content} />

        <View style={styles.buttonsContainer}>
          <ContentButton
            title={t('common:previous')}
            onPress={() =>
              isPreviousChapter &&
              navigation.navigate('ChapterDetailsScreen', {
                chapterId: isPreviousChapter,
              })
            }
            disabled={isPreviousChapter === undefined}
          />

          <ContentButton
            title={t('common:nextChapter')}
            onPress={() =>
              isNextChapter &&
              navigation.navigate('ChapterDetailsScreen', {
                chapterId: isNextChapter,
              })
            }
            disabled={isNextChapter === undefined}
          />
        </View>
      </TopRoundedContainer>
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
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    marginHorizontal: 20,
  },
  textContainer: {
    paddingHorizontal: 0,
    marginTop: 30,
  },
});
