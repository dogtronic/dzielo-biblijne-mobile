import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

//sagas
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

//reducers
import bibleReducer from './reducers/bible';

//sagas
import {booksSaga} from './sagas/bible';

const persistConfig = {
  key: 'store',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  bible: bibleReducer,
});

const sagaMiddleware = createSagaMiddleware();

const rootReducer = persistReducer(persistConfig, reducers);

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export type StoreState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

function* saga() {
  yield all([...booksSaga]);
}

sagaMiddleware.run(saga);

export const persistor = persistStore(store);

export default store;
