import React from 'react';

// Components
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../assets/svg';
import Typography, {TypographyType} from './Typography';

// Utils
import {useTranslation} from 'react-i18next';

// Styles
import Colors from '../constants/Colors';

// Models
import {Place} from '../store/types/Region.model';

// Utils
import ImageCarousel from './ImageCarousel';

export type TermModalProps = {
  isVisible?: boolean;
  toggleModal?: () => void;
  place: Place | null;
};

const PlaceModal: React.VFC<TermModalProps> = ({
  isVisible,
  place,
  toggleModal,
}) => {
  const {t} = useTranslation();

  return (
    <Modal
      style={styles.container}
      isVisible={isVisible}
      backdropColor={'rgba(0,0,0,0.4)'}
      useNativeDriver={true}
      statusBarTranslucent
      swipeDirection={['down', 'left', 'right', 'up']}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      propagateSwipe={true}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Typography type={TypographyType.SmallDescription}>
            {t('menu:biblemap')}
          </Typography>

          <TouchableOpacity
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            onPress={toggleModal}>
            <CloseIcon fill={Colors.primary} height={13} width={13} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollableContent}>
          <View
            style={styles.scrollableContainer}
            onStartShouldSetResponder={() => true}>
            <Typography type={TypographyType.Title} resizeable>
              {place?.name}
            </Typography>

            {place?.photo?.length !== 0 && (
              <ImageCarousel images={place?.photo || []} />
            )}

            <Typography
              type={TypographyType.Text}
              style={styles.description}
              resizeable>
              {place?.description}
            </Typography>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default React.memo(PlaceModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 0,
    margin: 0,
  },
  wrapper: {
    backgroundColor: Colors.background,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 25,
    paddingTop: 30,
    width: '100%',
    maxHeight: '80%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 30,
    marginHorizontal: -20,
  },
  scrollableContainer: {
    flex: 1,
  },
  scrollableContent: {
    paddingHorizontal: 20,
  },
  description: {
    marginVertical: 25,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 30,
  },
});
