import React from 'react';

//components
import {StyleSheet, ScrollView, View} from 'react-native';
import ImageHeader, {ImageHeaderText} from '../components/ImageHeader';
import TopRoundedContainer from '../components/TopRoundedContainer';

//navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {ReadingsStackParamList} from '../navigation/ReadingsDrawerNavigator';

//utils
import {remoteAsset} from '../utils/remoteAsset';

// Styles
import Colors from '../constants/Colors';
import HtmlViewer from '../components/HtmlViewer';
import {BookIcon} from '../assets/svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from '../hooks/useAppDispatch';
import ContentButton from '../components/ContentButton';
import Typography, {TypographyType} from '../components/Typography';

type ReadingDetailsScreenProps = {
  navigation: StackNavigationProp<
    ReadingsStackParamList,
    'ReadingDetailsScreen'
  >;
  route: RouteProp<ReadingsStackParamList, ' ReadingDetailsScreen'>;
};

const ReadingDetailsScreen: React.VFC<ReadingDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {reading, isSundayReading} = route.params;

  const readings = useAppSelector(state => state.readings.readings);
  const index = readings.findIndex(v => v.id === reading.id);

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ImageHeader uri={remoteAsset(reading.reading_type.image.url) || ''}>
        <ImageHeaderText content={reading.reading_type.name} />
      </ImageHeader>

      <TopRoundedContainer style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.descriptionContainer}>
            <Typography type={TypographyType.Title} resizeable>
              {reading.description}
            </Typography>
            <Typography
              type={TypographyType.Description}
              style={styles.description}
              resizeable>
              {reading.sub_description}
            </Typography>
          </View>

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

        <HtmlViewer html={reading.content} containerStyle={styles.htmlViewer} />

        {isSundayReading && (
          <View style={styles.buttonsContainer}>
            {index > 0 ? (
              <ContentButton
                title={readings[index - 1].reading_type.name}
                onPress={() =>
                  navigation
                    .dangerouslyGetParent()
                    //@ts-ignore
                    ?.push('ReadingsDrawerNavigator', {
                      reading: readings[index - 1],
                      isSundayReading,
                    })
                }
              />
            ) : (
              <View />
            )}

            {index < readings.length - 1 ? (
              <ContentButton
                title={readings[index + 1].reading_type.name}
                onPress={() => {
                  navigation
                    .dangerouslyGetParent()
                    //@ts-ignore
                    ?.push('ReadingsDrawerNavigator', {
                      reading: readings[index + 1],
                      isSundayReading,
                    });
                }}
              />
            ) : (
              <View />
            )}
          </View>
        )}
      </TopRoundedContainer>
    </ScrollView>
  );
};

export default ReadingDetailsScreen;

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
    paddingVertical: 30,
  },
  description: {
    marginTop: 5,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  descriptionContainer: {
    flex: 1,
  },
  htmlViewer: {
    paddingHorizontal: 0,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
});
