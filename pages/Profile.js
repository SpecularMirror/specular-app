import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import ProfileInfo from '../components/ProfileInfo';
import auth from '@react-native-firebase/auth';

export default class Profile extends Component {

    render(){
        return (
            <>
            <ProfileInfo />
            <Button
            title="My Specular Account"
            color="#841584"
            accessibilityLabel="AccountInfo"
          />
          <Button
            title="Sync and Devices"
            color="#841584"
            accessibilityLabel="Device"
          />
          </>
        )
    }
}

const styles = StyleSheet.create({
});
