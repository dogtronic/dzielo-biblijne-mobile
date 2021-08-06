import React from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import HtmlViewer from '../components/HtmlViewer';
import Loader from '../components/Loader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import ContentError from '../components/ContentError';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import * as actions from '../store/actions';
import {useTranslation} from 'react-i18next';

// Styles
import Colors from '../constants/Colors';

type RecommendedScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'RecommendedScreen'>;
  route: RouteProp<RootNavigatorParamList, 'RecommendedScreen'>;
};

const RecommendedScreen: React.VFC<RecommendedScreenProps> = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const recommendedDetails = useAppSelector(
    state => state.settings.recommendedDetails,
  );
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(
    state => state.settings.isRecommendedDetailsLoading,
  );
  const error = useAppSelector(state => state.settings.recommendedError);

  React.useEffect(() => {
    dispatch(actions.getRecommended.request());
  }, [dispatch]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() => dispatch(actions.getRecommended.request())}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.contact?.url) || ''}>
        <ImageHeaderText content={t('menu:recommendations')} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <HtmlViewer html={recommendedDetails?.content} />
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default RecommendedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  textContainer: {
    marginTop: 30,
  },
});
