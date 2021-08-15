import React from 'react';

// Components
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';

// Models
import {BibleBook} from '../store/types/BibleBook.model';

// Utils
import {useAppNavigation} from '../hooks/useAppNavigation';

type BookItemProps = {
  item: BibleBook;
  withoutTopLine?: boolean;
};

export const BookItem: React.VFC<BookItemProps> = ({item, withoutTopLine}) => {
  const navigation = useAppNavigation();

  return (
    <View
      style={[!withoutTopLine ? styles.topLineContainer : styles.topMargin]}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('ChaptersScreen', {
            bookId: item.id,
            testament: item.testament,
          })
        }>
        <Typography type={TypographyType.Text} numberOfLines={1}>
          {item.name}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 50,
  },
  topLineContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  topMargin: {
    marginTop: 30,
  },
});
