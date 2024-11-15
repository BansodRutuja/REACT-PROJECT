import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React,{ useState } from 'react'; // Correct import


const Customer = () => {
    const [names, setNames] = useState(['Rutu', 'Neha']);
    const [currentName, setCurrentName] = useState('');

    const addToList = () => {
        //add crrentName to names array and pass updated array to setNames
        if(currentName == '') return;
        setNames([...names, currentName]);
        setCurrentName('');
    };

    const removeMe = (index)=>{
        //remove the item from index
        const newNames = names.filter((_, i) => i !== index);
        setNames(newNames);
    }

    return (
        <div>
            <input type="text" onChange={(e) => setCurrentName(e.target.value)} value={currentName} />
            <button onClick={() => addToList()}>Add To List</button>
            <br />
            <ul>
                {names.map((item, index) => (
                    <li key={index}>{item} <button onClick={()=>removeMe(index)}>X</button>  </li>
                ))}
            </ul>
        </div>
    );
}

export default Customer;