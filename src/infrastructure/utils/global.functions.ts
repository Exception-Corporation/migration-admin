export class GlobalFunctions {
  static to(router: { push: any }, path: string) {
    router.push(path);
  }

  static numberToArray(n: number) {
    const result: Array<number> = [];

    for (let i = 0; i < n; i++) {
      result.push(i);
    }

    return result;
  }
}
