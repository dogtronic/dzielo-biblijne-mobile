import React, {useMemo} from 'react';

// components
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import CrossBig from '../assets/svg/CrossBig';
import {CloseIcon} from '../assets/svg';
import DrawerButton from './DrawerButton';

// styles
import Colors from '../constants/Colors';

//utils
import {useTranslation} from 'react-i18next';

type DrawerProps = {
  closeDrawer?: () => void;
  navigate?: (name: string, params?: unknown) => void;
};

const Drawer: React.VFC<DrawerProps> = ({closeDrawer, navigate}) => {
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
        name: t('menu:announcements'),
        onPress: () => null,
      },
      {
        name: t('menu:words'),
        onPress: () => navigate?.('TermsListScreen'),
      },
      {
        name: t('menu:curiosities'),
        onPress: () => navigate?.('CuriosityBaseScreen', {type: 'curiosity'}),
      },
      {
        name: t('menu:biblemap'),
        onPress: () => navigate?.('CuriosityBaseScreen', {type: 'photo'}),
      },
      {
        name: t('menu:recommendations'),
        onPress: () => navigate?.('RecommendedScreen'),
      },
      {
        name: t('menu:contact'),
        onPress: () => navigate?.('ContactScreen'),
      },
    ],
    [t, navigate],
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo_white_medium.png')}
          style={styles.icon}
        />
        <TouchableOpacity onPress={closeDrawer}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <CrossBig style={styles.cross} />

      <View style={styles.optionsContainer}>
        {topMenu.map((v, index) => (
          <DrawerButton key={index} title={v.name} onPress={v.onPress} />
        ))}

        <View style={styles.separator} />

        {bottomMenu.map((v, index) => (
          <DrawerButton key={index} title={v.name} onPress={v.onPress} />
        ))}
      </View>
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
