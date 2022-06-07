import { sendGetAPI } from './axios';

export const getAllCertificate = () => sendGetAPI('certificate/findAll');
