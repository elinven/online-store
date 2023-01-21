export function getStorageItem(item: string) {
  return localStorage.getItem(item) ? localStorage.getItem(item) : "";
}