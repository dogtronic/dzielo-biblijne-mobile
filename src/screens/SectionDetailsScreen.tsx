import React from 'react';

// Components
import {StyleSheet, ScrollView} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import HtmlViewer from '../components/HtmlViewer';
import TopRoundedContainer from '../components/TopRoundedContainer';

// Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {ReadingsStackParamList} from '../navigation/ReadingsDrawerNavigator';

// Utils
import {remoteAsset} from '../utils/remoteAsset';

// Styles
import Colors from '../constants/Colors';

type SectionDetailsScreenProps = {
  navigation: StackNavigationProp<
    ReadingsStackParamList,
    'SectionDetailsScreen'
  >;
  route: RouteProp<ReadingsStackParamList, 'SectionDetailsScreen'>;
};

const SectionDetailsScreen: React.VFC<SectionDetailsScreenProps> = ({
  route,
}) => {
  const {reading, section, sectionType} = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(reading.reading_type.image.url) || ''}>
        <ImageHeaderText content={sectionType?.name} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <HtmlViewer html={section?.content} />
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default SectionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  textContainer: {
    marginTop: 40,
  },
});
