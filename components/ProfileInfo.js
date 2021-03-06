import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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

changeImage = () => {
    const options = {
        quality:0.7,allowsEditing:true, mediaType:'photo', noData:true,
        storageOptions:{
            skipBackup: true, waitUntilSaved: true, path: 'images', cameraRoll:true
        }
    }
    ImagePicker.showImagePicker(options, response => {
        if(response.error){
            console.log(error)
        }else if (!response.didCancel){
            this.setState({
                imageSource: {uri: response.uri}
            })
        }
    })
}

    return (
        <SafeAreaView style={styles.mirrorContainer}>
            <TouchableOpacity onPress={this.changeImage}>
              <Image source={{uri: image}} style={styles.profilePic}/>
            </TouchableOpacity>
            <Text style={styles.nameTitle}>{name} {surname}</Text>
            <Text style={styles.emailTitle}>{email}</Text>
        </SafeAreaView>
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
    nameTitle: {
        fontWeight: "600",
        color: 'black',
        fontSize: 30,
        marginTop: 30,
    },
    emailTitle: {
        fontWeight: "600",
        color: '#707070',
        fontSize: 20,
        marginTop: 1,
    },
    profilePic: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 5,
        borderColor: '#69F0AE',
    }
});

export default ProfileInfo;