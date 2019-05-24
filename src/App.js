import React, { Component } from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import './App.css';
import MainComponent from './components/main/main';
import AppBarComponent from './components/main/toolbar';
import OrdersComponent from './components/main/orders';
import Side from './components/main/side';


class App extends Component {
  state = {
    drawerStatus: false
  };

  toggleDrawer = (status) => () => {
    this.setState({
      drawerStatus: status
    });
  };

  render() {
    return (
      <div className="App">
        <HashRouter>
          <AppBarComponent drawerStatusFunction={this.toggleDrawer(true)} />
          <Drawer open={this.state.drawerStatus} onClose={this.toggleDrawer(false)}>
            <div className="drawerContainer">
              <Side drawerStatusFunction={this.toggleDrawer(false)} />
            </div>
          </Drawer>
          <Switch>
            <Route exact path="/pos" name="pos" component={MainComponent} />
            <Route exact path="/orders" name="orders" component={OrdersComponent} />
            <Redirect from="/" to="/pos" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
