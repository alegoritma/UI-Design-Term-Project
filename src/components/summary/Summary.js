import React, { Component } from 'react';
import {connect} from 'react-redux';
import './Summary.css';
import {Paper, Typography, Grid, Fab} from '@material-ui/core';
import Graph from './graph/Graph';
import Table from './table/Table';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import withWidth from '@material-ui/core/withWidth';

function calcEach(users, {payments, bills, fixedExpenses}){
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
          // console.log(name, weight)
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
  // console.log({spent, debt});
  return {spent, debt};
}
const heightByWidth = {
  "xs": "auto",
  "sm": "auto",
  "md": "8.5rem",
  "lg": "11rem",
  "xl": "11rem"
}
class Summary extends Component {
  render() {
    const {width, activities, house: {users, currentUser}} = this.props;

    const {spent, debt} = calcEach(users, activities);
    return <Paper className="summary-paper">
      <Typography variant="h6">Summary</Typography>
      <Grid container style={{height: '95%'}}>

        <Grid item md={7} sm={12} style={{height: '95%'}}>
          <Paper className="graph-paper">
            <Typography variant="subtitle1">Graph</Typography>
            <Graph
              spent={spent}
              debt={debt}
              users={users}
              currUser={currentUser}
            />
          </Paper>
        </Grid>
        <Grid item md={5} sm={12} style={{display: "grid", height: "95%"}}>
          <Paper className="table-paper">
            <Typography variant="subtitle1">Table</Typography>
            <div className="paper-table-container" style={{maxHeight: heightByWidth[width]}}>
              <Table
                spent={spent}
                debt={debt}
                users={users}
                currUser={currentUser}
              />
            </div>
          </Paper>
          <div className="settle-up-button-container">
            <Fab variant="extended" size="small" aria-label="end period" className="settle-up-button" >
              <MoneyOffIcon fontSize="small" style={{marginRight: 5}} />
              Settle Up
            </Fab>
          </div>
        </Grid>
      </Grid>
    </Paper>;
  }
}
const mapStateToProps = state => ({
  house: state.house,
  activities: state.activities
})
export default connect(mapStateToProps)(withWidth()(Summary));
