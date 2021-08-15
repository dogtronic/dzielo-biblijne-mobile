import React, {useCallback, useMemo, useState} from 'react';

// Redux
import {useAppSelector} from '../hooks/useAppDispatch';

// Components
import {StyleSheet, useWindowDimensions, Linking} from 'react-native';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import TermModal from './TermModal';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Utils
import {useAppNavigation} from '../hooks/useAppNavigation';

const systemFonts = [
  ...defaultSystemFonts,
  Fonts.RobotoLight,
  Fonts.RobotoRegular,
];

type HtmlViewerProps = {
  html?: string;
  containerStyle?: Object;
};

const HtmlViewer: React.VFC<HtmlViewerProps> = ({html, containerStyle}) => {
  const {width} = useWindowDimensions();
  const navigation = useAppNavigation();

  const [termModalVisible, setTermModalVisible] = useState(false);
  const [termId, setTermId] = useState<number | undefined>(undefined);
  const [termType, setTermType] = useState<
    'words' | 'bible-dictionary' | undefined
  >(undefined);

  const fontSize = useAppSelector(state => state.user.fontSize);

  const toggleTermModal = useCallback(
    (id?: number, type?: 'words' | 'bible-dictionary') => {
      setTermId(id);
      setTermType(type);
      setTermModalVisible(!termModalVisible);
    },
    [termModalVisible],
  );

  const onPressLink = useCallback(
    (event: unknown, href: string) => {
      if (href.includes('term')) {
        const termLink = href.substring(href.indexOf('terms/'));
        const termLinkParams = termLink.split('/');
        toggleTermModal(parseInt(termLinkParams[4], 10), 'words');
      } else if (href.includes('bible-dictionary')) {
        const termLink = href.substring(href.indexOf('bible-dictionary/'));
        const termLinkParams = termLink.split('/');
        toggleTermModal(parseInt(termLinkParams[1], 10), 'bible-dictionary');
      } else if (href.includes('bible')) {
        const bibleLink = href.substring(href.indexOf('bible/'));
        const bibleLinkParams = bibleLink.split('/');
        navigation.navigate('ChapterDetailsScreen', {
          chapterId: parseInt(bibleLinkParams[1], 10),
        });
      } else {
        if (Linking.canOpenURL(href)) {
          Linking.openURL(href);
        }
      }
    },
    [navigation, toggleTermModal],
  );

  const renderersProps = useMemo(
    () => ({
      a: {
        onPress: onPressLink,
      },
    }),
    [onPressLink],
  );

  return (
    <>
      <RenderHtml
        contentWidth={width - 40}
        source={{html: html || ''}}
        baseStyle={{...styles.container, ...containerStyle}}
        renderersProps={renderersProps}
        //@ts-ignore
        tagsStyles={{...tagsStyles, p: {...tagsStyles.p, fontSize}}}
        systemFonts={systemFonts}
      />

      <TermModal
        isVisible={termModalVisible}
        toggleModal={toggleTermModal}
        termId={termId}
        type={termType}
      />
    </>
  );
};

export default HtmlViewer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});

const tagsStyles = {
  a: {
    color: Colors.primary,
    textDecorationColor: Colors.primary,
    fontFamily: Fonts.RobotoRegular,
    fontWeight: '500',
  },
  p: {
    fontFamily: Fonts.RobotoLight,
    fontSize: 15,
  },
};
