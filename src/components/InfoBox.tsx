import React from 'react';

// Components
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import ContentButton from './ContentButton';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';
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
      <Typography
        type={TypographyType.Title}
        style={titleStyle}
        numberOfLines={1}>
        {title}
      </Typography>
      <Typography
        type={TypographyType.Description}
        style={styles.descriptionText}
        numberOfLines={2}>
        {description}
      </Typography>
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
  descriptionText: {
    marginTop: 5,
  },
});
