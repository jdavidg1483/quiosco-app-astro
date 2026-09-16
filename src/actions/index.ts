// src/actions/index.ts
import { auth } from './auth';
import { orders } from './orders';
import { upload } from './uplaod';

export const server = {
  auth,
  orders,
  upload
};