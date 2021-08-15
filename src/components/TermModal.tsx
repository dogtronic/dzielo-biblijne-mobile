import React from 'react';

// Redux
import * as actions from '../store/actions';
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';

// Components
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../assets/svg';
import Button from './Button';
import Loader from './Loader';

// Utils
import {useTranslation} from 'react-i18next';
import {useAppNavigation} from '../hooks/useAppNavigation';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Models
import {TermType} from '../store/types/Term.model';

export type TermModalProps = {
  isVisible?: boolean;
  toggleModal?: () => void;
  termId?: number;
  type?: TermType;
};

const TermModal: React.VFC<TermModalProps> = ({
  isVisible,
  termId,
  toggleModal,
  type,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const term = useAppSelector(state => state.terms.termDetails);
  const loading = useAppSelector(state => state.terms.isTermDetailsLoading);

  React.useEffect(() => {
    if (termId && type) {
      dispatch(actions.getTermDetails.request({termId, type}));
    }
  }, [dispatch, termId, type]);

  return (
    <Modal
      style={styles.container}
      isVisible={isVisible}
      backdropColor={'rgba(0,0,0,0.4)'}
      useNativeDriver={true}
      statusBarTranslucent
      swipeDirection={['up', 'left', 'right', 'down']}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{t('menu:words')}</Text>

          <TouchableOpacity
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            onPress={toggleModal}>
            <CloseIcon fill={Colors.primary} height={13} width={13} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <View style={styles.content}>
            <Text style={styles.title}>{term?.term}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {term?.description}
            </Text>

            <Button
              title={t('common:readMore')}
              onPress={() => {
                toggleModal?.();
                if (termId && type) {
                  navigation.navigate('TermDetailsScreen', {termId, type});
                }
              }}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default TermModal;

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
    paddingVertical: 30,
    width: '100%',
    minHeight: 200,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 30,
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
});
