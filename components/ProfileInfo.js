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

const ProfileInfo: () => React$Node = () => {

    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [image, setImage] = useState();
    const [email, setEmail] = useState();

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
        setSurname(doc.data().surname);
        setEmail(doc.data().email);
        setImage(doc.data().image);
    })
    .catch(e => console.log(e));


    return (
        <View style={styles.mirrorContainer}>
              <Image source={{uri: image}} 
            style={styles.mirrorPic}/>
            <Text style={styles.mirrorTitle}>{name} {surname}</Text>
            <Text style={styles.mirrorTitle}>{email}</Text>
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
        fontSize: 25,
        marginTop: 30,
    },
    mirrorPic: {
        width: "70%",
        height: 275,
        marginTop: 30,
    },
    mirrorStatus: {
        marginTop: 5
    },
    mirrorStatusCont: {
        display: 'flex',
        flexDirection: 'row',
    },
    statusCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 12,
        marginRight: 5
    }
});

export default ProfileInfo;