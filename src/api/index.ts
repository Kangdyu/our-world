import axios, { AxiosResponse } from 'axios';
import { ICountryInfo } from './types';

const API_URL =
  'https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes';

export function fetchCountryInfo(): Promise<AxiosResponse<ICountryInfo>> {
  return axios.get(API_URL);
}
