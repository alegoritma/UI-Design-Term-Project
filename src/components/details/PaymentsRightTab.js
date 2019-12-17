import React, { Component } from 'react';
import {Grid, Paper, List} from '@material-ui/core';
import Payment from './entries/Payment';

class PaymentsRightTab extends Component {
  render() {
    const { payments, selectedUser } = this.props;
    let paymentsOfSelected = []
    payments.forEach(payment => {
      if (payment.paidBy === selectedUser){
        paymentsOfSelected.push(payment)
      }
    })
    return <Grid item sm={9} className='payments-right-grid'>
      <Paper className='payments-right-paper'>
        <List className='payments-right-paper-list'>
          {paymentsOfSelected.map((payment, i) =>
            <Payment key={`payments-list-item-${i}`} details={payment}  />
          )}
        </List>
      </Paper>
    </Grid>;
  }
}
export default PaymentsRightTab;
