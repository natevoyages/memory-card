import { useRef, useState } from 'react'
import Card from './components/Card'
import './App.css'


function App() {
  const[gameState, setGameState] = useState(false);
  let names = useRef([randomId(50),randomId(100), randomId(150),
    randomId(200),randomId(250), randomId(300),
    randomId(350),randomId(400), randomId(450),
    randomId(450),randomId(450), randomId(500),
  ])
  let mapRef = useRef(new Map());
  function randomId(value) {
    let increment = Math.floor(value/51);
    return Math.floor(Math.random()*value) + 1 + increment * 50;
  }
  async function fetchSrcData(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
      mode: 'cors'
    })
    let pokemon = await response.json();
    let pokemonSrc = pokemon.sprites.other['official-artwork'].front_default;
    return pokemonSrc;
  }
  async function fetchName(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
      mode: 'cors'
    })
    let pokemon = await response.json();
    let pokemonName = pokemon.name;
    return pokemonName;
  }
  if(mapRef.current.size == 0){
    names.current.forEach((name)=> mapRef.current.set(name, {src: null, name: null,  selected: false}));

  mapRef.current.forEach((value, key, map)=> {
    map.set(key, { src:fetchSrcData(key), name: fetchName(key), selected : false});

    });
  }



  return (
    <>
    <nav>
      <h1>Memory Card</h1>
    </nav>
    <main>
      <Card setGameState={setGameState} pokemon={mapRef.current.get(names.current[0])} />
      {gameState && <div> YOU LOSE!!!</div>}

    </main>
    <footer>
      natevoyages @2023
    </footer>
    </>
  );

}

export default App
