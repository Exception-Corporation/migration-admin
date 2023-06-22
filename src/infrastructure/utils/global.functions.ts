import { format } from 'date-fns-tz';

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

  /**
   * Returns the properties of the second object that are different from the first object.
   * @param obj1 - The first object.
   * @param obj2 - The second object.
   * @returns An object containing the different properties.
   */
  static getDiffProperties<T>(obj1: T, obj2: T): Partial<T> {
    const diffProperties: Partial<T> = {};

    for (const key in obj2) {
      if (obj1[key] !== obj2[key]) {
        diffProperties[key] = obj2[key];
      }
    }

    return diffProperties;
  }

  static localDate(fechaISO: string) {
    const fecha = new Date(fechaISO);
    return format(fecha, 'dd MMMM yyyy HH:mm:ss', {});
  }
}
