// TODO Change key
const localStoragePrefix = 'react_employee_app_';

const storage = {
  get: (name: string) => {
    return localStorage.getItem(`${localStoragePrefix}${name}`);
  },
  set: (name: string, value: string) => {
    localStorage.setItem(`${localStoragePrefix}${name}`, value);
  },
  remove: (name: string) => {
    localStorage.removeItem(`${localStoragePrefix}${name}`);
  },
  removeAll: () => {
    localStorage.clear();
  },
};

export default storage;
