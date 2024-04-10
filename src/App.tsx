import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import HomeScreen from './Component/HomeScreen';

function App() {
  

  return (
    <div><Router>

      <div className="App">
        <Routes> 
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<HomeScreen />}></Route>
         
        </Routes>
      </div>
    </Router></div>
  );
}

export default App;
