import React from 'react';

// Components
import {StyleSheet, Image} from 'react-native';
import {InfoBox, InfoBoxContainer} from './InfoBox';

type ReadingListItemProps = {
  title: string;
  description?: string;
  onPressButton?: () => void;
  uri: string;
};

export const ReadingListItem: React.VFC<ReadingListItemProps> = ({
  title,
  description,
  onPressButton,
  uri,
}) => (
  <InfoBoxContainer containerStyle={styles.container}>
    <Image style={styles.image} source={{uri}} />
    <InfoBox
      title={title}
      description={description}
      onPressButton={onPressButton}
      position="vertical"
    />
  </InfoBoxContainer>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 28,
  },
  image: {
    height: 110,
    width: 110,
    borderRadius: 5,
    marginRight: 15,
    marginTop: -28,
  },
});
