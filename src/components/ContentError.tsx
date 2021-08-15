import React from 'react';
import {useTranslation} from 'react-i18next';

// Components
import {View, StyleSheet} from 'react-native';
import Button from './Button';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';

type ContentErrorProps = {
  onPressRefresh?: () => void;
};

const ContentError: React.VFC<ContentErrorProps> = ({onPressRefresh}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Typography type={TypographyType.BigHeader} style={styles.title}>
        {t('common:serverErrorTitle')}
      </Typography>
      <Typography type={TypographyType.Description} style={styles.description}>
        {t('common:serverErrorDescription')}
      </Typography>
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
  },
  title: {
    color: Colors.black,
  },
});
