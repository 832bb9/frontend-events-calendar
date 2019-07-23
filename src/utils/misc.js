export const method = (propName, ...args) => object =>
  object[propName](...args);

export const methodOf = (object, propName) => (...args) =>
  object[propName](...args);

export const pipeP = (...fns) => async (...args) => {
  let result;
  for (const fn of fns) {
    result = await fn(...args);
    args = [result];
  }
  return result;
};

export const call = (fn, ...args) => {
  if (typeof fn === "function") {
    return fn(...args);
  }
};

export const construct = constructor => (...args) => new constructor(...args);

export const unshift = item => list => [item, ...list];
