import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import './Menubar.css';



function Menubar(){
    return (
    <>
    <ul className='menubar'>
        <li><a><Link to="/homepage">Homepage</Link></a></li>
        <li><a><Link to="/Customer">Customers</Link></a></li>
        <li><a><Link to="/user2">Users</Link></a></li>
    </ul>
    </>
    );
}
export default Menubar;