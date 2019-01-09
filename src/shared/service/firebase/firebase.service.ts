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

    async getAllFromCollection(collection) {
        console.log('[FirebaseService][getAllFromCollection]', collection);
        const snapshot = await db.collection(collection).get();
        return snapshot.docs.map(doc => {
            return { data: doc.data(), id:doc.id };
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

    async addToCollection(collection, data) {
        console.log('[FirebaseService][addToCollection]', collection,'[data]',data);
        return await db.collection(collection).add(data);
    }

    updateDocumentInCollection(collection, data) {
        console.log(`[FirebaseService][addToCollection] ${collection} [data] ${data}`);
        db.collection(collection).doc(data.id).update(data);
    }
}

export default new FirebaseService();