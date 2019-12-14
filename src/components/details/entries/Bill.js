import React, { Component } from 'react';
import {Grid, ListItem, Paper, ListItemText, Collapse, Button, Typography} from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';

export default ({details}) => {
  const [toggle, setToggle] = useState(false)

  return <ListItem className="entry-detail-list-item">
    <Paper className="entry-detail-paper entry-paper-bill">
      <Grid container className="entry-detail-container">
        <Grid item sm className="d-contents">
          <Fab variant="extended" color="primary" size="small" aria-label="like" className="detail-cost-badge">
            {details.cost}
            <AttachMoneyIcon />
          </Fab>
        </Grid>
        <Grid item sm className="d-contents">
          <ListItemText primary={details.name} secondary={details.date}/>
        </Grid>
        <Grid sm item className="d-contents">
          <Button size="small" variant="contained"  onClick={()=>setToggle(!toggle)} className="detail-toggle-graph-button">
            <BarChartIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container className="w-100">
        <Collapse in={toggle} timeout='auto' unmountOnExit className="w-100">
          <Paper className="entry-bar-chart-paper">
            Chart will be here
          </Paper>
        </Collapse>
      </Grid>
    </Paper>
  </ListItem>;
}
