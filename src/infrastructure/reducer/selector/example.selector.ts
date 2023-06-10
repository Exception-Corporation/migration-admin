import { IExample } from '@/infrastructure/reducer/slices/example.slice';

export const exampleData = (state: { example: IExample }) => state.example.data;
