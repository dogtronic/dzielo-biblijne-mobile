import React from 'react';

// Components
import {StyleSheet, View, TextStyle, StyleProp} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

type ImageHeaderProps = {
  uri: string;
  subTitle?: string;
  children?: React.ReactNode;
};

type ImageHeaderTextProps = {
  content?: string;
  underline?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
};

const ImageHeader: React.FC<ImageHeaderProps> = ({uri, children, subTitle}) => (
  <>
    <FastImage
      source={{uri, priority: FastImage.priority.high}}
      style={styles.image}
    />
    <View style={[styles.container, GlobalStyles.shadow]}>
      <View style={styles.textContainer}>{children}</View>
      {subTitle && (
        <Typography
          type={TypographyType.SmallDescription}
          style={styles.subTitle}>
          {subTitle}
        </Typography>
      )}
    </View>
  </>
);

export const ImageHeaderText: React.FC<ImageHeaderTextProps> = ({
  content,
  underline,
  disabled,
  onPress,
  textStyle,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
    <Typography
      type={TypographyType.HugeMainHeader}
      style={[
        underline && styles.underlineText,
        disabled && styles.disabledText,
        textStyle,
      ]}
      numberOfLines={1}>
      {content}
    </Typography>
  </TouchableOpacity>
);

export default ImageHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: Colors.white,
    minWidth: 160,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: -24,
  },
  image: {
    height: 80,
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '94%',
    marginTop: 5,
  },
  headerText: {
    marginTop: 2,
  },
  disabledText: {
    color: Colors.gray,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  subTitle: {
    marginTop: -5,
    marginBottom: 2,
  },
});
