import React from 'react';

// components
import {StyleSheet, TouchableOpacity} from 'react-native';
import Typography, {TypographyType} from './Typography';

// styles
import Colors from '../constants/Colors';

type DrawerButtonProps = {
  onPress?: () => void;
  title: string;
};

const DrawerButton: React.FC<DrawerButtonProps> = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Typography type={TypographyType.SmallTitle} style={styles.text}>
        {title}
      </Typography>
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
  },
});
