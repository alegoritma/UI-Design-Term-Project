import React, {Fragment} from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { Settings, ExitToApp, ChevronLeft, ChevronRight } from '@material-ui/icons/';
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
    <AppBar position="relative"  style={{zIndex: 1}}>
      <Toolbar>
        {/* <img
          style={{
            maxHeight: 50, width: 'auto', margin: 'auto 1.1rem', marginLeft: '0px',
            filter: 'invert(1)'//'invert(33%) sepia(100%) saturate(5460%) hue-rotate(135deg) brightness(103%) contrast(85%)'
          }}
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/atm-ui-letter-h-uppercase-alphabet-47796.png"
        /> */}
        <Typography variant="h5" color="inherit">
          House Mates
        </Typography>
        <IconButton
          style={{marginLeft: '1rem', marginRight: '0px'}}
          edge="end"
          aria-label="previous period"
          color="inherit"
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          style={{marginLeft: '0px', marginRight: '0px'}}
          edge="end"
          aria-label="next period"
          color="inherit"
        >
          <ChevronRight />
        </IconButton>
        <Button variant="contained" style={{margin: 'auto 1rem auto 0rem'}}>
          Today
        </Button>
        <Typography variant="h6" color="inherit">
          December 2019
        </Typography>
        <div style={{marginLeft: 'auto', display: 'flex'}}>

          <IconButton
            style={{marginRight: '0px'}}
            edge="end"
            aria-label="settings"
            color="inherit"
          >
            <Settings/>
          </IconButton>
          <IconButton
            style={{marginLeft: '0px'}}
            edge="end"
            aria-label="log out"
            color="inherit"
          >
            <ExitToApp/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  </Fragment>
}
