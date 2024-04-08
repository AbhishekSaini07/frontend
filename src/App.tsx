import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Example from './Component/Tail';

function App() {
  

  return (
    <div><Router>

      <div className="App">
        <Routes> 
        <Route path='/' element={<Example />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<Home />}></Route>
         
        </Routes>
      </div>
    </Router></div>
  );
}

export default App;
