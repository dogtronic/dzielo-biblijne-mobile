import React from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

//components
import {StyleSheet, ScrollView, Text} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import ContentError from '../components/ContentError';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import {useTranslation} from 'react-i18next';

// Styles
import Loader from '../components/Loader';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type TermDetailsScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'TermDetailsScreen'>;
  route: RouteProp<RootNavigatorParamList, 'TermDetailsScreen'>;
};

const TermDetailsScreen: React.VFC<TermDetailsScreenProps> = ({route}) => {
  const {termId} = route.params;

  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const term = useAppSelector(state => state.terms.termDetails);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(state => state.terms.isTermDetailsLoading);
  const error = useAppSelector(state => state.terms.termDetailsError);

  React.useEffect(() => {
    dispatch(actions.getTermDetails.request({termId}));
  }, [dispatch, termId]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() =>
          dispatch(actions.getTermDetails.request({termId}))
        }
      />
    );
  }

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.terms?.url) || ''}>
        <ImageHeaderText content={t('menu:words')} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <Text style={styles.title}>{term?.term}</Text>
        <Text style={styles.description}>{term?.description}</Text>
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
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
    marginTop: 30,
  },
});
