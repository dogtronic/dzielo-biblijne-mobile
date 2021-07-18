import React, {useState} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView, View} from 'react-native';
import TopRoundedContainer from '../components/TopRoundedContainer';
import {ReadingListItem} from '../components/ReadingListItem';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import {InfoBox, InfoBoxContainer} from '../components/InfoBox';

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

// Models
import {BookItem} from '../components/BookItem';

type BibleScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'BibleScreen'>;
  route: RouteProp<RootNavigatorParamList, 'BibleScreen'>;
};

const BibleScreen: React.VFC<BibleScreenProps> = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [isOldTestamentOpen, setIsOldTestamentOpen] = useState(false);
  const [isNewTestamentOpen, setIsNewTestamentOpen] = useState(false);

  const books = useAppSelector(state => state.bible.books);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.bible.isBooksLoading);

  const oldTestament = books.filter(v => v.testament === 'Stary');
  const newTestament = books.filter(v => v.testament === 'Nowy');

  React.useEffect(() => {
    dispatch(actions.getBooks.request());
  }, [dispatch]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.bible?.url) || ''}>
        <ImageHeaderText content={t('dashboard:bibleHeader')} />
      </ImageHeader>

      <View style={styles.insideContainer}>
        <InfoBoxContainer>
          <InfoBox
            title={t('bible:continueReading')}
            description={'Mt 2, 14'}
          />
        </InfoBoxContainer>
      </View>

      <TopRoundedContainer>
        <ReadingListItem
          title={t('bible:oldTestamentHeader')}
          description={t('bible:oldTestamentDescription')}
          uri={remoteAsset(sectionImages?.old_testament?.url)}
          customButtonLabel={
            isOldTestamentOpen ? t('common:hide') : t('common:show')
          }
          onPressButton={() => setIsOldTestamentOpen(!isOldTestamentOpen)}>
          {isOldTestamentOpen &&
            oldTestament.map((v, index) => (
              <BookItem key={v.id} item={v} withoutTopLine={index === 0} />
            ))}
        </ReadingListItem>

        <ReadingListItem
          title={t('bible:newTestamentHeader')}
          description={t('bible:newTestamentDescription')}
          uri={remoteAsset(sectionImages?.new_testament?.url)}
          customButtonLabel={
            isNewTestamentOpen ? t('common:hide') : t('common:show')
          }
          onPressButton={() => setIsNewTestamentOpen(!isNewTestamentOpen)}>
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
  contentContainer: {
    flexGrow: 1,
  },
  insideContainer: {
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
  },
});
