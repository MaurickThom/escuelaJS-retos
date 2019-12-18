window.addEventListener('load',event=>{
  localStorage.removeItem('next_fetch')
})

const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character';

const getData = async api => {
  const response = await fetch(`${api}`)
  const data = await response.json()
  if(data.error) throw new Error({
    err:true,
    message:data.error
  })
  const characters = data.results;
  localStorage.setItem('next_fetch',data.info.next)
  let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
  }).join('');
  let newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
  
}

const loadData = async () => {
  const next_fetch = localStorage.getItem('next_fetch')
  if(next_fetch==='') 
    return
  try{
    return !next_fetch ? await getData(API) : await getData(next_fetch)
  }catch(err){
    return console.log(err);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);