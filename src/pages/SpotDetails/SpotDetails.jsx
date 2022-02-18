import React, {useEffect, useState} from 'react';
//import axios from 'axios';
//import {useHistory} from 'react-router-dom';

//import SpotCard from '../../components/Card/Card';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(spotName, availability, noiseLevel, ambience, temperature) {
  return { spotName, availability, noiseLevel, ambience, temperature };
}

// hardcodes sample data
const rows = [
  createData('Makerspace', 'many seats', 'very loud', 'busy', 'comfortable'),
  createData('Commuter Lounge', 'some seats', 'quiet', 'calm', 'cool'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Availability</TableCell>
            <TableCell align="right">Noise Level</TableCell>
            <TableCell align="right">Ambience</TableCell>
            <TableCell align="right">Temperature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.spotName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.spotName}
              </TableCell>
              <TableCell align="right">{row.availability}</TableCell>
              <TableCell align="right">{row.noiseLevel}</TableCell>
              <TableCell align="right">{row.ambience}</TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}