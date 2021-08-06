import React from 'react';
import {useTranslation} from 'react-i18next';

// Components
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BellIcon, CloseIcon} from '../assets/svg';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {InfoBox, InfoBoxContainer} from './InfoBox';

type NotificationProps = {
  title: string;
  description?: string;
  onPressButton?: () => void;
  onPressClose?: () => void;
  uri?: string;
  customButtonLabel?: string;
  isRead?: boolean;
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
          <Text style={styles.notificationHeader}>
            {t('common:notification')}
          </Text>
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
    marginVertical: 15,
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
    color: Colors.gray,
    marginLeft: 10,
    fontSize: 12,
    fontFamily: Fonts.RobotoLight,
  },
  isReadTitle: {
    color: Colors.gray,
  },
});
