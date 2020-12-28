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

const Mirror: () => React$Node = () => {

    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [status, setStatus] = useState();

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

    firestore().collection('users').doc(user.uid).get().then((doc)=>{ 
        setName(doc.data().name);
        firestore().collection('mirrors').doc(doc.data().mirrorID).get().then((document)=>{ 
            setStatus(document.data().status)
            setImage(document.data().image)
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));


    return (
        <View style={styles.mirrorContainer}>
            <Text style={styles.mirrorTitle}>{name}'s Specular</Text>
            <Text>{status}</Text>
            <Image source={{uri: image}} 
            style={styles.mirrorPic}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mirrorContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10
    },
    mirrorTitle: {
        fontWeight: "600",
        fontSize: 25
    },
    mirrorPic: {
        width: "70%",
        height: 275
    }
});

export default Mirror;