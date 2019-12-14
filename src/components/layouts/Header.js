import React from 'react';
import { AppBar, Toolbar, Typography} from '@material-ui/core';


export default (props) => {
  return <AppBar position="static">
    <Toolbar>
      <Typography variant="h4" color="inherit">
        House Mates
      </Typography>
    </Toolbar>
  </AppBar>
}
