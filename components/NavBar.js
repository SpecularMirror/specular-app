import React, { Component } from 'react';

import {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const NavBar: () => React$Node = () => {

    const [name, setName] = useState();
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
                  setName(doc.data().name)
                  setImage(doc.data().image)
          })
          .catch(e => console.log(e));


    return (
        <View style={styles.navBar}>
            <StatusBar backgroundColor={'white'} barStyle="light-content"/>
            <Text style={styles.navTitle}>Home</Text>
            <Image source={{uri: image}} 
            style={styles.profilePic}/>
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