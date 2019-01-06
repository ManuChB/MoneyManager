import firebase from "firebase";
require("firebase/firestore");

var firebaseConfi = {
    apiKey: "AIzaSyCvPnuTbLCkIsfsZLS4QLzO_itPQaDOfJE",
    authDomain: "moneymanager-6d989.firebaseapp.com",
    databaseURL: "https://moneymanager-6d989.firebaseio.com",
    projectId: "moneymanager-6d989",
    storageBucket: "moneymanager-6d989.appspot.com",
    messagingSenderId: "842630312759"
};

var db;

class FirebaseService {

    async init() {
        const appFirebase = await firebase.initializeApp(firebaseConfi);
        db = appFirebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true };
        db.settings(settings);
    }

    async newUser(userName, password){
        const response = await firebase.auth().createUserWithEmailAndPassword(userName, password);
        return response;
    }

    async logIn(userName, password) {
        const response = await firebase.auth().signInWithEmailAndPassword(userName, password);
        return response;
    }

    async getTransactions() {
        console.log('[FirebaseService][getTransactions]');
        const snapshot = await db.collection('transactions').get()
        return snapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
        });
    }

    getAllFromCollection(collection) {
        console.log('[FirebaseService][getAllFromCollection]', collection);
        db.collection(collection).get()
            .then(function (querySnapshot) {
                return querySnapshot;
                // querySnapshot.forEach(function (doc) {
                //     // doc.data() is never undefined for query doc snapshots
                //     console.log(doc.id, " => ", doc.data());
                // });
            }).catch(function (error) {
                console.log(`[FirebaseService][getAllFromCollection][error] ${error}`);
                return null;
            });
    }


    getAllFromCollectionWhere(collection, query) {
        console.log(`[FirebaseService][getAllFromCollectionWhere] ${collection} [query] ${query}`);
        db.collection(collection).where(query) // "capital", "==", true
            .get()
            .then(function (querySnapshot) {
                return querySnapshot;
            })
            .catch(function (error) {
                console.log(`[FirebaseService][getAllFromCollectionWhere][error] ${error}`);
                return null;
            });
    }

    getCollectionDocument(collection, document) {
        console.log(`[FirebaseService][getCollectionDocument] ${collection} [document] ${document}`);
        db.collection(collection).doc(document).get()
            .then(function (doc) {
                if (doc.exists) {
                    return doc;
                } else {
                    return null;
                }
            }).catch(function (error) {
                console.log(`[FirebaseService][getCollectionDocument][error] ${error}`);
                return null;
            });
    }


    addToCollection(collection, data) {
        console.log(`[FirebaseService][addToCollection] ${collection} [data] ${data}`);
        db.collection(collection).add(data);
    }
}

export default new FirebaseService();