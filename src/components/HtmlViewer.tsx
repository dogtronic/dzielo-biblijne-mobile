import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useMemo} from 'react';

// components
import {StyleSheet, useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

type HtmlViewerProps = {
  html?: string;
};

const HtmlViewer: React.VFC<HtmlViewerProps> = ({html}) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  const onPressLink = useCallback(
    (event: unknown, href: string) => {
      if (href.includes('bible')) {
        const bibleLink = href.substring(href.indexOf('bible/'));
        const bibleLinkParams = bibleLink.split('/');

        navigation.navigate('ChapterDetailsScreen', {
          chapterId: parseInt(bibleLinkParams[2], 10),
        });
      }
    },
    [navigation],
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
    <RenderHtml
      contentWidth={width - 40}
      source={{html: html || ''}}
      baseStyle={styles.container}
      renderersProps={renderersProps}
    />
  );
};

export default HtmlViewer;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
