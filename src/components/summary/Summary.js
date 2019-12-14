import React, { Component } from 'react';
import './Summary.css';
import {Paper, Typography, Grid, Fab} from '@material-ui/core';
import {houseData} from '../../store';
import Graph from './graph/Graph';
import Table from './table/Table';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

function calcEach({users, payments, bills, fixedExpenses}){
  let spent = {}
  let debt = {}
  users.forEach(user => {
    spent[user] = { total: 0, for: {} };
    debt[user]  = { total: 0, for: {} };
  })
  payments.forEach(({paidBy, cost, weights}) => {
      spent[paidBy].total += cost;
      weights.forEach(({name, weight}) => {
        if (isNaN(weight*cost)){
          console.log(name, weight)
        }
        if ( !(name in spent[paidBy].for) ){spent[paidBy].for[name] = 0;}
        if ( !(paidBy in debt[name].for) ){debt[name].for[paidBy] = 0;}
        debt[name].total += cost*weight;
        spent[paidBy].for[name] += cost*weight;
        debt[name].for[paidBy] += cost*weight;
      })
  })
  fixedExpenses.concat(bills).forEach( ({to, cost, weights}) => {
    weights.forEach(({name, weight}) => {
      debt[name].total += cost*weight
      debt[name].for[to] = cost*weight
    })
  })
  console.log({spent, debt});
  return {spent, debt};
}
calcEach(houseData)
class Summary extends Component {

  render() {
    const {spent, debt} = calcEach(houseData);
    return <Paper className="summary-paper">
      <Typography variant="h6">Summary</Typography>
      <Grid container>

        <Grid item md={6} sm={12}>
          <Paper className="graph-paper">
            <Typography variant="subtitle1">Graph</Typography>
            <Graph
              spent={spent}
              debt={debt}
              users={houseData.users}
              currUser={"Jack"}
            />
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper className="table-paper">
            <Typography variant="subtitle1">Table</Typography>
            <div className="paper-table-container">
              <Table
                spent={spent}
                debt={debt}
                users={houseData.users}
                currUser={"Jack"}
              />
            </div>
          </Paper>
          <Fab variant="extended" size="small" aria-label="end period" className="settle-up-button" >
            <MoneyOffIcon fontSize="small" style={{marginRight: 5}} />
            Settle Up
          </Fab>
        </Grid>
      </Grid>
    </Paper>;
  }
}
export default Summary;
