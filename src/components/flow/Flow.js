import React from 'react';
import { connect } from 'react-redux'
import './Flow.css';
import {Paper, Typography, Grid, Fab} from '@material-ui/core';
import Activity from './components/Activity';
import {updateActive} from '../../features/newActivity/actions';
import {green, grey} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import withWidth from '@material-ui/core/withWidth';

const AddButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    '&:hover': {
      backgroundColor: green[500],
    },
    position: 'absolute',
    top: 'calc(6rem - 24px)',
    marginLeft: '15px',
    zIndex: '2'
  },
}))(Fab);

const WidthByHeight = {
  "xm": "80vh",
  "sm": "70vh",
  "md": "calc(21rem - 25px)",
  "lg": "calc(24rem - 15px)",
  "xl": "calc(24rem - 15px)"
}

class Flow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nOfShownActs: 10
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() { //this will be tuned ***********************************
    document.getElementById("activity-flow-container")
      .addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.getElementById("activity-flow-container")
      .removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(e) {
    // console.log(e.target.scrollTop, e.target);
  }
  render() {
    const {width, activities, currentUser} = this.props;
    const {nOfShownActs} = this.state;
    return <Grid container style={{height: '100%'}}>
      <Grid item sm={10} md={10} style={{height: '100%'}}>
        <Paper className="flow-paper"
          style={{
            maxHeight: WidthByHeight[width],
            minHeight: WidthByHeight[width]
          }}>
          <Typography variant="h6">Flow {/*this.props.width*/}</Typography>

          <Paper className="activity-flow-container" id="activity-flow-container">
            {activities.slice(0, nOfShownActs).map((activity, i) => {
              return <Activity activity={activity} currentUser={currentUser} key={`activity-${i}`}/>
            })}
          </Paper>
        </Paper>
      </Grid>
      <Grid item sm={2} md={2}>
        <AddButton size="medium" onClick={this.props.openModal} aria-label="add" >
          <AddIcon />
        </AddButton>
      </Grid>
    </Grid>
  }
}
function mergeAndSortActivities({payments, bills, fixedExpenses}){
  let activities = [
    ...payments.map(activity=> ({type:"payments", ...activity})),
    ...bills.map(activity=>({type:"bills", ...activity})),
    ...fixedExpenses.map(activity=>({type:"fixedExpenses", ...activity}))
  ]
  activities.sort((act1, act2) => act1.date > act2.date)
  return activities
}
const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(updateActive(true))
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.house.currentUser,
    activities: mergeAndSortActivities(state.activities)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Flow))
