import React from 'react';
import {useTranslation} from 'react-i18next';

// Components
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BellIcon, CloseIcon} from '../assets/svg';
import {InfoBox, InfoBoxContainer} from './InfoBox';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';

type NotificationProps = {
  title: string;
  description?: string;
  onPressButton?: () => void;
  onPressClose?: () => void;
  uri?: string;
  customButtonLabel?: string;
  isRead?: boolean;
  children?: React.ReactNode;
};

export const Notification: React.FC<NotificationProps> = ({
  title,
  description,
  onPressButton,
  onPressClose,
  customButtonLabel,
  children,
  isRead,
}) => {
  const {t} = useTranslation();

  return (
    <InfoBoxContainer containerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.insideHeaderContainer}>
          <BellIcon fill={isRead ? Colors.gray : Colors.primary} />
          <Typography
            type={TypographyType.SmallDescription}
            style={styles.notificationHeader}>
            {t('common:notification')}
          </Typography>
        </View>

        {!!onPressClose && (
          <TouchableOpacity
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            onPress={onPressClose}>
            <CloseIcon fill={Colors.primary} height={13} width={13} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.insideContainer}
        onPress={onPressButton}
        activeOpacity={0.7}>
        <InfoBox
          title={title}
          description={description}
          onPressButton={onPressButton}
          position="horizontal"
          customButtonLabel={customButtonLabel}
          titleStyle={[isRead && styles.isReadTitle]}
        />
      </TouchableOpacity>
      {children}
    </InfoBoxContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 25,
  },
  insideContainer: {
    flexDirection: 'row',
  },
  image: {
    height: 110,
    width: 110,
    borderRadius: 10,
    marginRight: 15,
    marginTop: -28,
  },
  headerContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  insideHeaderContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  notificationHeader: {
    marginLeft: 10,
  },
  isReadTitle: {
    color: Colors.gray,
  },
});
