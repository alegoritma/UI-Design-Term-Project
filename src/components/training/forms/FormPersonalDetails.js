import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { AppBar, TextField, RaisedButton } from 'material-ui'

class FormPersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.continue = this.continue.bind(this);
    this.back = this.back.bind(this);
  }
  continue(e){
    e.preventDefault();
    this.props.nextStep();
  }
  back(e){
    e.preventDefault();
    this.props.prevStep()
  }

  render() {
    const { values, handleChange } = this.props;
    return <MuiThemeProvider>
      <React.Fragment>
        <AppBar title="Enter Personal Details" />
        <TextField hintText="Enter Your Occupation"
          floatingLabelText="Occupation"
          id="occupation"
          onChange={handleChange}
          defaultValue={values.occupation}
        />
        <br />
        <TextField hintText="Enter Your City"
          floatingLabelText="City"
          id="city"
          onChange={handleChange}
          defaultValue={values.city}
        />
        <br />
        <TextField hintText="Enter Your Bio"
          floatingLabelText="Bio"
          id="bio"
          onChange={handleChange}
          defaultValue={values.bio}
        />
        <br />
        <RaisedButton
          onClick={this.back}
          label="Back"
          primary={false}
          style={styles.button}
        />
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

export default FormPersonalDetails;
