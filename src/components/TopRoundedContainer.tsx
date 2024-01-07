import React from 'react';

// components
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

// styles
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

type TopRoundedContainerProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const TopRoundedContainer: React.FC<TopRoundedContainerProps> = ({
  style,
  children,
}) => {
  return (
    <View style={[styles.container, GlobalStyles.shadow, style]}>
      {children}
    </View>
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
    paddingBottom: 30,
    flex: 1,
  },
});
