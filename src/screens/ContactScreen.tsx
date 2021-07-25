import React from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import HtmlViewer from '../components/HtmlViewer';
import Loader from '../components/Loader';
import TopRoundedContainer from '../components/TopRoundedContainer';

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

type ContactScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'ContactScreen'>;
  route: RouteProp<RootNavigatorParamList, 'ContactScreen'>;
};

const ContactScreen: React.VFC<ContactScreenProps> = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const contactDetails = useAppSelector(state => state.settings.contactDetails);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(
    state => state.settings.isContactDetialsLoading,
  );

  React.useEffect(() => {
    dispatch(actions.getContact.request());
  }, [dispatch]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.contact?.url) || ''}>
        <ImageHeaderText content={t('menu:contact')} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <HtmlViewer html={contactDetails?.content} />
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default ContactScreen;

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
