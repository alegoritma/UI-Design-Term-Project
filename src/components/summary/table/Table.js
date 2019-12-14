import React from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

export default ({spent, debt, currUser, users}) => {
  let rows = users.map(user => {
    return {
      name: (user === currUser)?"You":user,
      totalSpent: (user in spent)?spent[user].total:0,
      totalDebt: (user in debt)?debt[user].total:0
    }
  })
  return (
    <Table size="small" aria-label="Period" style={{overflowY: 'auto'}}>
      <TableHead>
        <TableRow>
          <TableCell>Mate</TableCell>
          <TableCell align="right">Spent</TableCell>
          <TableCell align="right">Debt</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(({name, totalSpent, totalDebt}) => (
          <TableRow key={name}>
            <TableCell component="th" scope="row">
              {name}
            </TableCell>
            <TableCell align="right">{roundToTwo(totalSpent)} $</TableCell>
            <TableCell align="right">{roundToTwo(totalDebt)} $</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
