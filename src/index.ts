import { App } from "./app/app";
import "./style.css";

/* alert(`Привет! Сейчас часть элементов недоступна, но работа над ними кипит в полную меру.
 Если не сложно, проверь, пожалуйста, в последний день кроссчека. Спасибо за понимание. :)`) */

window.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.body;
  const app = new App(rootElement);


  
  app.start();
});
  