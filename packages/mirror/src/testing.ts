export const delayed = (cb: CallableFunction, delay = 1_000, ...args: unknown[]) => {
  const p = Promise.withResolvers();

  setTimeout(async (...args: unknown[]) => {
    try {
      const res = await cb(...args);
      p.resolve(res);
    } catch (e) {
      p.reject(e);
    }
  }, delay, ...args);

  return p.promise;
};
