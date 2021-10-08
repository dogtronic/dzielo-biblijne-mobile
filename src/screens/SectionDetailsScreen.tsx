import React from 'react';

// Components
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import HtmlViewer from '../components/HtmlViewer';
import TopRoundedContainer from '../components/TopRoundedContainer';
import {BookIcon} from '../assets/svg';

// Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {ReadingsStackParamList} from '../navigation/ReadingsDrawerNavigator';

// Utils
import {remoteAsset} from '../utils/remoteAsset';

// Styles
import Colors from '../constants/Colors';
import Typography, {TypographyType} from '../components/Typography';

type SectionDetailsScreenProps = {
  navigation: StackNavigationProp<
    ReadingsStackParamList,
    'SectionDetailsScreen'
  >;
  route: RouteProp<ReadingsStackParamList, 'SectionDetailsScreen'>;
};

const SectionDetailsScreen: React.VFC<SectionDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {reading, section, sectionType} = route.params;

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(reading.reading_type.image.url) || ''}>
        <ImageHeaderText content={sectionType?.name} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Typography type={TypographyType.Title} numberOfLines={2}>
            {sectionType?.name}
          </Typography>

          {!!reading.sections.length && (
            <TouchableOpacity
              style={styles.bookButton}
              activeOpacity={0.9}
              //@ts-ignore
              onPress={navigation.openDrawer}>
              <BookIcon />
            </TouchableOpacity>
          )}
        </View>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
  },
  bookButton: {
    backgroundColor: Colors.primary,
    height: 45,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginRight: -25,
  },
});
