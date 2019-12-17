import React, { Component } from 'react';
import {Grid, Paper, List} from '@material-ui/core';
import FixedExpense from './entries/FixedExpense';

class FixedExpensesTab extends Component {
  render() {
    const { fixedExpenses } = this.props;
    return <Grid item sm className='bills-grid'>
      <Paper className='bills-paper'>
        <List className='bills-list'>
          {fixedExpenses.map((fixedExpense ,i) =>
            <FixedExpense key={`fixedExpense-list-item-${i}`} details={fixedExpense}  />
          )}
        </List>
      </Paper>
    </Grid>;
  }
}
export default FixedExpensesTab;
