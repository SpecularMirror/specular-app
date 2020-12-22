import auth from '@react-native-firebase/auth';

class Login{
    login(username, password) {
        auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => {
            console.log('User existing & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
    }
}
const login = new Login();
export default login;