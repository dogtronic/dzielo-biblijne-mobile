import React, {useState} from 'react';

// Components
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import CrossSmall from '../assets/svg/CrossSmall';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Utils
import {useTranslation} from 'react-i18next';

// Models
import {Reading} from '../store/types/Reading.model';

type DrawerProps = {
  closeDrawer?: () => void;
  navigate?: (name: string) => void;
  reading: Reading;
};

const ReadingDrawer: React.VFC<DrawerProps> = ({navigate, reading}) => {
  const {t} = useTranslation();
  const [menus, setMenus] = useState<{name: string; onPress: () => void}[]>([]);

  React.useEffect(() => {
    const menu: {name: string; onPress: () => void}[] = [];

    reading.sections.forEach(v => {
      menu.push({
        name: v.section_type.name,
        onPress: () => null,
      });
    });

    if (reading.curiosities.length) {
      menu.push({
        name: t('menu:curiosities'),
        onPress: () => null,
      });
    }

    if (reading.photos.length) {
      menu.push({
        name: t('menu:photos'),
        onPress: () => null,
      });
    }

    setMenus(menu);
  }, [reading, t]);

  return (
    <View style={styles.container}>
      <CrossSmall style={styles.cross} />

      <Text style={styles.header}>{reading.reading_type.name}</Text>

      <View style={styles.optionsContainer}>
        {menus.map((v, index) => (
          <TouchableOpacity
            key={index}
            onPress={v.onPress}
            style={styles.optionContainer}>
            <Text style={styles.optionText}>{v.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ReadingDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingHorizontal: 25,
  },
  optionsContainer: {
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: Fonts.MartelRegular,
    color: Colors.white,
    marginTop: 20,
  },
  cross: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  optionContainer: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.white,
  },
});
