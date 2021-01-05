import React, { Component } from 'react';
import {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Button,
  TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux';

const NavBar: () => React$Node = () => {

    const [image, setImage] = useState();

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    if (initializing) return null;

    firestore().collection('users').doc(user.uid)
          .get()
          .then((doc)=>{ 
                  setImage(doc.data().image)
          })
          .catch(e => console.log(e));


    return (
        <View style={styles.navBar}>
            <Text style={styles.navTitle}>Home</Text>
            <TouchableOpacity onPress={() => Actions.Profile()}>
            <Image source={{uri: image}} 
            style={styles.profilePic}/>
                 </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginTop: 3
    },
    navTitle: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: 30
    },
    navBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10
    }
});

export default NavBar;