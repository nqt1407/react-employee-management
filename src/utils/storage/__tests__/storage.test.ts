import storage from '..';

const storageName = 'test_storage';
const storageValue = 'sample_storage_value';

describe('localstorage utility functions', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'removeItem');
    vi.spyOn(Storage.prototype, 'clear');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should get correct value by name', () => {
    const getStorageSpy = vi.spyOn(storage, 'get');

    storage.set(storageName, storageValue);

    const result = storage.get(storageName);

    expect(getStorageSpy).toHaveBeenCalledWith(storageName);

    expect(result).toBe('sample_storage_value');
  });

  test('should set a correct value with given key', () => {
    const setStorageSpy = vi.spyOn(storage, 'set');

    storage.set(storageName, storageValue);

    expect(setStorageSpy).toHaveBeenCalledWith(storageName, storageValue);

    const result = storage.get(storageName);

    expect(result).toBe('sample_storage_value');
  });

  test('should remove a correct value with given key', () => {
    const clearStorageSpy = vi.spyOn(storage, 'remove');

    storage.remove(storageName);

    expect(clearStorageSpy).toHaveBeenCalledWith(storageName);

    const result = storage.get(storageName);

    expect(result).toBeNull();
  });

  test('should remove all storage when call clearAll', () => {
    const key1 = 'testKey1';
    const value1 = 'testValue1';

    const key2 = 'testKey2';
    const value2 = 'testValue2';

    storage.set(key1, value1);
    storage.set(key2, value2);

    const clearAllStorageSpy = vi.spyOn(storage, 'removeAll');
    storage.removeAll();

    expect(clearAllStorageSpy).toHaveBeenCalledTimes(1);

    expect(window.localStorage.length).toBe(0);
  });
});
