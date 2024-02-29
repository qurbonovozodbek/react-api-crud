import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function ProtectedRoute({children, redirectTo = '/Login', isAuthenticated}) {
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate(redirectTo);
  }

  return children
}

function App() {
  const [token, setToken] = useState('');
  useEffect(() => {
    if(localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])

  return (
    <>
     <Routes>
       <Route path="/" element={<ProtectedRoute isAuthenticated={token ? true : false}>
         <Home />
       </ProtectedRoute>} />
       
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
     </Routes>
    </>
  )
}

export default App
