import React from 'react';

// Components
import {ImageBackground, StyleSheet} from 'react-native';
import {InfoBox, InfoBoxContainer} from './InfoBox';

// Utils
import {useTranslation} from 'react-i18next';
import {remoteAsset} from '../utils/remoteAsset';
import {useAppNavigation} from '../hooks/useAppNavigation';

// Models
import {Photo} from '../store/types/Curiosity.model';

type WeeklyPhotoProps = {
  photo: Photo;
};

const WeeklyPhoto: React.VFC<WeeklyPhotoProps> = ({photo}) => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();

  return (
    <>
      <ImageBackground
        style={styles.image}
        source={{uri: remoteAsset(photo.image.url)}}
      />
      <InfoBoxContainer containerStyle={styles.infoContainer}>
        <InfoBox
          title={t('dashboard:photoOfTheWeek')}
          description={photo.comment}
          onPressButton={() =>
            navigation.navigate('CuriosityBaseScreen', {
              curiosities: [photo],
              type: 'photo',
            })
          }
        />
      </InfoBoxContainer>
    </>
  );
};

export default WeeklyPhoto;

const styles = StyleSheet.create({
  image: {
    height: 265,
    marginHorizontal: 25,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  infoContainer: {
    marginHorizontal: 40,
    marginTop: '-8%',
  },
});
