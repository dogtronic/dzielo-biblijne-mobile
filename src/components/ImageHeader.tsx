import React from 'react';

// Components
import {StyleSheet, Text, Image, View} from 'react-native';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import GlobalStyles from '../constants/GlobalStyles';

type ImageHeaderProps = {
  uri: string;
  subTitle?: string;
};

type ImageHeaderTextProps = {
  content: string;
  underline?: boolean;
  disabled?: boolean;
};

const ImageHeader: React.FC<ImageHeaderProps> = ({uri, children, subTitle}) => (
  <>
    <Image source={{uri}} style={styles.image} />
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
}) => (
  <Text
    style={[
      styles.headerText,
      underline && styles.underlineText,
      disabled && styles.disabledText,
    ]}>
    {content}
  </Text>
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
    fontSize: 12,
    fontFamily: Fonts.MartelRegular,
  },
});
