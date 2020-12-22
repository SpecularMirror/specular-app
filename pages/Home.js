import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import NavBar from '../components/NavBar';
import auth from '@react-native-firebase/auth';

export default class Home extends Component {

    render(){
        return (
            <>
            <NavBar />
            <Button
            onPress={() => auth().signOut().then(() => console.log('User signed out!'))}
            title="Logout"
            color="#841584"
            accessibilityLabel="Login"
          />
          </>
        )
    }
}

const styles = StyleSheet.create({
});
