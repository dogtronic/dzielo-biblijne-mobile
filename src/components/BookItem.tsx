import {useNavigation} from '@react-navigation/native';
import React from 'react';

// Components
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Models
import {BibleBook} from '../store/types/BibleBook.model';

type BookItemProps = {
  item: BibleBook;
  withoutTopLine?: boolean;
};

export const BookItem: React.VFC<BookItemProps> = ({item, withoutTopLine}) => {
  const navigation = useNavigation();

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
        <Text style={styles.text}>{item.name}</Text>
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
  text: {
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
  },
});
