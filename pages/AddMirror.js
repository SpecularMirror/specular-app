import React, { Component } from 'react';
import {
  StyleSheet,
  AppRegistry,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AddMirror: () => React$Node = () => {

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

  function onSuccess(e) {
    firestore().collection('users').doc(user.user.uid).set({ mirrorID: e.data}, { merge: true }).then((doc)=>{ 
      Actions.Home();
    })
  }
    
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
            </Text>
        }
        bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
        );
      }
    
    
    const styles = StyleSheet.create({
      centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
      },
      textBold: {
        fontWeight: '500',
        color: '#000'
      },
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
      },
      buttonTouchable: {
        padding: 16
      }
    });
    export default AddMirror;