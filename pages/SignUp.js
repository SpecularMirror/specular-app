import React from 'react';
import auth from '@react-native-firebase/auth';
import Login from '../functions/Signin';
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


const SignUp: () => React$Node = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [dob, setDob] = useState();

return (
    <View style={styles.body}>
        <Image source={require('../assets/images/logo.png')} />
        <Text style={styles.sectionTitle}>Welcome to Specular</Text>
        <Text style={styles.sectionDescription}>Create an account now!</Text>
        <View style={styles.credentials}>
          <TextInput
            style={styles.textInput}
            placeholder={"Name"}
            textContentType={"name"}
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Surname"}
            textContentType={"surname"}
            onChangeText={(value) => setSurname(value)}
            value={surname}
          />
           <TextInput
            style={styles.textInput}
            placeholder={"Date of Birth"}
            textContentType={"dob"}
            onChangeText={(value) => setDob(value)}
            value={dob}
          />
           <TextInput
            style={styles.textInput}
            placeholder={"e-mail"}
            textContentType={"emailAddress"}
            onChangeText={(value) => setEmail(value)}
            value={email}
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
            onPress={() => Login.signin(email, password,name,surname,dob,)}
            title="Sign up"
            color="#841584"
            accessibilityLabel="Login"
          />
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

export default SignUp;
