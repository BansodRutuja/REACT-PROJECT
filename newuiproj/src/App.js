import'./App.css';
import React from 'react'
import Header from './Header';
import Customer from './Customer';
import Homepage from './Homepage';
import Menubar from './Menubar';
import Footer from './Footer';
import User2 from './user2';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';


const App = () => {
  return (

  <Router>
     <div>
          <Header/>
          <Menubar/>

          <Routes>
             <Route path='/Customer' element={<Customer/>}/>
             <Route path='/user2' element={<User2/>}/>
             <Route path='/homepage' element={<Homepage/>}/>

          </Routes>

          <Footer/>
          </div>
          </Router>  
  )
};

export default App;
