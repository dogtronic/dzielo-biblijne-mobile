import React from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import {RightArrowIcon} from '../assets/svg';
import HtmlViewer from '../components/HtmlViewer';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import * as actions from '../store/actions';

// Styles
import Loader from '../components/Loader';
import Colors from '../constants/Colors';

type BibleScreenProps = {
  navigation: StackNavigationProp<
    RootNavigatorParamList,
    'ChapterDetailsScreen'
  >;
  route: RouteProp<RootNavigatorParamList, 'ChapterDetailsScreen'>;
};

const BibleScreen: React.VFC<BibleScreenProps> = ({route}) => {
  const {chapterId} = route.params;

  // const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const chapter = useAppSelector(state => state.bible.chapterDetails);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.bible.isChapterDetailsLoading);

  React.useEffect(() => {
    dispatch(actions.getChapterDetails.request({chapterId}));
  }, [dispatch, chapterId]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
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

      <HtmlViewer html={chapter?.text} />
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
  headerArrow: {
    marginHorizontal: 5,
  },
});
