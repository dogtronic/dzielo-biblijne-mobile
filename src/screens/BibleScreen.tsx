import React, {useState} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

//components
import {StyleSheet, ScrollView, View} from 'react-native';
import TopRoundedContainer from '../components/TopRoundedContainer';
import {ReadingListItem} from '../components/ReadingListItem';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import {InfoBox, InfoBoxContainer} from '../components/InfoBox';
import ContentError from '../components/ContentError';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import DeviceInfo from 'react-native-device-info';

// Styles
import Loader from '../components/Loader';
import Colors from '../constants/Colors';

// Models
import {BookItem} from '../components/BookItem';

type BibleScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'BibleScreen'>;
  route: RouteProp<RootNavigatorParamList, 'BibleScreen'>;
};

const BibleScreen: React.FC<BibleScreenProps> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const isTablet = DeviceInfo.isTablet();

  const [isOldTestamentOpen, setIsOldTestamentOpen] = useState(isTablet);
  const [isNewTestamentOpen, setIsNewTestamentOpen] = useState(isTablet);

  const books = useAppSelector(state => state.bible.books);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.bible.isBooksLoading);
  const error = useAppSelector(state => state.bible.booksError);

  const oldTestament = books.filter(v => v.testament === 'Stary');
  const newTestament = books.filter(v => v.testament === 'Nowy');

  const lastReadFragment = useAppSelector(
    state => state.user.lastReadBibleFragment,
  );

  React.useLayoutEffect(() => {
    dispatch(actions.getBooks.request());
  }, [dispatch]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() => dispatch(actions.getBooks.request())}
      />
    );
  }

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.bible?.url) || ''}>
        <ImageHeaderText content={t('dashboard:bibleHeader')} />
      </ImageHeader>

      {lastReadFragment && (
        <View style={styles.insideContainer}>
          <InfoBoxContainer>
            <InfoBox
              title={t('bible:continueReading')}
              description={`${lastReadFragment.siglum} ${lastReadFragment.chapterNumber}`}
              onPressButton={() =>
                navigation.navigate('ChapterDetailsScreen', {
                  chapterId: lastReadFragment.chapterId,
                })
              }
            />
          </InfoBoxContainer>
        </View>
      )}

      <TopRoundedContainer
        style={[styles.textContainer, isTablet && styles.tabletTextContainer]}>
        <ReadingListItem
          title={t('bible:oldTestamentHeader')}
          uri={remoteAsset(sectionImages?.old_testament?.url)}
          customButtonLabel={
            isOldTestamentOpen ? t('common:hide') : t('common:show')
          }
          onPressButton={() => setIsOldTestamentOpen(!isOldTestamentOpen)}
          containerStyle={[isTablet && styles.tabletItem]}>
          {isOldTestamentOpen &&
            oldTestament.map((v, index) => (
              <BookItem key={v.id} item={v} withoutTopLine={index === 0} />
            ))}
        </ReadingListItem>

        <View style={[isTablet && styles.tabletSeparator]} />

        <ReadingListItem
          title={t('bible:newTestamentHeader')}
          uri={remoteAsset(sectionImages?.new_testament?.url)}
          customButtonLabel={
            isNewTestamentOpen ? t('common:hide') : t('common:show')
          }
          onPressButton={() => setIsNewTestamentOpen(!isNewTestamentOpen)}
          containerStyle={[isTablet && styles.tabletItem]}>
          {isNewTestamentOpen &&
            newTestament.map((v, index) => (
              <BookItem key={v.id} item={v} withoutTopLine={index === 0} />
            ))}
        </ReadingListItem>
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default BibleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  textContainer: {
    marginTop: 30,
  },
  contentContainer: {
    flexGrow: 1,
  },
  insideContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  tabletTextContainer: {
    flexDirection: 'row',
    paddingTop: 30,
  },
  tabletItem: {
    flex: 1,
  },
  tabletSeparator: {
    width: 50,
  },
});
