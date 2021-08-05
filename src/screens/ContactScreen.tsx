import React, {useEffect} from 'react';

//redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView, Text} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import HtmlViewer from '../components/HtmlViewer';
import Loader from '../components/Loader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import Input from '../components/Input';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import * as actions from '../store/actions';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';
import i18n from '../assets/translations';

// Styles
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Fonts from '../constants/Fonts';

type ContactScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'ContactScreen'>;
  route: RouteProp<RootNavigatorParamList, 'ContactScreen'>;
};

const required = i18n.t<string>('common:requiredField');

const formValidationSchema = Yup.object().shape({
  name: Yup.string().required(required),
  content: Yup.string().max(300).required(required),
});

const ContactScreen: React.VFC<ContactScreenProps> = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const contactDetails = useAppSelector(state => state.settings.contactDetails);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);
  const loading = useAppSelector(
    state => state.settings.isContactDetialsLoading,
  );

  const isMessageSending = useAppSelector(
    state => state.settings.isMessageToAdministratorSending,
  );
  const messageSentInfo = useAppSelector(
    state => state.settings.messageSentInfo,
  );

  useEffect(() => {
    dispatch(actions.getContact.request());
  }, [dispatch]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps={'handled'}>
      <ImageHeader uri={remoteAsset(sectionImages?.contact?.url) || ''}>
        <ImageHeaderText content={t('menu:contact')} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <HtmlViewer html={contactDetails?.content} />

        <Text style={styles.writeToUsHeader}>{t('common:writeToUs')}</Text>

        {messageSentInfo && (
          <Text style={styles.messageSent}>{messageSentInfo}</Text>
        )}

        <Formik
          initialValues={{
            name: '',
            content: '',
          }}
          validationSchema={formValidationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(formValues, helpers) => {
            dispatch(actions.sendMessageToAdministrator.request(formValues));
            helpers.resetForm();
          }}>
          {({handleChange, handleSubmit, handleBlur, values, errors}) => (
            <>
              <Input
                placeholder={t('common:name')}
                value={values.name}
                onChange={handleChange('name')}
                error={errors.name}
                onBlur={handleBlur('name')}
              />

              <Input
                placeholder={t('common:message')}
                value={values.content}
                onChange={handleChange('content')}
                error={errors.content}
                multiline
                maxLength={300}
                onBlur={handleBlur('content')}
              />

              <Button
                title={t('common:send')}
                containerStyle={styles.sendButton}
                onPress={handleSubmit}
                loading={isMessageSending}
              />
            </>
          )}
        </Formik>
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
  sendButton: {
    marginTop: 20,
  },
  writeToUsHeader: {
    marginBottom: 15,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 16,
  },
  messageSent: {
    marginBottom: 15,
    color: Colors.primary,
  },
});
