import { sendGetAPI, sendPostAPI, sendPutAPI } from './axios';

export const getInspectionPending = () => sendGetAPI('find/inspection/pending');

export const getInspectionInProcess = () => sendGetAPI('find/inspection/inprocess');


export const getInspection = (params: any) => sendGetAPI(`/get-inspection`, params);

export const postInspection = (payload: any, storeName: any) => sendPostAPI(`/create-inspection/${storeName}`, payload);

export const putInspection = (payload: any, username: any) => sendPutAPI(`/set-status/${username}`, payload);
