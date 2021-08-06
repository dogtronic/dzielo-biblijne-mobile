import React from 'react';

// components
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {BackIcon, MenuIcon} from '../assets/svg';
import LogoSmallIcon from '../assets/svg/LogoSmallIcon';

// styles
import Colors from '../constants/Colors';

type TopbarProps = {
  onPressLeftButton?: () => void;
  onPressRightButton?: () => void;
  canGoBack: () => boolean;
};

const Topbar: React.VFC<TopbarProps> = ({
  onPressLeftButton,
  onPressRightButton,
  canGoBack,
}) => {
  const isPossibleToBack = canGoBack();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onPressLeftButton}
        hitSlop={styles.hitSlop}
        disabled={!isPossibleToBack}>
        {isPossibleToBack && <BackIcon />}
      </TouchableOpacity>

      <LogoSmallIcon />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onPressRightButton}
        hitSlop={styles.hitSlop}>
        <MenuIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  container: {
    height: 53,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hitSlop: {left: 10, right: 10, top: 10, bottom: 10},
});
