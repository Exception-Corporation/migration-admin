import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import {
  IHttpClient,
  HttpStatusCode,
  HttpMethod
} from '@/domain/http/http.client';
import { LoadDataApi } from '@/domain/use-cases';

export class RemoteLoadDataApi<T> implements LoadDataApi<T> {
  private static instance: LoadDataApi<unknown> | undefined;
  constructor(private readonly httpClient: IHttpClient<T>) {}

  static getInstance<S>(httpClient: IHttpClient<S>) {
    if (this.instance) return this.instance as LoadDataApi<S>;
    this.instance = new RemoteLoadDataApi<S>(httpClient);
    return this.instance as LoadDataApi<S>;
  }

  async loadAll(
    url: string,
    method: HttpMethod,
    headers: any,
    body: any
  ): Promise<T> {
    const httpResponse = await this.httpClient.request({
      url: url,
      method,
      headers,
      body
    });

    const remoteStores = httpResponse.body;
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok || HttpStatusCode.create:
        return remoteStores;
      case HttpStatusCode.noContent:
        return {} as T;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError(httpResponse.body?.toString() as string);
      default:
        throw new UnexpectedError(httpResponse.body?.toString() as string);
    }
  }
}
