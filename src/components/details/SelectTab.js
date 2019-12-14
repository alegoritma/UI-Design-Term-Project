import React from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core';
// import PaymentsTab from './PaymentsTab';

export default ({selectedTab, setSelectedTab}) => {
  return <Paper className="details-select-tab">
    <Tabs value={selectedTab}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="Payments" onClick={()=>setSelectedTab(0)}/>
      <Tab label="bills" onClick={()=>setSelectedTab(1)}/>
      <Tab label="Fixed Expenses" onClick={()=>setSelectedTab(2)}/>
    </Tabs>
  </Paper>
}
