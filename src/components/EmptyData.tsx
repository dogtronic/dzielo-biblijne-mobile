import React from 'react';
import {useTranslation} from 'react-i18next';

// components
import {StyleSheet, View} from 'react-native';
import Typography, {TypographyType} from './Typography';

const EmptyData: React.FC = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Typography type={TypographyType.Text}>
        {t('common:dataNotFound')}
      </Typography>
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
});
