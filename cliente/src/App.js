import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import ProtectedRoute from './components/utils/ProtectedRoute';
import { useLocalStorage } from 'react-use';

function App() {
/*
  //const [user, setUser] = useLocalStorage('user');
  const [user, setUSer] = useState(false);
  
  //se usa para obtener datos de una API y actualizar el estado del componente con el resultado
    useEffect(()=> {
      // POST request using fetch inside useEffect React hook
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React Hooks POST Request Example' })
      };
    
      fetch('http://localhost:3000/login', requestOptions)
        .then(response => response.json())
        //if data=1 getUser(true) sino getUSer(false)
        .then(data => setUSer(true));
      }, [])
*/
//<Route element={<ProtectedRoute canActivate={user} redirectPath='/login' />}></Route>
//se va directamente al login, el componente home se queda suelto
  return (
    <BrowserRouter>
      <div className="container mt-5">
        <Routes>
          <Route element={<ProtectedRoute canActivate={true} redirectPath='/login' />}>
            <Route path='' element={<Login />} />
            <Route path='about' element={<About />} />
          </Route>
          <Route path='home' element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
