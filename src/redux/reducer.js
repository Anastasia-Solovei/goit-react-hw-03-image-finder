import { createReducer } from '@reduxjs/toolkit';
import { getImgRequest, getImgSuccess, getImgError } from './action';

const initialState = [];
const actions = {
  [getImgRequest]: (state, action) => {
    return initialState;
  },
  [getImgSuccess]: (state, action) => {
    return [...state, ...action.payload];
  },
  [getImgError]: () => {},
};

export const gallery = createReducer(initialState, actions);
