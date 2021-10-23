import * as React from 'react';

// Components
import {StyleSheet, Dimensions, View} from 'react-native';
import Topbar from '../components/Topbar';
import Drawer from '../components/Drawer';
import Loader from '../components/Loader';
import ContentError from '../components/ContentError';

// Navigation
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// Styles
import Colors from '../constants/Colors';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

// Models
import {Reading} from '../store/types/Reading.model';
import {CuriosityBase, CuriosityType} from '../store/types/Curiosity.model';
import {TermType} from '../store/types/Term.model';

// Utils
import DeviceInfo from 'react-native-device-info';

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
import BibleMapScreen from '../screens/BibleMapScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootDrawerParamList = {
  StackRootNavigator: undefined;
};

export type RootNavigatorParamList = {
  UnifiedScreen: undefined;
  DashboardScreen: undefined;
  BibleScreen: undefined;
  ChaptersScreen: {bookId: string; testament: 'Nowy' | 'Stary'};
  ChapterDetailsScreen: {chapterId: string};
  TermsListScreen: {type: TermType};
  TermDetailsScreen: {termId: string; type: TermType};
  ReadingsScreen: undefined;
  ReadingsDrawerNavigator: {reading: Reading; isSundayReading?: boolean};
  HomiliesListScreen: undefined;
  NationalReadingsListScreen: undefined;
  ContactScreen: undefined;
  RecommendedScreen: undefined;
  CuriosityBaseScreen: {
    curiosities?: CuriosityBase[];
    type: CuriosityType;
    photoOfTheWeek?: boolean;
    reading?: Reading;
  };
  NotificationsScreen: undefined;
  NotificationDetailsScreen: {notificationId: string};
  BibleMapScreen: undefined;
  SettingsScreen: undefined;
};

const DrawerNav = createDrawerNavigator<RootDrawerParamList>();
const StackNav = createStackNavigator<RootNavigatorParamList>();

const StackRootNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName="DashboardScreen"
      mode="modal"
      screenOptions={{
        header: ({scene}) => {
          //@ts-ignore
          const {canGoBack, openDrawer, goBack} = scene.descriptor.navigation;

          return (
            <Topbar
              onPressLeftButton={() => goBack()}
              onPressRightButton={openDrawer}
              canGoBack={canGoBack}
            />
          );
        },
        headerShown: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
        options={{headerShown: false}}
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
      <StackNav.Screen name={'SettingsScreen'} component={SettingsScreen} />
      <StackNav.Screen name={'BibleMapScreen'} component={BibleMapScreen} />
    </StackNav.Navigator>
  );
};

const RootNavigator = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.settings.isSettingsLoading);
  const error = useAppSelector(state => state.settings.settingsError);

  React.useEffect(() => {
    dispatch(actions.getAppSettings.request());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader isAbsolute />
      </View>
    );
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() => dispatch(actions.getAppSettings.request())}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NavigationContainer>
        <DrawerNav.Navigator
          initialRouteName="StackRootNavigator"
          drawerPosition="right"
          drawerType="front"
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
  loaderContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  drawerContainer: {
    width: DeviceInfo.isTablet() ? 350 : Dimensions.get('window').width,
    backgroundColor: Colors.primary,
  },
});
