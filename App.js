/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import auth from '@react-native-firebase/auth';
import {useState, useEffect} from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Login from './components/Login';
import Home from './pages/Home';

const App: () => React$Node = () => {

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

  if (!user) {
    return (
      <Login />
    );
  }

  return (
    <Home />
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.red,
    alignContent: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  textInput: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10
  },
  credentials: {
    marginTop: 30,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signup: {
    backgroundColor: Colors.white
  }
});

export default App;
