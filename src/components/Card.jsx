import { useEffect, useState } from "react";
import '../styles/Card.css'

function Card({setGameState, pokemon, setBestScore, setScore, score, bestScore, reset}){
    const[selected, setSelected] = useState(false)
    const[src, setSrc] = useState(null);
    const[name, setName] = useState(null);
    useEffect(() => {
        pokemon.src.then( data => setSrc(data));
        pokemon.name.then( data => setName(data));
    }, [pokemon.src, pokemon.name])
        
    function select(){
        if(selected){
        setGameState(true);
        setScore(0);
        }
        else{
            setSelected(true);
            setScore(n => n + 1);
            if(score == bestScore){
            setBestScore(n => n + 1);
            }
        }
    }

        return (
            <div className ="card"
            onClick={select}>
                <img src={src} alt="pokemon" border = '1px solid black' />
                <p>{name}</p>
            </div>);
}

export default Card;