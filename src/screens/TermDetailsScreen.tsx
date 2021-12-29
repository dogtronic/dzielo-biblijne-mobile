import React from 'react';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

// Components
import {StyleSheet, ScrollView} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import ContentError from '../components/ContentError';
import Loader from '../components/Loader';
import Typography, {TypographyType} from '../components/Typography';

// Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

// Utils
import {remoteAsset} from '../utils/remoteAsset';
import {useTranslation} from 'react-i18next';

// Styles
import Colors from '../constants/Colors';

// Models
import {TermType} from '../store/types/Term.model';

type TermDetailsScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'TermDetailsScreen'>;
  route: RouteProp<RootNavigatorParamList, 'TermDetailsScreen'>;
};

const TermDetailsScreen: React.VFC<TermDetailsScreenProps> = ({route}) => {
  const {termId, type} = route.params;

  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const term = useAppSelector(state => state.terms.termDetails);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.terms.isTermDetailsLoading);
  const error = useAppSelector(state => state.terms.termDetailsError);

  React.useLayoutEffect(() => {
    dispatch(actions.getTermDetails.request({termId, type}));
  }, [dispatch, termId, type]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() =>
          dispatch(actions.getTermDetails.request({termId, type}))
        }
      />
    );
  }

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      scrollIndicatorInsets={{right: 1}}>
      <ImageHeader
        uri={
          (type === TermType.Words
            ? remoteAsset(sectionImages?.terms?.url)
            : remoteAsset(sectionImages?.bible_dictionary?.url)) || ''
        }>
        <ImageHeaderText
          content={
            type === TermType.Words
              ? t('menu:words')
              : t('menu:bibleDictionary')
          }
        />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <Typography type={TypographyType.Title} resizeable>
          {term?.term}
        </Typography>
        <Typography
          type={TypographyType.Text}
          style={styles.description}
          resizeable>
          {term?.description}
        </Typography>
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default TermDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  textContainer: {
    marginTop: 40,
    paddingVertical: 30,
  },
  description: {
    marginTop: 30,
  },
});
