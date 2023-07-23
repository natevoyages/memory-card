import { useState } from "react";

function Card({setGameState}){
    const[selected, setSelected] = useState(false)

    function select(){
        if(selected){
        setGameState(true);
        }
        else{
            setSelected(true);
            console.log('trueeeee');
        }
    }



    return (<div onClick={select}>Card</div>);
}

export default Card;