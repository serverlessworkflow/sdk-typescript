/**
 * Check if the provided value is an object but not an array
 * @param value The value to check
 * @returns True if the value is an object
 */
export const isObject = <T>(value: T): value is T & object => {
  if (!value) return false;
  return typeof value === 'object' && !Array.isArray(value);
};

/**
 * Makes a deep copy of the provided object
 * @param obj
 * @returns
 */
export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

/**
 * Checks the provided array is an array
 * @param arr
 * @returns
 */
export const isArray = <T>(arr: Array<T> | number | undefined): arr is Array<T> => !!arr && isNaN(arr as number);
