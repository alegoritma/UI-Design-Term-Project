import React from 'react';
import {Paper, Typography, Grid, Fab} from '@material-ui/core';

export default ({activity, currentUser}) => {
  function wrapCost(cost){
    return <strong style={{color: "#3f51b5"}}>{cost}$</strong>;
    }
    const variant = "subtitle2";

    if(activity.type == "payments"){
      const {paidBy, date, name, cost, weights} = activity;
      return <Paper>
        <Typography variant={variant}>
          <strong>{(paidBy==currentUser?'You':paidBy)}</strong>{" spent "}{wrapCost(cost)}{` for ${name}`}
        </Typography>
      </Paper>
  } else if(activity.type == "bills"){
      const {addedBy, cost, to, date, weights} = activity;
      return <Paper>
        <Typography variant={variant}>
          <strong>{(addedBy==currentUser?'You':addedBy)}</strong>{` added bill of "${to}"`}
        </Typography>
      </Paper>
  } else if(activity.type == "fixedExpenses"){
      const {addedBy, to, date, cost, weights} = activity;
      return <Paper>
        <Typography variant={variant}>
          <strong>{(addedBy==currentUser?'You':addedBy)}</strong>{` defined a fixed expense: ${to}`}
        </Typography>
      </Paper>
  } else {
      return <Paper>
        <Typography variant={variant}>
          Error with type: {activity.type}
        </Typography>
      </Paper>
  }
}
