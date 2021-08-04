import React from 'react';

// Components
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
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
  customButtonLabel?: string;
  titleStyle?: StyleProp<TextStyle>;
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
  customButtonLabel,
  titleStyle,
}) => (
  <View
    style={[
      styles.contentContainer,
      position === 'vertical' && styles.verticalContentContainer,
    ]}>
    <View style={[position === 'horizontal' && styles.textContainer]}>
      <Text style={[styles.titleText, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.descriptionText} numberOfLines={2}>
        {description}
      </Text>
    </View>
    <ContentButton
      onPress={onPressButton}
      title={customButtonLabel || 'Czytaj'}
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
    flex: 1,
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
