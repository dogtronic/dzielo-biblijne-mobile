import React, {useMemo} from 'react';

// Components
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CrossBig from '../assets/svg/CrossBig';
import {CloseIcon} from '../assets/svg';
import DrawerButton from './DrawerButton';
import {ScrollView} from 'react-native-gesture-handler';
import LogoMediumIcon from '../assets/svg/LogoMediumIcon';

// Styles
import Colors from '../constants/Colors';

// Utils
import {useTranslation} from 'react-i18next';

// Models
import {TermType} from '../store/types/Term.model';
import {CuriosityType} from '../store/types/Curiosity.model';

type DrawerProps = {
  closeDrawer?: () => void;
  navigate?: ((name: string, params?: unknown) => void) | undefined;
};

const Drawer: React.FC<DrawerProps> = ({closeDrawer, navigate}) => {
  const {t} = useTranslation();

  const topMenu = useMemo(
    () => [
      {
        name: t('menu:startPage'),
        onPress: () => navigate?.('DashboardScreen'),
      },
      {
        name: t('menu:bible'),
        onPress: () => navigate?.('BibleScreen'),
      },
      {
        name: t('menu:sundayReading'),
        onPress: () => navigate?.('ReadingsScreen'),
      },
      {
        name: t('menu:homily'),
        onPress: () => navigate?.('HomiliesListScreen'),
      },
      {
        name: t('menu:nationalReadings'),
        onPress: () => navigate?.('NationalReadingsListScreen'),
      },
    ],
    [t, navigate],
  );

  const bottomMenu = useMemo(
    () => [
      {
        name: t('menu:words'),
        onPress: () => navigate?.('TermsListScreen', {type: TermType.Words}),
      },
      {
        name: t('menu:bibleDictionary'),
        onPress: () =>
          navigate?.('TermsListScreen', {type: TermType.BibleDictionary}),
      },
      {
        name: t('menu:curiosities'),
        onPress: () =>
          navigate?.('CuriosityBaseScreen', {type: CuriosityType.Curiosity}),
      },
      {
        name: t('menu:biblemap'),
        onPress: () => navigate?.('BibleMapScreen'),
      },
      {
        name: t('menu:announcements'),
        onPress: () => navigate?.('NotificationsScreen'),
      },
      {
        name: t('menu:recommendations'),
        onPress: () => navigate?.('RecommendedScreen'),
      },
      {
        name: t('menu:contact'),
        onPress: () => navigate?.('ContactScreen'),
      },
      {
        name: t('menu:settings'),
        onPress: () => navigate?.('SettingsScreen'),
      },
    ],
    [t, navigate],
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoMediumIcon style={styles.icon} />

        <TouchableOpacity
          onPress={closeDrawer}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <CrossBig style={styles.cross} />

      <ScrollView style={styles.optionsContainer}>
        {topMenu.map((v, index) => (
          <DrawerButton key={index} title={v.name} onPress={v.onPress} />
        ))}

        <View style={styles.separator} />

        {bottomMenu.map((v, index) => (
          <DrawerButton key={index} title={v.name} onPress={v.onPress} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    paddingLeft: 30,
  },
  optionsContainer: {
    paddingHorizontal: 40,
  },
  icon: {
    marginTop: 30,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.white,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  cross: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
