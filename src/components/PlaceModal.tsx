import React from 'react';

// Components
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../assets/svg';

// Utils
import {useTranslation} from 'react-i18next';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Models
import {Place} from '../store/types/Region.model';

// Utils
import {remoteAsset} from '../utils/remoteAsset';
import {useAppSelector} from '../hooks/useAppDispatch';

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

  const fontSize = useAppSelector(state => state.user.fontSize);

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
          <Text style={styles.header}>{t('menu:biblemap')}</Text>

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
            <Text style={styles.title}>{place?.name}</Text>

            {place?.photo && (
              <Image
                style={styles.image}
                source={{uri: remoteAsset(place.photo.url)}}
              />
            )}

            <Text style={[styles.description, {fontSize}]}>
              {place?.description}
            </Text>
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
  header: {
    fontSize: 12,
    fontFamily: Fonts.RobotoLight,
    color: Colors.gray,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
    marginVertical: 25,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 30,
  },
});
