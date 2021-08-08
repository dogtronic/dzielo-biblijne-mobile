import React from 'react';

// Components
import {StyleSheet, View} from 'react-native';

// Styles
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

const RoundedListHeader: React.VFC = () => (
  <>
    <View style={[GlobalStyles.shadow, styles.topContainer]}>
      <View style={styles.bottomContainer} />
    </View>
  </>
);

export default RoundedListHeader;

const styles = StyleSheet.create({
  topContainer: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 30,
  },
  bottomContainer: {
    height: 30,
    width: '100%',
    backgroundColor: Colors.white,
    marginTop: 30,
  },
});
