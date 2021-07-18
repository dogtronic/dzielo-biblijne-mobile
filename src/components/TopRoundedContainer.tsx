import React from 'react';

// components
import {StyleSheet, View} from 'react-native';

// styles
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

const TopRoundedContainer: React.FC = ({children}) => {
  return (
    <View style={[styles.container, GlobalStyles.shadow]}>{children}</View>
  );
};

export default TopRoundedContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    paddingHorizontal: 23,
    paddingVertical: 30,
  },
});
