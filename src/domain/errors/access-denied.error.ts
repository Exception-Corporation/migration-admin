export class AccessDeniedError extends Error {
  constructor(data: string) {
    super('Access Denied!');
    this.name = 'AccessDeniedError';
    this.message = data;
  }
}
