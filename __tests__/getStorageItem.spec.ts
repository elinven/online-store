import { getStorageItem } from "../src/components/utils/loader";
import localStorageMock from "../jest-localstorage-mock";

const cartStorageValue = {"amount":2,"summa":2398,"goods":[{"product":{"id":2,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...","price":899,"discountPercentage":17.94,"rating":4.44,"stock":34,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/2/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/2/1.jpg","https://i.dummyjson.com/data/products/2/2.jpg","https://i.dummyjson.com/data/products/2/3.jpg","https://i.dummyjson.com/data/products/2/thumbnail.jpg"]},"amount":1},{"product":{"id":7,"title":"Samsung Galaxy Book","description":"Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched","price":1499,"discountPercentage":4.15,"rating":4.25,"stock":50,"brand":"Samsung","category":"laptops","thumbnail":"https://i.dummyjson.com/data/products/7/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/7/1.jpg","https://i.dummyjson.com/data/products/7/2.jpg","https://i.dummyjson.com/data/products/7/3.jpg","https://i.dummyjson.com/data/products/7/thumbnail.jpg"]},"amount":1}],"promo":true,"codes":[{"code":"RS","name":"Rolling Scopes School","value":10},{"code":"EPM","name":"EPAM Systems","value":10}],"limit":4,"page":1};
const buyStorageValue = {buy:false};

describe("Test: get item from localstorage", () => {
  test("Get data from localstorage",() => {
    const initItemByDefault = getStorageItem("test");
    expect(initItemByDefault).toEqual("");
    localStorageMock.setItem("cart", JSON.stringify(cartStorageValue));
    const initItemByCartValue = getStorageItem("cart");
    expect(initItemByCartValue).toEqual(JSON.stringify(cartStorageValue));
    localStorageMock.setItem("buy", JSON.stringify(buyStorageValue));
    const initItemByBuyValue = getStorageItem("buy");
    expect(initItemByBuyValue).toEqual(JSON.stringify(buyStorageValue));
  });
});