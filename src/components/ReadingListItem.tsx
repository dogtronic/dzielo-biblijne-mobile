import React from 'react';

// Components
import {StyleSheet, Image, StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {InfoBox, InfoBoxContainer} from './InfoBox';
//@ts-ignore - missing ts definitions
import ViewOverflow from 'react-native-view-overflow';

type ReadingListItemProps = {
  title: string;
  description?: string;
  onPressButton?: () => void;
  uri?: string;
  customButtonLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
  descriptionNumberOfLines?: number;
};

export const ReadingListItem: React.FC<ReadingListItemProps> = ({
  title,
  description,
  onPressButton,
  uri,
  customButtonLabel,
  children,
  containerStyle,
  descriptionNumberOfLines,
}) => (
  <ViewOverflow style={containerStyle}>
    <InfoBoxContainer containerStyle={styles.container}>
      <TouchableOpacity
        onPress={onPressButton}
        activeOpacity={0.7}
        style={styles.rowContainer}>
        <Image style={styles.image} source={{uri}} resizeMode="cover" />
        <InfoBox
          title={title}
          description={description}
          position="vertical"
          customButtonLabel={customButtonLabel}
          descriptionNumberOfLines={descriptionNumberOfLines}
        />
      </TouchableOpacity>

      {children}
    </InfoBoxContainer>
  </ViewOverflow>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -28,
  },
  image: {
    height: 110,
    width: 110,
    borderRadius: 10,
    marginRight: 15,
  },
});
