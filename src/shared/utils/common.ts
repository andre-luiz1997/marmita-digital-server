export function filterUndefinedOrNull(obj: any): any {
  const filteredObj: any = {};

  for (const key in obj) {
    // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          // Recursively filter nested objects
          filteredObj[key] = filterUndefinedOrNull(value);
        } else if (Array.isArray(value)) {
          // Filter each item in an array recursively
          filteredObj[key] = value.map(item => {
            if (typeof item === 'object') {
              return filterUndefinedOrNull(item);
            }
            return item;
          }); 
        } else {
          // Keep primitive values as-is
          filteredObj[key] = value;
        }
      }
    }
  }

  return filteredObj;
}