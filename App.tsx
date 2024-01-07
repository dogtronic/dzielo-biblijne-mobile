import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

// Navigation
import RootNavigator from './src/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Redux
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store/configureStore';

// Translations
import {I18nextProvider} from 'react-i18next';
import i18n from './src/assets/translations';

// Utils
import SplashScreen from 'react-native-splash-screen';
import Colors from './src/constants/Colors';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar
              backgroundColor={Colors.primary}
              barStyle="light-content"
            />
            <RootNavigator />
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}

export default App;
