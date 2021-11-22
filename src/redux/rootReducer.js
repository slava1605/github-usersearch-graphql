import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import userListReducer from './slices/userList';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const userListPersistConfig = {
  key: 'userList',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  userList: persistReducer(userListPersistConfig, userListReducer),
});

export { rootPersistConfig, rootReducer };
