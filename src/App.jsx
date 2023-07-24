import { useRef, useState, useEffect } from 'react'
import Card from './components/Card'
import './App.css'


function App() {
  const[gameReset, setGameState] = useState(false);
  const[cards, setCards] = useState(null);
  const[score, setScore] = useState(0);
  const[bestScore, setBestScore] = useState(0);

  let ids = useRef([randomId(50),randomId(100), randomId(150),
    randomId(200),randomId(250), randomId(300),
    randomId(350),randomId(400), randomId(450),
    randomId(450),randomId(450), randomId(500),
  ])
  let mapRef = useRef(new Map());
  useEffect(() => {
    if(gameReset){
      mapRef.current.forEach((value, key, map) => {
        map.get(key).selected = false;
      });
    }
    let cardArr = ids.current.map((id) => 
      (
        <Card key={id} setGameState={setGameState} pokemon={mapRef.current.get(id)}
         setScore={setScore} setBestScore = {setBestScore} bestScore={bestScore} score={score} />
      ));
    setCards(cardArr);

  },[gameReset, bestScore, score]);
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
    ids.current.forEach((name)=> mapRef.current.set(name, {src: null, name: null,  selected: false}));

  mapRef.current.forEach((value, key, map)=> {
    map.set(key, { src:fetchSrcData(key), name: fetchName(key), selected : false});
    });
  }


  return (
    <>
    <nav>
      <h1>Memory Card</h1>
      <p>Best Score: {bestScore} </p>
      <p>Score: {score}</p>
    </nav>
    <main>
      <ul id='cards'>{cards}</ul>
    </main>
    <footer>
      natevoyages @2023
    </footer>
    </>
  );

}
//{gameState && <div> YOU LOSE!!!</div>}
export default App
