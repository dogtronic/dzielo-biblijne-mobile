import React from 'react';

// Components
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';

// Utils
import {debounce} from 'ts-debounce';

type ButtonProps = {
  title: string;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: any) => void;
  pressWithDebounce?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
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
        <Typography type={TypographyType.BigHeader}>{title}</Typography>
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
  disabled: {
    opacity: 0.4,
  },
});
