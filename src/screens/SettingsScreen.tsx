import React from 'react';

// Redux
import {useDispatch} from 'react-redux';
import * as actions from '../store/actions';
import {useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import {Slider} from '@miblanchard/react-native-slider';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import {useTranslation} from 'react-i18next';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type SettingsScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'SettingsScreen'>;
  route: RouteProp<RootNavigatorParamList, 'SettingsScreen'>;
};

const SettingsScreen: React.VFC<SettingsScreenProps> = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const fontSize = useAppSelector(state => state.user.fontSize);
  const sectionImages = useAppSelector(state => state.settings.sectionImages);

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(sectionImages?.settings?.url) || ''}>
        <ImageHeaderText content={t('menu:settings')} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <Text style={styles.title}>{t('settings:fontSize')}</Text>

        <Slider
          value={fontSize}
          onValueChange={value => dispatch(actions.setFontSize(value[0]))}
          thumbTintColor={Colors.primary}
          step={1}
          minimumValue={12}
          maximumValue={28}
          minimumTrackTintColor={Colors.secondary}
        />

        <Text style={styles.subTitle}>{t('settings:sampleText')}</Text>

        <View>
          <Text style={[styles.sampleDescription, {fontSize}]}>
            {t('settings:loremIpsum')}
          </Text>
        </View>
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default SettingsScreen;

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
  title: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  sampleDescription: {
    fontFamily: Fonts.RobotoLight,
  },
});
