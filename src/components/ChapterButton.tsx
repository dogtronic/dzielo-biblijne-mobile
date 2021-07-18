import React from 'react';

// Components
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import GlobalStyles from '../constants/GlobalStyles';

// Models
import {Chapter} from '../store/types/Chapter.model';

type ChapterButtonProps = {
  item: Chapter;
};

const ChapterButton: React.VFC<ChapterButtonProps> = ({item}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, GlobalStyles.shadow]}
      onPress={() => null}>
      <Text style={styles.buttonText}>{item.number}</Text>
    </TouchableOpacity>
  );
};

export default ChapterButton;

const styles = StyleSheet.create({
  container: {
    height: 38,
    width: 38,
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoRegular,
  },
});
