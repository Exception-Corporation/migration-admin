import { User } from '@/domain/entities/user/user.entity';

export type UserResponse = {
  success: boolean;
  access_token: string;
  user: User;
  itemsByPage: number;
  usersSize: number;
  totalUsers: number;
  totalPages: number;
  page: number;
  users: Array<User>;
};
