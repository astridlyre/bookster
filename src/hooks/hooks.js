import { useState, useEffect, useCallback, useMemo, useRef } from "react";

export function useTimeout(callback, delay) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return useMemo(
    () => ({
      reset,
      clear,
    }),
    [reset, clear]
  );
}

export function useDebounce(callback, delay, deps) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...deps, reset]);
  useEffect(clear, [clear]);
}

export function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue) return JSON.parse(jsonValue);
    if (typeof defaultValue === "function") return defaultValue();
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const clear = useCallback(() => setValue(undefined), [setValue]);
  return useMemo(() => [value, setValue, clear], [value, setValue, clear]);
}

export function useToggle(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  return useMemo(() => {
    const toggleValue = value =>
      setValue(currentValue =>
        typeof value === "boolean" ? value : !currentValue
      );

    return [value, toggleValue];
  }, [value]);
}
