import React from 'react';

// Components
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import ContentButton from './ContentButton';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import GlobalStyles from '../constants/GlobalStyles';

type InfoBoxContainerProps = {
  containerStyle?: StyleProp<ViewStyle>;
};

type InfoBoxProps = {
  title: string;
  description?: string;
  onPressButton?: () => void;
  position?: 'vertical' | 'horizontal';
};

export const InfoBoxContainer: React.FC<InfoBoxContainerProps> = ({
  children,
  containerStyle,
}) => (
  <View style={[styles.container, GlobalStyles.shadow, containerStyle]}>
    {children}
  </View>
);

export const InfoBox: React.VFC<InfoBoxProps> = ({
  title,
  description,
  onPressButton,
  position = 'horizontal',
}) => (
  <View
    style={[
      styles.contentContainer,
      position === 'vertical' && styles.verticalContentContainer,
    ]}>
    <View style={[position === 'horizontal' && styles.textContainer]}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
    <ContentButton
      onPress={onPressButton}
      title={'Czytaj'}
      containerStyle={[
        position === 'vertical'
          ? styles.verticalButtonContainer
          : styles.buttonContainer,
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  verticalContentContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
  },
  verticalButtonContainer: {
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
  },
  titleText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
  },
  descriptionText: {
    color: Colors.gray,
    fontSize: 14,
    fontFamily: Fonts.RobotoLight,
    marginTop: 5,
  },
});
