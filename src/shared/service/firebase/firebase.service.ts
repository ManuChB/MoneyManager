import firebase from "firebase";

var firebaseConfi = {
    apiKey: "AIzaSyCvPnuTbLCkIsfsZLS4QLzO_itPQaDOfJE",
    authDomain: "moneymanager-6d989.firebaseapp.com",
    databaseURL: "https://moneymanager-6d989.firebaseio.com",
    projectId: "moneymanager-6d989",
    storageBucket: "moneymanager-6d989.appspot.com",
    messagingSenderId: "842630312759"
};
class FirebaseService {

    async init() {
        await firebase.initializeApp(firebaseConfi);
    }

    async newUser(userName, password){
        const response = await firebase.auth().createUserWithEmailAndPassword(userName, password);
        return response;
    }

    async logIn(userName, password) {
        const response = await firebase.auth().signInWithEmailAndPassword(userName, password);
        return response;
    }
}

export default new FirebaseService();