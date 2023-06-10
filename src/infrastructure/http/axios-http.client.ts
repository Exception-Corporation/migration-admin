import {
  IHttpClient,
  HttpRequest,
  HttpResponse
} from '@/domain/http/http.client';
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements IHttpClient<AxiosResponse> {
  async request(data: HttpRequest): Promise<HttpResponse<AxiosResponse>> {
    let axiosResponse: AxiosResponse;
    try {
      const http = axios.create({ baseURL: data.url, method: data.method });

      axiosResponse = await http.request({
        data: data.body,
        headers: data.headers
      });
    } catch (error: any) {
      axiosResponse = {
        data: error?.response?.data?.message || error.toString(),
        status: error.status || 400
      } as AxiosResponse;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}
