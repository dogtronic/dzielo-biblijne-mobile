import React, {useCallback, useState} from 'react';

// Components
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImageView from 'react-native-image-viewing';

// Models

import {remoteAsset} from '../utils/remoteAsset';
import {Photo} from '../store/types/Curiosity.model';
import Typography, {TypographyType} from './Typography';
import Colors from '../constants/Colors';

type ImageCarouselProps = {
  images: Photo[];
};

const ImageCarousel: React.VFC<ImageCarouselProps> = ({images}) => {
  const [zoomModalVisible, setZoomModalVisible] = useState(false);
  const [zoomModalPhoto, setZoomModalPhoto] = useState<Photo | undefined>(
    undefined,
  );
  const [zoomModalImageLink, setZoomModalImageLink] = useState<
    string | undefined
  >(undefined);

  const dimensions = useWindowDimensions();

  const renderItem = useCallback(
    ({item}: {item: Photo}) => {
      return (
        <View onStartShouldSetResponder={() => true}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setZoomModalVisible(true);
              setZoomModalPhoto(item);
              setZoomModalImageLink(remoteAsset(item.image.url));
            }}>
            <Image
              style={styles.image}
              source={{uri: remoteAsset(item.image.url)}}
            />

            <View style={styles.textContainer}>
              {!!item?.title && (
                <Typography
                  type={TypographyType.SmallTitle}
                  numberOfLines={1}
                  style={styles.text}>
                  {item.title}
                </Typography>
              )}
              {!!item?.comment && (
                <Typography
                  type={TypographyType.Description}
                  numberOfLines={2}
                  style={styles.text}>
                  {item.comment}
                </Typography>
              )}
            </View>
          </TouchableOpacity>
        </View>
      );
    },
    [setZoomModalVisible, setZoomModalImageLink],
  );

  return (
    <>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={dimensions.width - 50}
        itemWidth={dimensions.width - 150 > 260 ? 260 : dimensions.width - 150}
        activeSlideAlignment={'start'}
        scrollEnabled={true}
      />

      <ImageView
        images={zoomModalImageLink ? [{uri: zoomModalImageLink}] : []}
        imageIndex={0}
        visible={zoomModalVisible}
        onRequestClose={() => setZoomModalVisible(false)}
        FooterComponent={() => (
          <View style={styles.imageDescriptionContainer}>
            {!!zoomModalPhoto?.title && (
              <Typography
                type={TypographyType.SmallTitle}
                numberOfLines={1}
                style={styles.text}>
                {zoomModalPhoto?.title}
              </Typography>
            )}
            {!!zoomModalPhoto?.comment && (
              <Typography type={TypographyType.Description} style={styles.text}>
                {zoomModalPhoto?.comment}
              </Typography>
            )}
          </View>
        )}
      />
    </>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 30,
    borderRadius: 15,
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    color: Colors.white,
  },
  imageDescriptionContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
