import { AxiosHttpClient } from '@/infrastructure/http/axios-http.client';
import { IHttpClient } from '@/domain/http/http.client';

const httpClient: IHttpClient<any> = new AxiosHttpClient();

export default httpClient;
