const deepEqual = <T>(obj1: T, obj2: T): boolean => {
  if (obj1 === obj2) return true;

  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (
      !keys2.includes(key) ||
      !deepEqual(
        (obj1 as Record<string, unknown>)[key],
        (obj2 as Record<string, unknown>)[key],
      )
    ) {
      return false;
    }
  }

  return true;
};

const fastShallowEqual = <T extends Record<string, any> | null>(
  obj1: T,
  obj2: T,
) => {
  if (obj1 === obj2) return true;

  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;

  let obj1Length = 0;
  let obj2Length = 0;

  for (const key in obj1) {
    obj1Length += 1;

    if (!Object.is(obj1[key], obj2[key])) return false;

    if (!(key in obj2)) return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ in obj2) {
    obj2Length += 1;
  }

  return obj1Length === obj2Length;
};

export { deepEqual, fastShallowEqual };
