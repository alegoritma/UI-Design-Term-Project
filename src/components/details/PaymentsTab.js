import React, { Component, Fragment } from 'react';
import LeftTab from './LeftTab';
import PaymentsRightTab from './PaymentsRightTab';

class PaymentsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: props.users[0]
    }
    this.handleSelectUser = this.handleSelectUser.bind(this);
  }
  handleSelectUser(user){
    if (user !== this.state.selectedUser){
      this.setState({selectedUser: user})
    }
  }
  render() {
    const {users, currentUser, payments} = this.props;
    const {selectedUser} = this.state;
    return <Fragment>
      <LeftTab
        style={{overflowY: 'auto', maxHeight: 500}}
        selectedUser={selectedUser}
        currentUser={currentUser}
        users={users}
        selectUser={this.handleSelectUser}
      />
      <PaymentsRightTab
        style={{overflowY: 'auto', maxHeight: 500}}
        payments={payments}
        selectedUser={selectedUser}
      />
    </Fragment>;
  }
}
export default PaymentsTab;
