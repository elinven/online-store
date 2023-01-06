export default async function getInfo() {
  let query = await fetch('https://dummyjson.com/products?limit=50');
  let cardsInfo = await query.json();
  if(cardsInfo){
      return cardsInfo;
  } else{
      throw "Quotes didn't load"
  };
}