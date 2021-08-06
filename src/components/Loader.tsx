import React from 'react';

// Components
import {StyleSheet, View, ActivityIndicator} from 'react-native';

// Styles
import Colors from '../constants/Colors';

interface LoaderProps {
  isAbsolute?: boolean;
  backgroundColor?: string;
}

const Loader: React.VFC<LoaderProps> = ({isAbsolute, backgroundColor}) => (
  <View
    style={[
      styles.container,
      isAbsolute && styles.absoluteContainer,
      {backgroundColor},
    ]}>
    <ActivityIndicator size="small" color={Colors.primary} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteContainer: {
    position: 'absolute',
    backgroundColor: Colors.background,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
