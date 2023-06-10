export class UnexpectedError extends Error {
  constructor(data: string) {
    super('Something wrong happened. Try again in a few minutes.');
    this.name = 'UnexpectedError';
    this.message = data;
  }
}
