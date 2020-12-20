import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  const [skripsi, setSkripsi] = useState([]);
  const classes = useStyles();

  const GetAllData = async () => {
    const req = {
      method: "GET",
      url: "http://3.19.221.222:5000/skripsi/list?rp=9999",
    };
    await axios(req)
      .then(function(response) {
        setSkripsi(response.data.result.data)
        console.log(response.data.result.data)
      })
      .catch(function(error) {
        // console.log("ASEM", error);
      });
  };

  useEffect(async () => {
    GetAllData()
  }, []);

  return (
    <div className="App">
      <center>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell align="right">Sistole</TableCell>
                <TableCell align="right">Disatole&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skripsi.map((row) => (
                <TableRow key={row.nama}>
                  <TableCell component="th" scope="row">
                    {row.nama}
                  </TableCell>
                  <TableCell align="right">{row.sistole}</TableCell>
                  <TableCell align="right">{row.diastole}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>
      </center>
    </div>
  );
}

export default App;
