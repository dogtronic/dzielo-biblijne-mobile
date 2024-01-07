import React from 'react';

// Components
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';

// Utils
import {debounce} from 'ts-debounce';

type ContentButtonProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  pressWithDebounce?: boolean;
  disabled?: boolean;
};

const ContentButton: React.FC<ContentButtonProps> = ({
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
      <Typography
        type={TypographyType.ExtraSmallTitle}
        style={styles.buttonText}>
        {title}
      </Typography>
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
    color: Colors.primary,
  },
  disabled: {
    opacity: 0.4,
  },
});
