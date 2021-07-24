import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

//sagas
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

//reducers
import bibleReducer from './reducers/bible';
import settingsReducer from './reducers/settings';
import termsReducer from './reducers/terms';

//sagas
import {booksSaga} from './sagas/bible';
import {settingsSaga} from './sagas/settings';
import {termsSaga} from './sagas/terms';

const persistConfig = {
  key: 'store',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  bible: bibleReducer,
  settings: settingsReducer,
  terms: termsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const rootReducer = persistReducer(persistConfig, reducers);

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export type StoreState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

function* saga() {
  yield all([...booksSaga, ...settingsSaga, ...termsSaga]);
}

sagaMiddleware.run(saga);

export const persistor = persistStore(store);

export default store;
