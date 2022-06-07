import { sendGetAPI, sendPostAPI } from './axios';

export const getStoreRestaurant = () => sendGetAPI('/find/store/restaurant');
export const getStoreManufacturing = () => sendGetAPI('/find/store/manufacturing');
export const getStoreInHandle = (username: any) => sendGetAPI(`/store/${username}`);

export const postStore = (payload: any) => sendPostAPI('/store/registry', payload);
