import React, { Component } from 'react';
import {Grid, Paper} from '@material-ui/core';
import './Details.css';
import SelectTab from './SelectTab';
import PaymentsTab from './PaymentsTab';
import BillsTab from './BillsTab';
import {houseData} from '../../store';

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
    const {users, payments, bills} = houseData;
    switch (this.state.currentTab){
      case 0:
        return <PaymentsTab users={users} payments={payments} />
      case 1:
        return <BillsTab bills={bills} />
      // case 2:
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
export default DetailsPane;
