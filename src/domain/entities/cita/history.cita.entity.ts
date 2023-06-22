export class HistoryCita {
  constructor(
    public id: number,
    public author: string,
    public changes: any,
    public formId: number,
    public createdAt: string,
    public updatedAt: string
  ) {}
}
