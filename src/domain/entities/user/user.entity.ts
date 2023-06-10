export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public username: string,
    public phone: string,
    public email: string,
    public age: number,
    public role: string,
    public password: string,
    public active: boolean,
    public createdAt: string,
    public updatedAt: string
  ) {}
}
