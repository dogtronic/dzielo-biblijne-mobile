import * as React from 'react';

// components
import {Button, View, StyleSheet, Dimensions} from 'react-native';
import Topbar from '../components/Topbar';
import Drawer from '../components/Drawer';

// navigation
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

function HomeScreen({navigation}: any) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background,
      }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const DrawerNav = createDrawerNavigator();

const RootNavigator = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NavigationContainer>
        <DrawerNav.Navigator
          initialRouteName="Home"
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
          <DrawerNav.Screen name="Home" component={HomeScreen} />
          <DrawerNav.Screen
            name="Notifications"
            component={NotificationsScreen}
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
