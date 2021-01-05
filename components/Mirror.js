import React, { Component } from 'react';

import {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Mirror: () => React$Node = () => {

    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [status, setStatus] = useState();
    const [mirrorID, setMirror] = useState();

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
        setMirror(doc.data().mirrorID);
        firestore().collection('mirrors').doc(doc.data().mirrorID).get().then((document)=>{ 
            setImage(document.data().image)
        })
        firestore().collection('mirrors').doc(doc.data().mirrorID).onSnapshot(function(snap) {
            setStatus(snap.data().status)
        })
    })


    return (
        <View style={styles.mirrorContainer}>
            <Text style={styles.mirrorTitle}>{name}'s Specular</Text>
            <View style={styles.mirrorStatusCont}>
                <View style={styles.statusCircle} />
                { status === 'running' ? (
                    <View style={styles.statusCircle} backgroundColor={'#008000'} />
                    ) : status === 'refresh' ? (
                        <View style={styles.statusCircle} backgroundColor={'#FFFF00'} />
                    ) : status === 'sleep mode' ? (
                        <View style={styles.statusCircle} backgroundColor={'#FFFF00'} />
                    ) : status === 'turned off' && (
                        <View style={styles.statusCircle} backgroundColor={'#FF0000'} />
                    )}
                <Text style={styles.mirrorStatus}>{status}</Text>
            </View>
            <Image source={{uri: image}} 
            style={styles.mirrorPic}/>
            <View>
                <TouchableOpacity  style={styles.turOff}
                onPress={() => status === 'running' ? (
                    firestore().collection('mirrors').doc(mirrorID).set({ status: 'turned off'}, { merge: true })
                    ) : status === 'sleep mode' ? (
                        firestore().collection('mirrors').doc(mirrorID).set({ status: 'running'}, { merge: true })
                    ) : status === 'turned off' && (
                        firestore().collection('mirrors').doc(mirrorID).set({ status: 'running'}, { merge: true })
                    )}
                >
                    <Image source={require('../assets/images/shutdown.png')}/>
                </TouchableOpacity>
                <Button
                onPress={() => status === 'running' ? (
                    firestore().collection('mirrors').doc(mirrorID).set({ status: 'sleep mode'}, { merge: true })
                    ) : status === 'sleep mode' ? (
                        firestore().collection('mirrors').doc(mirrorID).set({ status: 'running'}, { merge: true })
                    ) : status === 'turned off' && (
                        firestore().collection('mirrors').doc(mirrorID).set({ status: 'sleep mode'}, { merge: true })
                    )}
                title="SLEEP"
                color="#841584"
                accessibilityLabel="Turn Off"
                />
            </View>
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
    },
    turnOff: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#DDDDDD'
    }
});

export default Mirror;