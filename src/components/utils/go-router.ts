import { ProductCart } from "../../types/index";

const goRouter = (hash: string, cart: ProductCart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.hash = hash;
}

export default goRouter;