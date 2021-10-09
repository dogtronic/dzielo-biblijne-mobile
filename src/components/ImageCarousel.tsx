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
import {ImageSource} from '../store/types/ImageSource.model';
import {remoteAsset} from '../utils/remoteAsset';

type ImageCarouselProps = {
  images: ImageSource[];
};

const ImageCarousel: React.VFC<ImageCarouselProps> = ({images}) => {
  const [zoomModalVisible, setZoomModalVisible] = useState(false);
  const [zoomModalImageLink, setZoomModalImageLink] = useState<
    string | undefined
  >(undefined);

  const dimensions = useWindowDimensions();

  const renderItem = useCallback(
    ({item}: {item: ImageSource}) => {
      return (
        <View onStartShouldSetResponder={() => true}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setZoomModalVisible(true);
              setZoomModalImageLink(remoteAsset(item.url));
            }}>
            <Image style={styles.image} source={{uri: remoteAsset(item.url)}} />
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
});
