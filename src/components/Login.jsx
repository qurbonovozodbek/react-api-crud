import React from 'react'
import { useRef, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  


  function validate(usernameRef, passwordRef) {
    if(!usernameRef.current.value) {
      setError1('Username is required');
      usernameRef.current.style.outlineColor = 'red';
      usernameRef.current.focus()
      return false;
    } else {
      setError1('');
      usernameRef.current.style.outlineColor = '';
      usernameRef.current.style.backgroundColor = '';
    }

    if(!passwordRef.current.value) {
      setError2('Password is required');
      passwordRef.current.style.outlineColor = 'red';
      passwordRef.current.focus()
      return false;
    }else {
      setError2('');
      passwordRef.current.style.outlineColor = '';
    }

    return true;
  }

  function handleClick(e) {
    e.preventDefault();
    if (validate(usernameRef, passwordRef)) {
      setIsLoading(true)
      const user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }
      fetch("https://auth-rg69.onrender.com/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then((data) => {
          setIsLoading(false)
          console.log(data);
          if (data.message == 'User Not found.') {
            setError1(data.message)
          }
          if (data.message == 'Invalid Password!') {
            setError2(data.message)
          }
          if(data.id) {
            localStorage.setItem('token', data.accessToken)
            navigate('/',)
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <>
      <div className="container">
      <h1>Login</h1>
      <div className="box">
        <FaUser className='user' />
        <input type="text" placeholder='Enter username here...' ref={usernameRef}/>
        {error1 && <p style={{ color: 'red' }}>{error1}</p>}
      </div>
      <div className="box">
        <RiLockPasswordFill className='user' />
        <input type="password" placeholder='Enter password here...' ref={passwordRef}/>
        {error2 && <p style={{ color: 'red' }}>{error2}</p>}
      </div>
      <button disabled = {isLoading ? true : false} onClick={handleClick}>{isLoading ? <ImSpinner3 className='loading'/> : "Save"}</button>
     </div>
    </>
  )
}

export default Login