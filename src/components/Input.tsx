import React, {useRef} from 'react';

// Components
import {TextInput, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import GlobalStyles from '../constants/GlobalStyles';

export type InputProps = {
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (e: any) => void;
  error?: string;
  multiline?: boolean;
  placeholder?: string;
  maxLength?: number;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  error,
  multiline,
  placeholder,
  maxLength,
  onBlur,
}) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.mainContainer,
          GlobalStyles.shadow,
          multiline && styles.mainMultiline,
        ]}
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}>
        <TextInput
          ref={inputRef}
          style={[styles.container, multiline && styles.multiline]}
          value={value}
          onChangeText={onChange}
          selectionColor={Colors.primary}
          placeholderTextColor={Colors.gray}
          placeholder={placeholder}
          maxLength={maxLength}
          multiline={multiline}
          onBlur={onBlur}
        />
      </TouchableOpacity>
      {multiline && (
        <Typography type={TypographyType.Description} style={styles.charNumber}>
          {value.length}/{maxLength}
        </Typography>
      )}

      <Typography type={TypographyType.Description} style={styles.errorText}>
        {error}
      </Typography>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
  },
  mainMultiline: {
    paddingTop: 10,
    paddingBottom: 20,
    height: 175,
  },
  container: {
    color: Colors.black,
    height: 44,
    padding: 0,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: Fonts.RobotoLight,
    alignItems: 'flex-start',
  },
  multiline: {
    height: 'auto',
    minHeight: 44,
  },
  errorText: {
    color: Colors.primary,
    marginBottom: 6,
    marginTop: 4,
  },
  charNumber: {
    position: 'absolute',
    right: 10,
    top: 150,
  },
});
