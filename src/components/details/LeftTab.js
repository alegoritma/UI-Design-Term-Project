import React from 'react';
import {Grid, Paper, Typography, List, ListItem, ListItemText} from '@material-ui/core';

export default ({selectUser, currentUser, users, styles}) => {

  return <Grid item sm={3} className="payments-left-grid">
    <Paper className="payments-left-paper" >
      <Typography variant="h5">
        Users
      </Typography>
      <List className="payments-left-paper-list">
        {users.map((user) =>
          <ListItem
            onClick={()=>{selectUser(user)}}
            key={`select-user-${user}`}
          button>
            <ListItemText>{user}</ListItemText>
          </ListItem>)}
      </List>
    </Paper>
  </Grid>;
}
