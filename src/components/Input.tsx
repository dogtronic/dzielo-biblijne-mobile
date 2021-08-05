import React from 'react';

// Components
import {TextInput, StyleSheet, Text, View} from 'react-native';

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
  return (
    <View>
      <View
        style={[
          styles.mainContainer,
          GlobalStyles.shadow,
          multiline && styles.mainMultiline,
        ]}>
        <TextInput
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
      </View>
      {multiline && (
        <Text style={styles.charNumber}>
          {value.length}/{maxLength}
        </Text>
      )}

      <Text style={styles.errorText}>{error}</Text>
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
    height: 34,
    padding: 0,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: Fonts.RobotoLight,
  },
  multiline: {
    height: 135,
  },
  errorText: {
    color: Colors.primary,
    marginBottom: 6,
    marginTop: 4,
  },
  charNumber: {
    color: Colors.gray,
    fontFamily: Fonts.RobotoLight,
    position: 'absolute',
    right: 10,
    top: 150,
  },
});
