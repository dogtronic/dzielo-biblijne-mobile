import React from 'react';

// Components
import {TouchableOpacity, StyleSheet, ViewStyle, StyleProp} from 'react-native';

// Styles
import Colors from '../constants/Colors';

type MapControlProps = {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const MapControl: React.FC<MapControlProps> = ({
  containerStyle,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default MapControl;

const styles = StyleSheet.create({
  container: {
    width: 47,
    height: 40,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
