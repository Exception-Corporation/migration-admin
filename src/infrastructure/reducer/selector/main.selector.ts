export const getSelector = <T>(
  state: { [key: string]: T },
  stateName: string
) => state[stateName];
