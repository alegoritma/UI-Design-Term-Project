import React from 'react';
import './Flow.css';
import {Paper, Typography, Grid, Fab} from '@material-ui/core';
import Activity from './components/Activity';
import {houseData} from '../../store';
import {green, grey} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import withWidth from '@material-ui/core/withWidth';

const AddButton = withStyles(theme => ({
  size: 'medium',
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    '&:hover': {
      backgroundColor: green[500],
    },
    position: 'absolute',
    top: 'calc(6rem - 28px)',
    marginLeft: '20px',
    zIndex: '2'
  },
}))(Fab);

class Flow extends React.Component {
  constructor(props) {
    super(props)
    const {payments, bills, fixedExpenses} = houseData;
    this.activities = [
      ...payments.map(activity=> ({type:"payments", ...activity})),
      ...bills.map(activity=>({type:"bills", ...activity})),
      ...fixedExpenses.map(activity=>({type:"fixedExpenses", ...activity}))
    ]
    this.activities.sort((act1, act2) => act1.date > act2.date)
    this.state = {
      activities: this.activities.slice(0, 10)
    }
  }

  render() {
    const isSmall = (this.props.width=='xs' || this.props.width=='sm')
    const {activities} = this.state;
    return <Grid container style={{height: '100%'}}>
      <Grid item sm={10} md={10} style={{height: '100%'}}>
        <Paper className="flow-paper"
          style={{
            maxHeight: isSmall?'70vh':'calc(21rem - 25px)',
            minHeight: isSmall?'70vh':'calc(21rem - 25px)'
          }}>
          <Typography variant="h6">Flow</Typography>

          <Paper className="activity-flow-container">
            {activities.map((activity, i) => <Activity activity={activity} key={`activity-${i}`}/>)}
          </Paper>
        </Paper>
      </Grid>
      <Grid item sm={2} md={2}>
        <AddButton aria-label="add" >
          <AddIcon />
        </AddButton>
      </Grid>
    </Grid>
  }
}
export default withWidth()(Flow)
