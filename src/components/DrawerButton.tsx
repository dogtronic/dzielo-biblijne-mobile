import React from 'react';

// components
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

// styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type DrawerButtonProps = {
  onPress?: () => void;
  title: string;
};

const DrawerButton: React.VFC<DrawerButtonProps> = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: Fonts.RobotoRegular,
  },
});
