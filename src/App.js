import { Route, Routes } from 'react-router-dom';
import './App.css';
import Weather from './Component/Weather';
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Component/Home';
import { useContext } from 'react';
import { tokenContext } from './Context/ContextShare';
import Dashboard from './Component/Dashboard';

function App() {

  const {isAuthToken,setIsAuthToken}=useContext(tokenContext)

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/check-weather' element={isAuthToken ? <Weather /> : <Home/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={isAuthToken?<Dashboard/> :  <Home/>} />
      </Routes>
    </div>
  );
}

export default App;
