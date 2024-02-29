import React from 'react'
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import './../App.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function Home() {
  const [box, setBox] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleCloseDelete(id) {
    console.log(id);

    fetch(`https://auth-rg69.onrender.com/api/products/private/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })

    setOpen(false);
  }

  useEffect(() => {
    fetch('https://auth-rg69.onrender.com/api/products/private/all', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setBox(data)
        })
      .catch((err) => {
        console.log(err)
        })
  }, [])

  return (
    <Container>
      <TableContainer component={Paper} className='card'>
        <Table className='card2' sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className='head'>
              <TableCell className='head-title' align="right"> <span>Name</span> </TableCell>
              <TableCell className='head-title' align="right"> <span>Price</span> </TableCell>
              <TableCell className='head-title' align="right"> <span>status</span> </TableCell>
              <TableCell className='head-title' align="right"> <span>Description</span> </TableCell>
              <TableCell className='head-title' align="right"> <span>Action</span> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {box.map((product) => (
              <TableRow
                className='table'
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell  className='th-table' component="th" scope="row">
                  <span>{product.name}</span>
                </TableCell>
                <TableCell className='th-table' align="right"> <span>{product.price}</span> </TableCell>
                <TableCell className='th-table' align="right"> <span>{product.status}</span> </TableCell>
                <TableCell className='th-table' align="right"> <span>{product.description}</span> </TableCell>
                <TableCell className='th-table' align="right">
                  <DeleteSweepIcon className='mui-icon' onClick={handleClick}></DeleteSweepIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        className='dialog'
      >
        <DialogTitle className='title' style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent className='information'>
          <DialogContentText className='para'>
            <p>Are you sure you want to delete it?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='footer'>
          <Button className='btn' autoFocus onClick={handleClose}>
            <span>Cancel</span>
          </Button>
          <Button className='btn' onClick={() => {handleCloseDelete(box.id)}}> <span>Delete</span> </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Home