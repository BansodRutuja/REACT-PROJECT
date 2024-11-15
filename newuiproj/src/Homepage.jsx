
import React ,{useState } from 'react'; // Correct import
import './Homepage.css'

function Homepage(){
    const [counter, setCounter]  = useState(10);
    const [RESULT, setResult]  = useState(0);
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    let a = 100;

    const calculate = ()=>{
        setResult(Number(value1)+Number(value2));
    };

    const subtract = ()=>{
        setResult(Number(value1)-Number(value2));
    };
    const multiply =()=>{
        setResult(Number(value1)*Number(value2));
    };

    const divide = ()=>{
        setResult(Number(value1)/Number(value2));
    };

   // useEffect(getHomepage,[]);

    return (
        <div className="homepage">
            <p>Value of Counter is: <h1>{counter}</h1></p>
            <button onClick={()=>setCounter(counter+1)}>Click Me</button>
            <p>Value of a is: {a}</p>
            <button onClick={()=>{a = a+1;console.log(a);}}>Click Me</button>
            
            <h1>My Calculator</h1>
            <input type="text" onChange={(e)=>setValue1(e.target.value)} value={value1}/><br />
            <input type="text" onChange={(e)=>setValue2(e.target.value)} value={value2}/><br />
            <button onClick={()=>calculate()}>Add</button><br />
            <button onClick={()=>subtract()}>subtract</button><br />
            <button onClick={()=>multiply()}>multiply</button><br />
            <button onClick={()=>divide()}>divide</button><br />
            <h4>{RESULT}</h4>

        </div>
    );
}

export default Homepage;