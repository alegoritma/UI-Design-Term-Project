import React, {Fragment} from 'react';
import { AppBar, Toolbar, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';

const AppBarBack = withStyles(theme => ({
  root: {
    backgroundColor: indigo[100],
    zIndex: '0',
    height: '10rem',
    boxShadow: 'none'
  }
}))(AppBar)


export default (props) => {
  return <Fragment>
    <AppBarBack position="absolute" />
    <AppBar position="relative" style={{zIndex: 1}}>
      <Toolbar>
        <Typography variant="h4" color="inherit">
          House Mates
        </Typography>
      </Toolbar>
    </AppBar>
  </Fragment>
}
