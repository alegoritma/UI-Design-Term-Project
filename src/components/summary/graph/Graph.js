import React from 'react';
import {VictoryChart, VictoryGroup, VictoryBar, VictoryLegend} from 'victory';

function constructData({spent, debt, currUser}){
  let totalDebt = []
  let totalSpent = []
  Object.keys(debt).forEach(user => {
    totalDebt.push({x: (user==currUser)?"You":user, y: (user in debt)?debt[user].total:0 })
  })
  Object.keys(spent).forEach(user => {
    totalSpent.push({x: (user==currUser)?"You":user, y: (user in spent)?spent[user].total:0 })
  })
  return {totalDebt, totalSpent}
}

export default (props) => {
  const {totalDebt, totalSpent} = constructData(props);
  return (
    <VictoryChart
      domainPadding={{x: [40, 40], y:[0,40]}}
      padding={{left: 50, right: 30, top: 10, bottom: 40}}

      style={{labels: {fontSize: 24}, maxHeight: '30px', width:'auto'}}
      //theme={VictoryTheme.material}
    >
      <VictoryLegend x={100} y={0}
        orientation="horizontal"
        gutter={20}
        style={{ labels: {fontSize: 23 } }}
        data={[
          { name: "Spent", symbol: { fill: "#F4B400" } },
          { name: "Debt", symbol: { fill: "#3f51b5" } }
        ]}
      />
      <VictoryGroup offset={25}
      >
        <VictoryBar //debt
          style={{
            data: { fill: "#3f51b5" }
          }}
          data={totalDebt}
        />
        <VictoryBar //spent
          style={{
            data: { fill: "#F4B400" }
          }}
          data={totalSpent}
        />
      </VictoryGroup>
    </VictoryChart>
  );
}
