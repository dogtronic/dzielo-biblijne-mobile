import React, {useCallback, useRef, useState} from 'react';

// Components
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
// Models

import {remoteAsset} from '../utils/remoteAsset';
import {Photo} from '../store/types/Curiosity.model';
import Typography, {TypographyType} from './Typography';
import Colors from '../constants/Colors';

type ImageCarouselProps = {
  images: Photo[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({images}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [zoomModalVisible, setZoomModalVisible] = useState(false);
  const [activePhoto, setActivePhoto] = useState<Photo | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);

  const imagesUrls = images.map(image => ({uri: remoteAsset(image.image.url)}));

  const dimensions = useWindowDimensions();
  const itemWidth = dimensions.width - 150 > 260 ? 260 : dimensions.width - 150;
  const itemHeight = 230;

  const renderItem = useCallback(
    ({item, index}: {item: Photo; index: number}) => {
      const inputRange = [
        (index - 1) * itemWidth,
        index * itemWidth,
        (index + 1) * itemWidth,
      ];

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.95, 1, 0.95],
      });

      return (
        <Animated.View
          style={[
            styles.itemContainer,
            {height: itemHeight, width: itemWidth, transform: [{scale}]},
          ]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setActiveIndex(index);
              setActivePhoto(item);
              setZoomModalVisible(true);
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
        </Animated.View>
      );
    },
    [setZoomModalVisible],
  );

  return (
    <>
      <Animated.FlatList
        style={styles.container}
        data={images}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={<View style={styles.listFooter}></View>}
        snapToInterval={itemWidth + 15}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      />

      <ImageView
        images={imagesUrls}
        imageIndex={activeIndex}
        visible={zoomModalVisible}
        onRequestClose={() => setZoomModalVisible(false)}
        onImageIndexChange={index => setActivePhoto(images[index])}
        FooterComponent={() => (
          <View style={styles.imageDescriptionContainer}>
            {!!activePhoto?.title && (
              <Typography
                type={TypographyType.SmallTitle}
                numberOfLines={3}
                style={styles.text}>
                {activePhoto?.title}
              </Typography>
            )}
            {!!activePhoto?.comment && (
              <Typography type={TypographyType.Description} style={styles.text}>
                {activePhoto?.comment}
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
    marginLeft: 25,
  },
  itemContainer: {
    marginRight: 15,
  },
  listFooter: {
    marginRight: 25,
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
