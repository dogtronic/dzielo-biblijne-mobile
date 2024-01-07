import React from 'react';

// Redux
import {useDispatch} from 'react-redux';
import * as actions from '../store/actions';
import {useAppSelector} from '../hooks/useAppDispatch';

//components
import {StyleSheet, ScrollView, View} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';
import {Slider} from '@miblanchard/react-native-slider';
import Typography, {TypographyType} from '../components/Typography';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';

// Styles
import Colors from '../constants/Colors';

type SettingsScreenProps = {
  navigation: StackNavigationProp<RootNavigatorParamList, 'SettingsScreen'>;
  route: RouteProp<RootNavigatorParamList, 'SettingsScreen'>;
};

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
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
        <Typography type={TypographyType.Title} style={styles.title}>
          {t('settings:fontSize')}
        </Typography>

        <Slider
          value={fontSize}
          onValueChange={value => dispatch(actions.setFontSize(value[0]))}
          thumbTintColor={Colors.primary}
          step={1}
          minimumValue={12}
          maximumValue={28}
          minimumTrackTintColor={Colors.secondary}
        />

        <Typography type={TypographyType.Description} style={styles.subTitle}>
          {t('settings:sampleText')}
        </Typography>

        <View>
          <Typography type={TypographyType.Text} style={{fontSize}}>
            {t('settings:loremIpsum')}
          </Typography>
        </View>

        <View style={styles.versionContainer}>
          <Typography type={TypographyType.Header} style={styles.primaryText}>
            {t('settings:appName')}
          </Typography>
          <Typography type={TypographyType.Description}>
            {t('settings:version')}: v{DeviceInfo.getVersion()}
          </Typography>
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
    fontWeight: '500',
    marginBottom: 10,
  },
  subTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  versionContainer: {
    marginTop: 40,
  },
  primaryText: {
    color: Colors.primary,
  },
});
