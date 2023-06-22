import { RemoteLoadDataApi } from '@/data/use-cases/shared/remote.load.data.api';
import HttpClient from '@/infrastructure/http';
import config from '@/infrastructure/config';
import { Cita } from '@/domain/entities/cita/cita.entity';
import { getToken } from '@/infrastructure/utils/token';
import { CitaResponse } from '@/data/use-cases/citas/types/response.type';
import { StatusEnum, TypeEnum } from '@/domain/entities/cita/cita.entity';

export class CitaApi {
  private static request =
    RemoteLoadDataApi.getInstance<CitaResponse>(HttpClient);
  private static url = config.api.migration.url.toString();

  static async delete(id: number): Promise<boolean> {
    await this.request.loadAll(
      `${this.url}/form/delete/${id}`,
      'DELETE',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      {}
    );

    return true;
  }

  static async create({
    userId,
    confirm,
    status,
    name,
    email,
    phoneNumber,
    reason,
    startDate,
    endDate,
    type
  }: {
    userId?: number;
    confirm?: string;
    status: StatusEnum;
    name: string;
    email: string;
    phoneNumber: string;
    reason: string;
    startDate: string;
    endDate: string;
    type: TypeEnum;
  }) {
    await this.request.loadAll(
      this.url + '/form/save',
      'POST',
      { 'Content-Type': 'application/json' },
      {
        userId,
        confirm,
        status,
        name,
        email,
        phoneNumber,
        reason,
        startDate,
        endDate,
        type
      }
    );

    return true;
  }

  static async getAll(
    page: number,
    pageSize: number,
    searchBy: string
  ): Promise<CitaResponse> {
    const data: any = await this.request.loadAll(
      `${this.url}/form/getAll?pageSize=${pageSize}&page=${page}&searchBy=${searchBy}`,
      'GET',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      {}
    );

    return {
      success: data.success,
      page: data.page,
      itemsByPage: data.itemsByPage,
      formSize: data.formsSize,
      totalForms: data.totalForms,
      totalCitas: data.totalCitas,
      totalDemands: data.totalDemands,
      totalPages: data.totalPages,
      forms: data.result
    } as CitaResponse;
  }

  static async update(
    {
      id,
      userId,
      confirm,
      status,
      name,
      email,
      phoneNumber,
      reason,
      startDate,
      endDate,
      type
    }: {
      id: number;
      userId?: number;
      confirm?: string;
      status: StatusEnum;
      name: string;
      email: string;
      phoneNumber: string;
      reason: string;
      startDate: string;
      endDate: string;
      type: TypeEnum;
    },
    author: string,
    token?: string
  ) {
    await this.request.loadAll(
      `${this.url}/form/update/${id}`,
      'PUT',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ? token : getToken()}`,
        author
      },
      {
        userId,
        status,
        confirm,
        name,
        email,
        phoneNumber,
        reason,
        startDate,
        endDate,
        type
      }
    );

    return true;
  }

  static async getById(id: number): Promise<Cita> {
    const { form } = await this.request.loadAll(
      `${this.url}/form/getOne/${id}`,
      'GET',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      {}
    );

    return form;
  }
}
