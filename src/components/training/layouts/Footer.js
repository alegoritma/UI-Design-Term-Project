import React, {useState} from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core';

export default ({muscles, onSelect, category}) => {
  const index = (muscles.includes(category))? muscles.indexOf(category)+1:0;
  console.log(muscles);
  console.log(index);
  return <Paper>
    <Tabs value={index}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab
        label="All"
        onClick={()=>onSelect('')}
      ></Tab>
      {muscles.map((muscle, i) =>
        <Tab key={`muscle-${i}`}
          label={muscle}
          onClick={()=>onSelect(muscle)}
        ></Tab>
      )}
    </Tabs>
  </Paper>
}
