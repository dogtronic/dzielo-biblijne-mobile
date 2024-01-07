import React from 'react';

// Components
import {TouchableOpacity, StyleSheet} from 'react-native';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

// Models
import {Chapter} from '../store/types/Chapter.model';

// Helpers
import {useAppNavigation} from '../hooks/useAppNavigation';

type ChapterButtonProps = {
  item: Chapter;
};

const ChapterButton: React.FC<ChapterButtonProps> = ({item}) => {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, GlobalStyles.shadow]}
      onPress={() =>
        navigation.navigate('ChapterDetailsScreen', {chapterId: item.id})
      }>
      <Typography type={TypographyType.SmallTitle}>{item.number}</Typography>
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
});
