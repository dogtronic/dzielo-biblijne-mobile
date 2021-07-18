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

// Styles
import Colors from '../constants/Colors';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

//screens
import DashboardScreen from '../screens/DashboardScreen';

export type RootNavigatorParamList = {
  DashboardScreen: undefined;
};

const DrawerNav = createDrawerNavigator<RootNavigatorParamList>();

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
          initialRouteName="DashboardScreen"
          screenOptions={{
            header: ({scene}) => {
              //@ts-ignore
              const {canGoBack, openDrawer, goBack} =
                scene.descriptor.navigation;

              return (
                <Topbar
                  onPressLeftButton={goBack}
                  onPressRightButton={openDrawer}
                  canGoBack={canGoBack}
                />
              );
            },
            headerShown: true,
          }}
          drawerPosition="right"
          drawerType="slide"
          drawerStyle={styles.drawerContainer}
          drawerContent={props => (
            <Drawer closeDrawer={props.navigation.closeDrawer} />
          )}>
          <DrawerNav.Screen
            name="DashboardScreen"
            component={DashboardScreen}
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
