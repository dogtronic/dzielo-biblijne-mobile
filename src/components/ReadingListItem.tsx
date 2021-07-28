import React from 'react';

// Components
import {StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {InfoBox, InfoBoxContainer} from './InfoBox';

type ReadingListItemProps = {
  title: string;
  description?: string;
  onPressButton?: () => void;
  uri?: string;
  customButtonLabel?: string;
};

export const ReadingListItem: React.FC<ReadingListItemProps> = ({
  title,
  description,
  onPressButton,
  uri,
  customButtonLabel,
  children,
}) => (
  <InfoBoxContainer containerStyle={styles.container}>
    <TouchableOpacity
      style={styles.insideContainer}
      onPress={onPressButton}
      activeOpacity={0.7}>
      <Image style={styles.image} source={{uri}} resizeMode="cover" />
      <InfoBox
        title={title}
        description={description}
        onPressButton={onPressButton}
        position="vertical"
        customButtonLabel={customButtonLabel}
      />
    </TouchableOpacity>
    {children}
  </InfoBoxContainer>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },
  insideContainer: {
    flexDirection: 'row',
  },
  image: {
    height: 110,
    width: 110,
    borderRadius: 10,
    marginRight: 15,
    marginTop: -28,
  },
});
