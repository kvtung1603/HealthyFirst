import { sendDeleteAPI, sendGetAPI, sendPutAPI } from './axios';

export const getUsersActive = () => sendGetAPI('/find/user/active');
export const getUsersPending = () => sendGetAPI('/find/user/new');

export const removeUsersPending = (id?: number) => sendDeleteAPI(`/remove/user/${id}`);
export const updateUSer = (id ?: number) => sendPutAPI(`/update-status/user/${id}}`);
