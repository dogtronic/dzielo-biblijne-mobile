import * as React from 'react';

// Components
import {StyleSheet, Dimensions} from 'react-native';
import Drawer from '../components/Drawer';

// Navigation
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

// Styles
import Colors from '../constants/Colors';

// Models
import {Curiosity, Photo, Reading, Section} from '../store/types/Reading.model';

// Screens
import ReadingDetailsScreen from '../screens/ReadingDetailsScreen';
import ReadingDrawer from '../components/ReadingDrawer';

export type ReadingsDrawerParamList = {
  ReadingsStackNavigator: {reading: Reading};
};

export type ReadingsStackParamList = {
  [key in string]: {
    reading: Reading;
    section?: Section;
    curiosities?: Curiosity[];
    photos?: Photo[];
  };
};

const DrawerNav = createDrawerNavigator<ReadingsDrawerParamList>();
const StackNav = createStackNavigator<ReadingsStackParamList>();

const ReadingsStackNavigator = ({route}) => {
  const reading = route.params.reading;

  // reading.sections.forEach(v => {
  //   menu.push({
  //     name: v.section_type.name,
  //     onPress: () => null,
  //   });
  // });

  // if (reading.curiosities.length) {
  //   menu.push({
  //     name: t('menu:curiosities'),
  //     onPress: () => null,
  //   });
  // }

  // if (reading.photos.length) {
  //   menu.push({
  //     name: t('menu:photos'),
  //     onPress: () => null,
  //   });
  // }

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
      {/* <StackNav.Screen name="DashboardScreen" component={DashboardScreen} />
      <StackNav.Screen name="BibleScreen" component={BibleScreen} />
      <StackNav.Screen name="ChaptersScreen" component={ChaptersScreen} />
      <StackNav.Screen
        name="ChapterDetailsScreen"
        component={ChapterDetailsScreen}
      />
      <StackNav.Screen name="TermsListScreen" component={TermsListScreen} />
      <StackNav.Screen
        name={'TermDetailsScreen'}
        component={TermDetailsScreen}
      />
      <StackNav.Screen name={'ReadingsScreen'} component={ReadingsScreen} /> */}
    </StackNav.Navigator>
  );
};

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
