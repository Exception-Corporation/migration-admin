import { HttpMethod } from '@/domain/http/http.client';

export interface LoadDataApi<T> {
  loadAll: (
    path: string,
    method: HttpMethod,
    headers: any,
    body: any
  ) => Promise<T>;
}
