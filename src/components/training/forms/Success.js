import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { AppBar} from 'material-ui'

class Success extends Component {
  render() {
    return <MuiThemeProvider>
      <React.Fragment>
        <AppBar title="Success" />
        <h1>Thank You Form Your Submission</h1>
        <p>You will get an email with further instructions.</p>
      </React.Fragment>
    </MuiThemeProvider>;
  }
}



export default Success;
