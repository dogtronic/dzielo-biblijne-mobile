import * as React from 'react';

// Components
import {StyleSheet} from 'react-native';
import ReadingDrawer from '../components/ReadingDrawer';

// Navigation
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

// Styles
import Colors from '../constants/Colors';

// Models
import {
  Curiosity,
  Photo,
  Reading,
  Section,
  SectionType,
} from '../store/types/Reading.model';

// Screens
import ReadingDetailsScreen from '../screens/ReadingDetailsScreen';
import SectionDetailsScreen from '../screens/SectionDetailsScreen';

export type ReadingsDrawerParamList = {
  ReadingsStackNavigator: {reading: Reading};
};

export type ReadingsStackParamList = {
  [key in string]: {
    reading: Reading;
    section?: Section & {section_type: number};
    sectionType?: SectionType;
    curiosities?: Curiosity[];
    photos?: Photo[];
  };
};

const DrawerNav = createDrawerNavigator<ReadingsDrawerParamList>();
const StackNav = createStackNavigator<ReadingsStackParamList>();

//@ts-ignore
const ReadingsStackNavigator = ({route}) => {
  const reading: Reading = route.params.reading;

  return (
    <StackNav.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <StackNav.Screen
        name="ReadingDetailsScreen"
        component={ReadingDetailsScreen}
        initialParams={{reading}}
      />

      {reading.sections.map(v => (
        <StackNav.Screen
          key={v.id}
          name={`SectionDetailsScreen_${v.id}`}
          component={SectionDetailsScreen}
        />
      ))}
    </StackNav.Navigator>
  );
};

//@ts-ignore
const ReadingsDrawerNavigator = ({route}) => {
  const reading = route.params.reading;

  return (
    <DrawerNav.Navigator
      initialRouteName="ReadingsStackNavigator"
      drawerPosition="right"
      drawerType="slide"
      drawerStyle={styles.drawerContainer}
      drawerContent={props => (
        <ReadingDrawer
          closeDrawer={props.navigation.closeDrawer}
          navigate={props.navigation.navigate}
          reading={reading}
        />
      )}>
      <DrawerNav.Screen
        name={'ReadingsStackNavigator'}
        component={ReadingsStackNavigator}
        initialParams={{reading}}
      />
    </DrawerNav.Navigator>
  );
};

export default ReadingsDrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  drawerContainer: {
    width: 250,
    backgroundColor: Colors.primary,
  },
});
