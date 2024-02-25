import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import md5 from 'js-md5';

import { RootState } from '../store';


const BASE_URL = "http://api.valantis.store:40000/";

const generatePassword = (date = new Date()) => {
  const year = date.toLocaleString('default', {year: 'numeric'});
  const month = date.toLocaleString('default', {
    month: '2-digit',
  });
  const day = date.toLocaleString('default', {day: '2-digit'});
  const password = `Valantis_${[year, month, day].join('')}`;
  return password;
}
const axiosAuthorization = {
  headers: {
    "X-Auth": md5(generatePassword())
  }
};

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  products: ['product1'],
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // setCategories(state, action) {
    //   state.isLoading = false;
    //   state.categories = action.payload;
    // },

    setProducts(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
  },
});
export const productActions = slice.actions;
// Reducer
export default slice.reducer;

export function getProducts(action, params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(BASE_URL,
        {
          action,
          params
        },
        axiosAuthorization
      );
      dispatch(slice.actions.setProducts(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}