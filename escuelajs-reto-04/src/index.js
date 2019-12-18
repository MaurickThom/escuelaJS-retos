const _ = require('lodash')
// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const fetch = require('node-fetch')
const promiseRequest = require('request-promise-native') 

const orders = (time, product, table) => {
  return new Promise((resolve, reject) => {
    console.log(`### Orden: ${product} para ${table}`);
    if(time > 8000) return reject('Tiempo excedido')
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const randomTime = () =>  _.random(1000,8000)

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = async()=> {
  try{const result = await orders(randomTime(),menu.hotdog,table[0])
  console.log(result);
  const result2 = await orders(randomTime(),menu.pizza,table[2])
  console.log(result2);}
  catch(err){
    console.log(err);
  }
}

const fetchOrdens = async request =>{
  try{
    const result = await fetch(request.url,{method:request.method})
    const data = await result.json()
    return data
  }catch(err){
    // throw new Error(err)
    console.log(err);
  }
}

const waiter4 = async()=>{
  const request = []
  table.forEach(
    pedido=>request.push(
      fetchOrdens({url:'https://us-central1-escuelajs-api.cloudfunctions.net/orders',method:'GET'})
    //   promiseRequest.get({
    //     uri:'https://us-central1-escuelajs-api.cloudfunctions.net/orders'})
    )
  )
  try{
    const requestCompleted = await Promise.all(request)
    const ordernsRequest = requestCompleted.map(combo=>orders(randomTime(),combo.data,table[4]))
    const ordernsCompleted = await Promise.all(ordernsRequest)
    console.log(ordernsCompleted);
  }catch(err){
    console.log(err);
  }
}

waiter4()
// fetchOrdens({url:'https://us-central1-escuelajs-api.cloudfunctions.net/orders',method:'GET'})
// waiter();
// waiter2()


