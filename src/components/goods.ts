export default async function getInfo() {
  const query = await fetch('https://dummyjson.com/products?limit=50');
  const cardsInfo = await query.json();
  if(cardsInfo){
      return cardsInfo;
  } else{
      throw "Quotes didn't load"
  }
}