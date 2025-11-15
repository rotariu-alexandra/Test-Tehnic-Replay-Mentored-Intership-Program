import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const time = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(time);
  }, [value, delay]);
  return debounced;
};
