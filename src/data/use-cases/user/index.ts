import { RemoteLoadDataApi } from '@/data/use-cases/shared/remote.load.data.api';
import HttpClient from '@/infrastructure/http';
import config from '@/infrastructure/config';
import { User } from '@/domain/entities/user/user.entity';
import { getToken } from '@/infrastructure/utils/token';
import { UserResponse } from '@/data/use-cases/user/types/response.type';

export class UserApi {
  private static request =
    RemoteLoadDataApi.getInstance<UserResponse>(HttpClient);
  private static url = config.api.users.url.toString();

  static async login(email: string, password: string): Promise<string> {
    const { access_token } = await this.request.loadAll(
      `${this.url}/login`,
      'POST',
      { 'Content-Type': 'application/json' },
      {
        user: {
          email: email.includes('@') ? email : undefined,
          password,
          username: email
        }
      }
    );

    return access_token;
  }

  static async getPassword(email: string): Promise<boolean> {
    const { success } = await this.request.loadAll(
      `${this.url}/missing/password/${email}`,
      'POST',
      { 'Content-Type': 'application/json' },
      {
        url: `${config.hostname}/recover-password`
      }
    );

    return Boolean(success);
  }

  static async delete(id: number): Promise<boolean> {
    const { success } = await this.request.loadAll(
      `${this.url}/delete/${id}`,
      'DELETE',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      {}
    );

    return success;
  }

  static async create({
    email,
    password,
    firstname,
    lastname,
    username,
    age,
    phone,
    role
  }: {
    email: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
    phone: string;
    age: number;
    role?: string;
  }) {
    const { success } = await this.request.loadAll(
      this.url,
      'POST',
      { 'Content-Type': 'application/json' },
      {
        user: {
          firstname,
          lastname,
          username,
          email,
          age,
          password,
          role,
          phone: phone || ''
        }
      }
    );

    return Boolean(success);
  }

  static async getAll(
    page: number,
    pageSize: number,
    searchBy: string
  ): Promise<UserResponse> {
    const data = await this.request.loadAll(
      `${this.url}/getAll?pageSize=${pageSize}&page=${page}&searchBy=${searchBy}`,
      'GET',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      {}
    );

    return data;
  }

  static async update(
    {
      id,
      email,
      password,
      firstname,
      lastname,
      username,
      age,
      role,
      phone
    }: {
      id: number;
      email?: string;
      password?: string;
      username?: string;
      firstname?: string;
      lastname?: string;
      age?: number;
      role?: string;
      phone?: string;
    },
    token?: string
  ) {
    password =
      !password || password == null || password == '' || password == ' '
        ? undefined
        : password;

    const { success } = await this.request.loadAll(
      `${this.url}/update/${id}`,
      'PUT',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ? token : getToken()}`
      },
      {
        user: {
          firstname,
          lastname,
          username,
          email,
          age,
          password,
          role,
          phone
        }
      }
    );

    return Boolean(success);
  }

  static async getById(id: number): Promise<User> {
    const { user } = await this.request.loadAll(
      `${this.url}/get/${id}`,
      'GET',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      {}
    );

    return user;
  }

  static async updateOwner({
    id,
    email,
    password,
    verifyPassword,
    firstname,
    lastname,
    username,
    phone,
    age,
    role
  }: {
    id: number;
    email: string;
    password?: string;
    verifyPassword: string;
    username: string;
    firstname: string;
    lastname: string;
    phone: string;
    age: number;
    role: string;
  }) {
    password =
      !password || password == null || password == '' || password == ' '
        ? undefined
        : password;

    const { success } = await this.request.loadAll(
      `${this.url}/update/${id}?owner=true`,
      'PUT',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      {
        user: {
          firstname,
          lastname,
          username,
          email,
          age,
          password,
          verifyPassword,
          role,
          phone
        }
      }
    );

    return Boolean(success);
  }
}
