import React from 'react';
import {useTranslation} from 'react-i18next';

// Components
import {View, Text, StyleSheet} from 'react-native';
import Button from './Button';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type ContentErrorProps = {
  onPressRefresh?: () => void;
};

const ContentError: React.VFC<ContentErrorProps> = ({onPressRefresh}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('common:serverErrorTitle')}</Text>
      <Text style={styles.description}>
        {t('common:serverErrorDescription')}
      </Text>
      {onPressRefresh && (
        <Button title={t('common:tryAgain')} onPress={onPressRefresh} />
      )}
    </View>
  );
};

export default ContentError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: 30,
  },
  description: {
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: Fonts.RobotoLight,
    fontSize: 13,
  },
  title: {
    textAlign: 'center',
    fontFamily: Fonts.RobotoRegular,
    fontSize: 18,
  },
});
