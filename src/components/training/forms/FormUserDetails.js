import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { AppBar, TextField, RaisedButton } from 'material-ui'

class FormUserDetails extends Component {
  constructor(props) {
    super(props);
    this.continue = this.continue.bind(this);
  }
  continue(e){
    e.preventDefault();
    this.props.nextStep();
  }
  render() {
    const { values, handleChange } = this.props;
    return <MuiThemeProvider>
      <React.Fragment>
        <AppBar title="Enter User Details" />
        <TextField hintText="Enter Your First Name"
          floatingLabelText="First Name"
          id="firstName"
          onChange={handleChange}
          defaultValue={values.firstName}
        />
        <br />
        <TextField hintText="Enter Your Last Name"
          floatingLabelText="Last Name"
          id="lastName"
          onChange={handleChange}
          defaultValue={values.lastName}
        />
        <br />
        <TextField hintText="Enter Your Email"
          floatingLabelText="Email"
          id="email"
          onChange={handleChange}
          defaultValue={values.email}
        />
        <br />
        <RaisedButton
          onClick={this.continue}
          label="Continue"
          primary={true}
          style={styles.button}
        />
      </React.Fragment>
    </MuiThemeProvider>;
  }
}

const styles = {
  button: {
    margin: 15
  }
}

export default FormUserDetails;
