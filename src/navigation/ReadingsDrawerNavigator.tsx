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
import {CuriosityType} from '../store/types/Curiosity.model';

// Screens
import ReadingDetailsScreen from '../screens/ReadingDetailsScreen';
import SectionDetailsScreen from '../screens/SectionDetailsScreen';
import CuriosityBaseScreen from '../screens/CuriosityBaseScreen';
import Topbar from '../components/Topbar';
import {StackActions} from '@react-navigation/routers';

export type ReadingsDrawerParamList = {
  ReadingsStackNavigator: {reading: Reading; isSundayReading?: boolean};
};

export type ReadingsStackParamList = {
  [key in string]: {
    reading: Reading;
    section?: Section & {section_type: number};
    sectionType?: SectionType;
    type?: CuriosityType;
    curiosities?: Curiosity[] | Photo[];
    isSundayReading?: boolean;
  };
};

const DrawerNav = createDrawerNavigator<ReadingsDrawerParamList>();
const StackNav = createStackNavigator<ReadingsStackParamList>();

//@ts-ignore
const ReadingsStackNavigator = ({route}) => {
  const reading: Reading = route.params.reading;
  const isSundayReading = route.params.isSundayReading;

  return (
    <StackNav.Navigator
      initialRouteName="ReadingDetailsScreen"
      screenOptions={{
        header: ({navigation}) => {
          //@ts-ignore
          const {canGoBack, goBack, getParent} = navigation;

          return (
            <Topbar
              onPressLeftButton={() => goBack()}
              onPressRightButton={() =>
                //@ts-ignore
                getParent().getParent()?.openDrawer()
              }
              canGoBack={canGoBack}
            />
          );
        },
        presentation: 'modal',
        headerShown: true,
        animationEnabled: false,
      }}>
      <StackNav.Screen
        name="ReadingDetailsScreen"
        component={ReadingDetailsScreen}
        initialParams={{reading, isSundayReading}}
      />

      {reading.sections.map(v => (
        <StackNav.Screen
          key={v.id}
          name={`SectionDetailsScreen_${v.id}`}
          component={SectionDetailsScreen}
        />
      ))}

      {reading.curiosities.length ? (
        <StackNav.Screen
          name="CuriositiesScreen"
          component={CuriosityBaseScreen}
          initialParams={{
            type: CuriosityType.Curiosity,
            curiosities: reading.curiosities,
            reading,
          }}
        />
      ) : undefined}

      {reading.photos.length ? (
        <StackNav.Screen
          name="PhotosScreen"
          component={CuriosityBaseScreen}
          initialParams={{
            type: CuriosityType.Photo,
            curiosities: reading.photos,
            reading,
          }}
        />
      ) : undefined}
    </StackNav.Navigator>
  );
};

//@ts-ignore
const ReadingsDrawerNavigator = ({route}) => {
  const reading = route.params.reading;
  const isSundayReading = route.params.isSundayReading;

  return (
    <DrawerNav.Navigator
      initialRouteName="ReadingsStackNavigator"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'slide',
        drawerStyle: {
          ...styles.drawerContainer,
        },
      }}
      drawerContent={props => (
        <ReadingDrawer
          closeDrawer={props.navigation.closeDrawer}
          navigate={(name: string, params: object | undefined) =>
            props.navigation.dispatch(StackActions.replace(name, params))
          }
          reading={reading}
        />
      )}>
      <DrawerNav.Screen
        name={'ReadingsStackNavigator'}
        component={ReadingsStackNavigator}
        initialParams={{reading, isSundayReading}}
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
