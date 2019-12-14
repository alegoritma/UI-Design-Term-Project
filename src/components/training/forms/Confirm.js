import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { AppBar, RaisedButton } from 'material-ui'
import { List, ListItem } from 'material-ui/List';

class Confirm extends Component {
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
    const { values: { firstName, lastName, email, occupation, city, bio } } = this.props;
    return <MuiThemeProvider>
      <React.Fragment>
        <AppBar title="Confirm User Data" />
        <List>
          <ListItem
            primaryText="First Name"
            secondaryText={firstName}
          />
          <ListItem
            primaryText="Last Name"
            secondaryText={lastName}
          />
          <ListItem
            primaryText="Email"
            secondaryText={email}
          />
          <ListItem
            primaryText="Occupation"
            secondaryText={occupation}
          />
          <ListItem
            primaryText="City"
            secondaryText={city}
          />
          <ListItem
            primaryText="Bio"
            secondaryText={bio}
          />
        </List>
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

export default Confirm;
