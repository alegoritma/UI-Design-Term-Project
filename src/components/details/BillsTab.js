import React, { Component } from 'react';
import {Grid, Paper, List} from '@material-ui/core';
import Bill from './entries/Bill';

class BillsTab extends Component {
  render() {
    const { bills } = this.props;
    return <Grid item sm className='bills-grid'>
      <Paper className='bills-paper'>
        <List className='bills-list'>
          {bills.map((bill,i) =>
            <Bill key={`bill-list-item-${i}`} details={bill}  />
          )}
        </List>
      </Paper>
    </Grid>;
  }
}
export default BillsTab;
