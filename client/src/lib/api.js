const BASE = import.meta.env.VITE_API_URL || '';

export const api = (path, options) => {
  return fetch(`${BASE}${path}`, options);
};
