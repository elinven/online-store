const localStorageMock = (() => {
  let store = {} as {[key: string]: string;};
  return {
    getItem(key: string) {
      return store[key] as string;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    }, 
    removeItem(key: string) {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
});

export default localStorageMock;
