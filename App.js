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

import login from './functions/Login.js';

const App: () => React$Node = () => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

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
      <View style={styles.body}>
        <Image source={require('./assets/images/logo.png')} />
        <Text style={styles.sectionTitle}>Welcome to Specular</Text>
        <Text style={styles.sectionDescription}>Start logging in or creating an account</Text>
        <View style={styles.credentials}>
          <TextInput
            style={styles.textInput}
            placeholder={"e-mail"}
            textContentType={"emailAddress"}
            onChangeText={(value) => setUsername(value)}
            value={username}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Password"}
            textContentType={"password"}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <Button
            onPress={() => login.login(username, password)}
            title="Login"
            color="#841584"
            accessibilityLabel="Login"
          />
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
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
  }
});

export default App;
