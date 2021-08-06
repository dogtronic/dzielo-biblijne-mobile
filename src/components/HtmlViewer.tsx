import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useMemo, useState} from 'react';

// Components
import {StyleSheet, useWindowDimensions} from 'react-native';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import TermModal from './TermModal';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

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
  const navigation = useNavigation();

  const [termModalVisible, setTermModalVisible] = useState(false);
  const [termId, setTermId] = useState<number | undefined>(undefined);

  const toggleTermModal = useCallback(
    (id?: number) => {
      setTermId(id);
      setTermModalVisible(!termModalVisible);
    },
    [termModalVisible],
  );

  const onPressLink = useCallback(
    (event: unknown, href: string) => {
      if (href.includes('bible')) {
        const bibleLink = href.substring(href.indexOf('bible/'));
        const bibleLinkParams = bibleLink.split('/');

        navigation.navigate('ChapterDetailsScreen', {
          chapterId: parseInt(bibleLinkParams[2], 10),
        });
      }

      if (href.includes('term')) {
        const termLink = href.substring(href.indexOf('terms/'));
        const termLinkParams = termLink.split('/');

        toggleTermModal(parseInt(termLinkParams[1], 10));
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
        tagsStyles={tagsStyles}
        systemFonts={systemFonts}
      />

      <TermModal
        isVisible={termModalVisible}
        toggleModal={toggleTermModal}
        termId={termId}
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
    textDecorationLine: 'none',
    fontFamily: Fonts.RobotoRegular,
    fontWeight: '500',
  },
  p: {
    fontFamily: Fonts.RobotoLight,
    fontSize: 15,
  },
};
