import React from 'react';

// Components
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';

// Styles
import Colors from '../constants/Colors';

// Utils
import {debounce} from 'ts-debounce';

type ContentButtonProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  pressWithDebounce?: boolean;
  disabled?: boolean;
};

const ContentButton: React.VFC<ContentButtonProps> = ({
  title,
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
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ContentButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.primaryLight,
    alignSelf: 'flex-start',
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 13,
    color: Colors.primary,
  },
  disabled: {
    opacity: 0.4,
  },
});
