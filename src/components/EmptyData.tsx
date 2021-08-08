import React from 'react';
import {useTranslation} from 'react-i18next';

// components
import {StyleSheet, Text, View} from 'react-native';

// styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const EmptyData: React.VFC = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('common:dataNotFound')}</Text>
    </View>
  );
};

export default EmptyData;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
  },
});
