import React from 'react';

// Components
import {StyleSheet, Text, View, TextStyle, StyleProp} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import GlobalStyles from '../constants/GlobalStyles';

type ImageHeaderProps = {
  uri: string;
  subTitle?: string;
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
    <FastImage source={{uri}} style={styles.image} />
    <View style={[styles.container, GlobalStyles.shadow]}>
      <View style={styles.textContainer}>{children}</View>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  </>
);

export const ImageHeaderText: React.VFC<ImageHeaderTextProps> = ({
  content,
  underline,
  disabled,
  onPress,
  textStyle,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
    <Text
      style={[
        styles.headerText,
        underline && styles.underlineText,
        disabled && styles.disabledText,
        textStyle,
      ]}
      numberOfLines={1}>
      {content}
    </Text>
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
  },
  headerText: {
    color: Colors.primary,
    fontSize: 22,
    fontFamily: Fonts.MartelRegular,
    marginTop: 2,
  },
  disabledText: {
    color: Colors.gray,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  subTitle: {
    color: Colors.gray,
    fontSize: 13,
    fontFamily: Fonts.RobotoLight,
    marginTop: -5,
    marginBottom: 2,
  },
});
