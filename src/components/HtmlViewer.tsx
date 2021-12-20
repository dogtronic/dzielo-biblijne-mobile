import React, {useCallback, useMemo, useState} from 'react';

// Redux
import {useAppSelector} from '../hooks/useAppDispatch';

// Components
import {StyleSheet, useWindowDimensions, Linking, View} from 'react-native';
import RenderHtml, {
  defaultSystemFonts,
  useInternalRenderer,
} from 'react-native-render-html';
import TermModal from './TermModal';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Utils
import {useAppNavigation} from '../hooks/useAppNavigation';
import {remoteAsset} from '../utils/remoteAsset';

// Models
import {TermType} from '../store/types/Term.model';

const systemFonts = [
  ...defaultSystemFonts,
  Fonts.RobotoLight,
  Fonts.RobotoRegular,
];

type HtmlViewerProps = {
  html?: string;
  containerStyle?: Object;
};

function CustomImageRenderer(props: any) {
  const {Renderer, rendererProps} = useInternalRenderer('img', props);

  const uri = rendererProps.source.uri;

  const thumbnailSource = {
    ...rendererProps.source,
    uri: remoteAsset(uri?.replace('about://', '')),
  };
  return (
    <View style={styles.centered}>
      <Renderer
        {...rendererProps}
        source={thumbnailSource}
        style={styles.image}
      />
    </View>
  );
}

const renderers = {
  img: CustomImageRenderer,
};

const HtmlViewer: React.VFC<HtmlViewerProps> = ({html, containerStyle}) => {
  const {width} = useWindowDimensions();
  const navigation = useAppNavigation();

  const [termModalVisible, setTermModalVisible] = useState(false);
  const [termId, setTermId] = useState<string | undefined>(undefined);
  const [termType, setTermType] = useState<TermType | undefined>(undefined);

  const fontSize = useAppSelector(state => state.user.fontSize);

  const toggleTermModal = useCallback(
    (id?: string, type?: TermType) => {
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

        toggleTermModal(termLinkParams[4], TermType.Words);
      } else if (href.includes('bible-dictionary')) {
        const termLink = href.substring(href.indexOf('bible-dictionary/'));
        const termLinkParams = termLink.split('/');

        toggleTermModal(termLinkParams[1], TermType.BibleDictionary);
      } else if (href.includes('bible')) {
        const bibleLink = href.substring(href.indexOf('bible/'));
        const bibleLinkParams = bibleLink.split('/');

        navigation.navigate('ChapterDetailsScreen', {
          chapterId: bibleLinkParams[1],
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
        source={{
          html:
            html
              ?.replace(/font-size/g, 'font-sized')
              ?.replace(/font-family/g, 'font-family') || '',
        }}
        baseStyle={{...styles.container, ...containerStyle}}
        renderersProps={renderersProps}
        //@ts-ignore
        tagsStyles={{...tagsStyles, p: {...tagsStyles.p, fontSize}}}
        systemFonts={systemFonts}
        renderers={renderers}
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
    fontFamily: Fonts.RobotoLight,
    fontSize: 15,
  },
  centered: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  image: {
    width: '100%',
    paddingHorizontal: 20,
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
