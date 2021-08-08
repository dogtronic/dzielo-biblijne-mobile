import React from 'react';

// Components
import {StyleSheet, Text, Image} from 'react-native';
import {Marker} from 'react-native-maps-osmdroid';

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
    <Marker coordinate={coordinate} onPress={onPress}>
      <Text style={styles.markerText}>{title}</Text>
      <Image
        style={styles.markerImage}
        source={require('../assets/images/map_pin.png')}
      />
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
