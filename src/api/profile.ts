import { sendGetAPI } from "./axios";

export const getProfile = () => sendGetAPI("/app/profile");
