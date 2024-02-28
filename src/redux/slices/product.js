import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import md5 from 'js-md5';

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
  productsIds: [],
  products: [],
  productsIdsByName: [],
  productsByName: [],
  productsIdsByBrand: [],
  productsByBrand: [],
  productsIdsByPrice: [],
  productsByPrice: [],
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    setProductsIds(state, action) {
      state.isLoading = false;
      state.productsIds = action.payload;
    },

    setProducts(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    setProductsIdsByName(state, action) {
      state.isLoading = false;
      state.productsIdsByName = action.payload;
    },

    setProductsByName(state, action) {
      state.isLoading = false;
      state.productsByName = action.payload;
    },

    setProductsIdsByBrand(state, action) {
      state.isLoading = false;
      state.productsIdsByBrand = action.payload;
    },

    setProductsByBrand(state, action) {
      state.isLoading = false;
      state.productsByBrand = action.payload;
    },

    setProductsIdsByPrice(state, action) {
      state.isLoading = false;
      state.productsIdsByPrice = action.payload;
    },

    setProductsByPrice(state, action) {
      state.isLoading = false;
      state.productsByPrice = action.payload;
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

export function getProductsIds(action, params) {
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
      if (response.status === 200) {
        dispatch(slice.actions.setProductsIds(response.data.result));        
      } else return;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

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
      if (response.status === 200) {
        dispatch(slice.actions.setProducts(response.data.result));        
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log(error);
    }
  };
}

export function getProductsIdsByName(action, params) {
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
      if (response.status === 200) {
        dispatch(slice.actions.setProductsIdsByName(response.data.result));        
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductsByName(action, params) {
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
      if (response.status === 200) {
        dispatch(slice.actions.setProductsByName(response.data.result));        
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductsIdsByBrand(action, params) {
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
      if (response.status === 200) {
        dispatch(slice.actions.setProductsIdsByBrand(response.data.result));        
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductsByBrand(action, params) {
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
      if (response.status === 200) {
        dispatch(slice.actions.setProductsByBrand(response.data.result));        
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductsIdsByPrice(action, params) {
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
      if (response.status === 200) {
        dispatch(slice.actions.setProductsIdsByPrice(response.data.result));        
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductsByPrice(action, params) {
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
      if (response.status === 200) {
        dispatch(slice.actions.setProductsByPrice(response.data.result));        
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}