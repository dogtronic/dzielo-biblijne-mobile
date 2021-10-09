import React, {useState} from 'react';

// Components
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CrossSmall from '../assets/svg/CrossSmall';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';
// Utils
import {useTranslation} from 'react-i18next';

// Models
import {Reading} from '../store/types/Reading.model';
import {useAppSelector} from '../hooks/useAppDispatch';

type DrawerProps = {
  closeDrawer?: () => void;
  navigate?: (name: string, params?: any) => void;
  reading: Reading;
};

type Menus = {name: string; onPress: () => void}[];

const ReadingDrawer: React.VFC<DrawerProps> = ({
  navigate,
  reading,
  closeDrawer,
}) => {
  const {t} = useTranslation();
  const [menus, setMenus] = useState<Menus>([]);

  const sections = useAppSelector(state => state.readings.sections);

  React.useEffect(() => {
    const menu: Menus = [];

    menu.push({
      name: t('common:text'),
      onPress: () =>
        navigate?.('ReadingDetailsScreen', {
          reading,
        }),
    });

    reading.sections
      .sort((v, w) => {
        const section1 =
          typeof v.section_type === 'string'
            ? sections.find(z => z.id === v.section_type)
            : undefined;

        const section2 =
          typeof w.section_type === 'string'
            ? sections.find(z => z.id === w.section_type)
            : undefined;

        if (section1 && section2) {
          return section1.priority > section2.priority ? -1 : 1;
        }

        return 0;
      })
      .forEach(v => {
        const section =
          typeof v.section_type === 'string'
            ? sections.find(w => w.id === v.section_type)
            : undefined;

        if (section) {
          menu.push({
            name: section.name,
            onPress: () =>
              navigate?.(`SectionDetailsScreen_${v.id}`, {
                reading,
                section: v,
                sectionType: section,
              }),
          });
        }
      });

    if (reading.curiosities.length) {
      menu.push({
        name: t('menu:curiosities'),
        onPress: () => navigate?.('CuriositiesScreen'),
      });
    }

    if (reading.photos.length) {
      menu.push({
        name: t('common:biblePhoto'),
        onPress: () => navigate?.('PhotosScreen'),
      });
    }

    setMenus(menu);
  }, [reading, t, navigate, sections]);

  return (
    <View style={styles.container}>
      <CrossSmall style={styles.cross} />

      <Typography type={TypographyType.MainHeader} style={styles.header}>
        {reading.reading_type.name}
      </Typography>

      <View style={styles.optionsContainer}>
        {menus.map((v, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              closeDrawer?.();
              v.onPress();
            }}
            style={styles.optionContainer}>
            <Typography
              type={TypographyType.SmallTitle}
              style={styles.optionText}>
              {v.name}
            </Typography>
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
    color: Colors.white,
  },
});
