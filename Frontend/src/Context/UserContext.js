import React, { Component } from "react";
import * as localForage from 'localforage'

const UserContext = React.createContext();

class UserContextComponent extends Component {
  state = {};

  componentDidMount = async () => {
    const user = await localForage.getItem('user');
    this.setState({ ...user });
  }

  updateUser = (updates) => {
    const updatedUser = { ...this.state, ...updates };
    this.setState(updatedUser);
    localForage.setItem('user', { ...updatedUser });
  }

  render() {
    return (
      <UserContext.Provider value={{ ...this.state, updateUser: this.updateUser }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContext, UserContextComponent };
