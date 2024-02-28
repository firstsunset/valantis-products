import { combineReducers } from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
// eslint-disable-next-line import/no-cycle
import productReducer from './slices/product';
// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve();
  },
  removeItem() {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;
