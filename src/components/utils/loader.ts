export function getStoreHash() {
  return localStorage.getItem('storeHash') ? localStorage.getItem('storeHash') : "";
}