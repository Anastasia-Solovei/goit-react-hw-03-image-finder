import { createAction } from '@reduxjs/toolkit';

export const getImgRequest = createAction('getImg/request');
export const getImgSuccess = createAction('getImg/success');
export const getImgError = createAction('getImg/error');
