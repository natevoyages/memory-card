import { useEffect, useState } from "react";

function Card({setGameState, pokemon}){
    const[selected, setSelected] = useState(false)
    const[src, setSrc] = useState(null);
    const[name, setName] = useState('null');
    useEffect(() => {
        pokemon.src.then( data => setSrc(data));
        pokemon.name.then( data => setName(data));
    }, [pokemon.src, pokemon.name])
        
    function select(){
        if(selected){
        setGameState(true);
        }
        else{
            setSelected(true);
        }
    }

        return (
            <div className ="card"
            onClick={select}>
                <img src={src} alt="pokemon" height='90px' width='auto' border = '1px solid black'/>
                <p>{name}</p>
            </div>);
}

export default Card;