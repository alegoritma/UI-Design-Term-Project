import React from 'react';
import {Paper, Typography, Grid, Fab} from '@material-ui/core';

export default ({activity}) => {
  console.log(activity);
  const variant = "subtitle1";
  if(activity.type == "payments"){
    const {paidBy, date, name, cost, weights} = activity;
    return <Paper>
      <Typography variant={variant}>
        {`${paidBy} spent ${cost}$ for ${name}`}
      </Typography>
    </Paper>
  } else if(activity.type == "bills"){
    const {addedBy, cost, to, date, weights} = activity;
    return <Paper>
      <Typography variant={variant}>
        {`${addedBy} added bill of "${to}"`}
      </Typography>
    </Paper>
  } else if(activity.type == "fixedExpenses"){
    const {addedBy, to, date, cost, weights} = activity;
    return <Paper>
      <Typography variant={variant}>
        {`${addedBy} defined a fixed expense: ${to}`}
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
