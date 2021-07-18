import React from 'react';

// Components
import {StyleSheet, Image, View} from 'react-native';
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
    <View style={styles.insideContainer}>
      <Image style={styles.image} source={{uri}} resizeMode="cover" />
      <InfoBox
        title={title}
        description={description}
        onPressButton={onPressButton}
        position="vertical"
        customButtonLabel={customButtonLabel}
      />
    </View>
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
