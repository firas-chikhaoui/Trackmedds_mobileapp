/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import { NativeRouter, Switch, Route } from "react-router-native";
import Commande from './components/Commande';
import Detailscommande from './components/Detailscommande';
import Login from './components/Auth/Login';

export default class App extends Component {

  render() {
    return (
       <NativeRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Commande/:iduser" component={Commande} />
            <Route exact path="/Detailscommande/:id/:iduser" component={Detailscommande} />
          </Switch>
      </NativeRouter>
    );
  }
}
