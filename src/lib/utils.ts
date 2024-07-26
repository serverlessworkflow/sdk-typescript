/**
 * Check if the provided value is an object but not an array
 * @param value The value to check
 * @returns True if the value is an object
 */
export const isObject = (value: unknown): boolean => {
  if (!value) return false;
  return typeof value === 'object' && !Array.isArray(value);
};
