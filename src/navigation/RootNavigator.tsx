import * as React from 'react';

// Components
import {StyleSheet, Dimensions} from 'react-native';
import Topbar from '../components/Topbar';
import Drawer from '../components/Drawer';
import Loader from '../components/Loader';

// Navigation
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

// Styles
import Colors from '../constants/Colors';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

// Models
import {Reading} from '../store/types/Reading.model';
import {CuriosityBase} from '../store/types/Curiosity.model';

//screens
import DashboardScreen from '../screens/DashboardScreen';
import BibleScreen from '../screens/BibleScreen';
import ChaptersScreen from '../screens/ChaptersScreen';
import ChapterDetailsScreen from '../screens/ChapterDetailsScreen';
import TermsListScreen from '../screens/TermsListScreen';
import TermDetailsScreen from '../screens/TermDetailsScreen';
import ReadingsScreen from '../screens/ReadingsScreen';
import ReadingsDrawerNavigator from './ReadingsDrawerNavigator';
import HomiliesListScreen from '../screens/HomiliesListScreen';
import NationalReadingsListScreen from '../screens/NationalReadingsScreen';
import ContactScreen from '../screens/ContactScreen';
import RecommendedScreen from '../screens/RecommendedScreen';
import CuriosityBaseScreen from '../screens/CuriosityBaseScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NotificationDetailsScreen from '../screens/NotificationDetailsScreen';

export type RootDrawerParamList = {
  StackRootNavigator: undefined;
};

export type RootNavigatorParamList = {
  DashboardScreen: undefined;
  BibleScreen: undefined;
  ChaptersScreen: {bookId: number; testament: 'Nowy' | 'Stary'};
  ChapterDetailsScreen: {chapterId: number};
  TermsListScreen: undefined;
  TermDetailsScreen: {termId: number};
  ReadingsScreen: undefined;
  ReadingsDrawerNavigator: {reading: Reading};
  HomiliesListScreen: undefined;
  NationalReadingsListScreen: undefined;
  ContactScreen: undefined;
  RecommendedScreen: undefined;
  CuriosityBaseScreen: {
    curiosities?: CuriosityBase[];
    type: 'curiosity' | 'photo';
  };
  NotificationsScreen: undefined;
  NotificationDetailsScreen: {notificationId: number};
};

const DrawerNav = createDrawerNavigator<RootDrawerParamList>();
const StackNav = createStackNavigator<RootNavigatorParamList>();

const StackRootNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        header: ({scene}) => {
          //@ts-ignore
          const {canGoBack, openDrawer, goBack} = scene.descriptor.navigation;

          return (
            <Topbar
              onPressLeftButton={goBack}
              onPressRightButton={openDrawer}
              canGoBack={canGoBack}
            />
          );
        },
        headerShown: true,
      }}>
      <StackNav.Screen name="DashboardScreen" component={DashboardScreen} />
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
      <StackNav.Screen name={'ReadingsScreen'} component={ReadingsScreen} />
      <StackNav.Screen
        name={'ReadingsDrawerNavigator'}
        component={ReadingsDrawerNavigator}
      />
      <StackNav.Screen
        name={'HomiliesListScreen'}
        component={HomiliesListScreen}
      />
      <StackNav.Screen
        name={'NationalReadingsListScreen'}
        component={NationalReadingsListScreen}
      />
      <StackNav.Screen name={'ContactScreen'} component={ContactScreen} />
      <StackNav.Screen
        name={'RecommendedScreen'}
        component={RecommendedScreen}
      />
      <StackNav.Screen
        name={'CuriosityBaseScreen'}
        component={CuriosityBaseScreen}
      />
      <StackNav.Screen
        name={'NotificationsScreen'}
        component={NotificationsScreen}
      />
      <StackNav.Screen
        name={'NotificationDetailsScreen'}
        component={NotificationDetailsScreen}
      />
    </StackNav.Navigator>
  );
};

const RootNavigator = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.settings.isSettingsLoading);

  React.useEffect(() => {
    dispatch(actions.getAppSettings.request());
  }, [dispatch]);

  if (loading) {
    return <Loader isAbsolute />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NavigationContainer>
        <DrawerNav.Navigator
          initialRouteName="StackRootNavigator"
          drawerPosition="right"
          drawerType="slide"
          drawerStyle={styles.drawerContainer}
          drawerContent={props => (
            <Drawer
              closeDrawer={props.navigation.closeDrawer}
              navigate={props.navigation.navigate}
            />
          )}>
          <DrawerNav.Screen
            name={'StackRootNavigator'}
            component={StackRootNavigator}
          />
        </DrawerNav.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  drawerContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: Colors.primary,
  },
});
