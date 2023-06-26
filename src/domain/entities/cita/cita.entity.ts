export type StatusEnum = 'pending' | 'rejected' | 'finish';
export type TypeEnum = 'cita' | 'demand';

export class Cita {
  constructor(
    public id: number,
    public userId: number | null,
    public confirm: string | null,
    public country: string | null,
    public status: StatusEnum,
    public name: string,
    public email: string,
    public phoneNumber: string,
    public reason: string,
    public startDate: string,
    public endDate: string,
    public type: TypeEnum,
    public createdAt: string,
    public updatedAt: string
  ) {}
}
