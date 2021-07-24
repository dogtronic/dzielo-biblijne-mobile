import React from 'react';

// Components
import {TextInput, StyleSheet, View} from 'react-native';
import {SearchIcon} from '../assets/svg';

// Utils
import {useTranslation} from 'react-i18next';

// Styles
import GlobalStyles from '../constants/GlobalStyles';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export type SearchInputProps = {
  value: string;
  onChange?: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({value, onChange}) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, GlobalStyles.shadow]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        selectionColor={Colors.primary}
        placeholder={t('common:search')}
        placeholderTextColor={Colors.gray}
      />

      <SearchIcon />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 34,
    backgroundColor: Colors.white,
    color: Colors.white,
    paddingHorizontal: 10,
    fontFamily: Fonts.RobotoLight,
    fontSize: 16,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  input: {
    height: 34,
    flex: 1,
    marginRight: 15,
  },
});
