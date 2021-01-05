import auth from '@react-native-firebase/auth';
import { Actions } from 'react-native-router-flux';
import firestore from '@react-native-firebase/firestore';

class Signin{
 signin(email, password,name,surname,dob) {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
        firestore().collection('users').doc(user.user.uid).set({
            name: name,
            surname: surname,
            dob: dob,
            image: 'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
            email: email
        }).then((doc)=>{ 
            Actions.Home();
            })
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        }

        console.error(error);
    });
}
}
const signin = new Signin();
export default signin;