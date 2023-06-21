import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {batchDispatchMiddleware, enableBatching} from 'redux-batched-actions';
import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';
import {
  storeMigration,
  reduxEncryption,
  initializeTransformer,
} from './support';
import JobsSlice from '../../store/slices/JobsSlice';
import StackSlice from '../../store/slices/Trends/StackSlice';
import CryptoSlice from '../../store/slices/Trends/CryptoSlice';
import ForexSlice from '../../store/slices/Trends/ForexSlice';
import AuthSlice from '../../store/slices/AuthSlice';

const middleware = [batchDispatchMiddleware];
export const storage = new MMKV();

// const DEV_ENV = !!(env !== 'production');
const rootReducer = combineReducers({
  jobs: JobsSlice,
  stacks: StackSlice,
  crypto: CryptoSlice,
  forex: ForexSlice,
  auth: AuthSlice,
});
const PERSIST_VERSION = 1;

export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth'],
  blacklist: ['jobs', 'stacks', 'crypto', 'forex'],
  version: PERSIST_VERSION,
  migrate: createMigrate(storeMigration, {debug: true}),
  transforms: [initializeTransformer, reduxEncryption],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {warnAfter: 1028},
    }).concat(middleware),
  reducer: enableBatching(persistedReducer),
});

// Middleware: Redux Persist Persister
export const persistor = persistStore(store);
export default store;
