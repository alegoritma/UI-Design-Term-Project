import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid, Paper} from '@material-ui/core';
import './Details.css';
import SelectTab from './SelectTab';
import PaymentsTab from './PaymentsTab';
import BillsTab from './BillsTab';
import FixedExpensesTab from './FixedExpensesTab';
// import {houseData} from '../../store';

// const tabs = ['payments', 'bills', 'fixed expenses']
class DetailsPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      selectedUser: false
    }
    this.setSelectedTab = this.setSelectedTab.bind(this);
    this.renderSelectedTab = this.renderSelectedTab.bind(this);

  }

  setSelectedTab(selectedTab){
    if (selectedTab !== this.state.currentTab){
      this.setState({currentTab: selectedTab})
    }
  }
  renderSelectedTab(){
    console.log(this.props);
    const {payments, bills, fixedExpenses} = this.props.activities;
    const {users, currentUser} = this.props.house;
    switch (this.state.currentTab){
      case 0:
        return <PaymentsTab users={users} currentUser={currentUser} payments={payments} />
      case 1:
        return <BillsTab bills={bills} />
      case 2:
        return <FixedExpensesTab fixedExpenses={fixedExpenses} />
    }
  }
  render() {
    const {currentTab} = this.state;
    return <Paper className="details-container">
      <SelectTab setSelectedTab={this.setSelectedTab} selectedTab={currentTab}/>
      <Grid container className="details-content">
        {this.renderSelectedTab()}
      </Grid>
    </Paper>;
  }
}
const mapStateToProps = (state) => {
  return {
    activities: state.activities,
    house: state.house
  }
}

export default connect(mapStateToProps)(DetailsPane);
