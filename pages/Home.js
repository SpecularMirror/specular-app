import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import NavBar from '../components/NavBar';
import Mirror from '../components/Mirror';
import auth from '@react-native-firebase/auth';

export default class Home extends Component {

    render(){
        return (
            <>
            <NavBar />
            <Mirror />
          </>
        )
    }
}

const styles = StyleSheet.create({
});
