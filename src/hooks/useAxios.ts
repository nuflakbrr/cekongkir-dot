import axios, { AxiosInstance } from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const createNewClient: () => AxiosInstance = () => {
  const BASE_API = process.env.NEXT_PUBLIC_API_URL;

  return axios.create({
    baseURL: BASE_API,
    headers: {
      Accept: 'application/json',
    },
    httpsAgent,
  });
};

export const client: AxiosInstance = createNewClient();

type HookType = () => AxiosInstance;

export const useAxios: HookType = () => {
  client.interceptors.request.use((config) => {
    const newConfig = { ...config };

    return newConfig;
  });

  return client;
};

export const { isAxiosError } = axios;
