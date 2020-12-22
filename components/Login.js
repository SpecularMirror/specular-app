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

import login from '../functions/Login.js';

const Login: () => React$Node = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

return (
    <View style={styles.body}>
        <Image source={require('../assets/images/logo.png')} />
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

        <View style={styles.signup}>
          <Text>Not a member?</Text>
        </View>
      </View>
    )
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

export default Login;
