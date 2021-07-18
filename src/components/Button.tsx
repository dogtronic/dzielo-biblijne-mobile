import React from 'react';

// Components
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Utils
import {debounce} from 'ts-debounce';

type ButtonProps = {
  title: string;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  pressWithDebounce?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
};

const Button: React.VFC<ButtonProps> = ({
  title,
  loading,
  containerStyle,
  onPress,
  pressWithDebounce,
  disabled,
}) => {
  const press = pressWithDebounce && onPress ? debounce(onPress, 300) : onPress;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, disabled && styles.disabled, containerStyle]}
      disabled={disabled}
      onPress={press}>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  outlineContainer: {
    borderWidth: 1,
  },
  textNearIcon: {
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
  },
  disabled: {
    opacity: 0.4,
  },
});
