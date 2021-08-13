import { configureStore } from '@reduxjs/toolkit';
import { gallery } from './reducer';

export const store = configureStore({
  reducer: { gallery },
});
