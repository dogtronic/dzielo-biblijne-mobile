import React from 'react';

// Components
import {StyleSheet, Text} from 'react-native';
import {Marker} from 'react-native-maps';
import {MarkerIcon} from '../assets/svg';

// Styles
import Colors from '../constants/Colors';

type MapMarkerProps = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  onPress?: () => void;
  title: string;
};

const MapMarker: React.FC<MapMarkerProps> = ({coordinate, onPress, title}) => {
  return (
    <Marker
      coordinate={coordinate}
      onPress={onPress}
      stopPropagation={true}
      tracksViewChanges={false}>
      <Text style={styles.markerText}>
        {title?.substring(0, 20)}
        {title.length > 20 ? '...' : ''}
      </Text>
      <MarkerIcon style={styles.markerImage} />
    </Marker>
  );
};

export default MapMarker;

const styles = StyleSheet.create({
  markerText: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: Colors.white,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  markerImage: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
});
