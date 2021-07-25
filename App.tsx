import React from 'react';

//navigation
import RootNavigator from './src/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//redux
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store/configureStore';

//translations
import {I18nextProvider} from 'react-i18next';
import i18n from './src/assets/translations';

const App = () => {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default App;
