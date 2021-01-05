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
            <Button style={styles.button}
            title="My Specular Account"
            color="grey"
            accessibilityLabel="AccountInfo"
          />
          
          <Button style={styles.button} 
            title="Sync and Devices"
            color="grey"
            accessibilityLabel="Device"
          />

          <Button
            onPress={() => auth().signOut().then(() => console.log('User signed out!'))}
            title="Logout"
            color="grey"
            accessibilityLabel="Login"
          />
          </>
        )
    }
}

const styles = StyleSheet.create({
  button: {
    fontWeight: "600",
    color: 'black',
    fontSize: 20,
    marginTop: 1,
}
});
