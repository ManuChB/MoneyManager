import moment from 'moment';
import firebase from "firebase";
require("firebase/firestore");

import appConstants from '../../../appConstants';
import AsyncStorageService from '../async-storage/async-storage.service';


var firebaseConfi = {
    apiKey: "AIzaSyCvPnuTbLCkIsfsZLS4QLzO_itPQaDOfJE",
    authDomain: "moneymanager-6d989.firebaseapp.com",
    databaseURL: "https://moneymanager-6d989.firebaseio.com",
    projectId: "moneymanager-6d989",
    storageBucket: "moneymanager-6d989.appspot.com",
    messagingSenderId: "842630312759",
    appId: "1:842630312759:web:8033ff6542c85e46"

};


var db;

class FirebaseService {

    async init() {
        if (!firebase.apps.length) {
            const appFirebase = await firebase.initializeApp(firebaseConfi);
            db = appFirebase.firestore();
            const settings = {/* your settings... */  };
            db.settings(settings);
        }        
    }

    async newUser(userName, password){
        const response = await firebase.auth().createUserWithEmailAndPassword(userName, password);
        await firebase.auth()
        return response;
    }

    async logIn(userName, password) {
        const response = await firebase.auth().signInWithEmailAndPassword(userName, password);
        return response;
    }

    async RecoverPassword(userName) {
        const response = await firebase.auth().sendPasswordResetEmail(userName);
        return response;
    }

    async getTransactionsByDate(date) {
        const uid = await AsyncStorageService.getItem('USER_ID');
        if( !uid) {
            return null;
        }
        const snapshot = await db.collection(appConstants.collection.transactions).where('date', '==', date).where('uid', '==', uid ).get(); // "capital", "==", true
        return await Promise.all(snapshot.docs.map(async (doc): Promise<any> => {
            let account = doc.data().account;
            if (doc.data().account){
                const accountList = await db.collection(appConstants.collection.accounts).where('id', '==', account).get();
                account = accountList.docs.map(doc => {
                    return doc.data();
                })[0];
            }
            return { ...doc.data(), date: moment.unix(doc.data().date.seconds), account: account, id: doc.id  };
        }));

    }

    async getTransactionsByDateRange(dateStart, datEnd) {
        const uid = await AsyncStorageService.getItem('USER_ID');
        const snapshot = await db.collection(appConstants.collection.transactions)
            .where('uid', '==', uid)
            .where('date', '>=', dateStart)
            .where('date', '<=', datEnd)
            .get();
        return await Promise.all(snapshot.docs.map(async (doc): Promise<any> => {
            let account = doc.data().account;
            if (doc.data().account) {
                const accountList = await db.collection(appConstants.collection.accounts).where('id', '==', account).get();
                account = accountList.docs.map(doc => {
                    return doc.data();
                })[0];
            }
            return { ...doc.data(), date: moment.unix(doc.data().date.seconds), account: account, id: doc.id  };
        }));

    }

    async getAllFromCollection(collection) {
        const snapshot = await db.collection(collection).get();
        const data = snapshot.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        });

        return data;
    }

    async getAllFromCollectionWhithUid(collection, uid) {
        const snapshot = await db.collection(collection).where('uid', '==', uid).get();
        const data = snapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
        });

        return data;
    }

    async getAllFromCollectionWhere(collection, query) {
        // console.log(`[FirebaseService][getAllFromCollectionWhere] ${collection} [query] ${query}`);
        const snapshot = await db.collection(collection).where(query[0], query[1], query[2]).get(); // "capital", "==", true
        return snapshot.docs.map(doc => {
            return { ...doc.data(), date: moment.unix(doc.data().date.seconds) };
        });
    }

    getCollectionDocument(collection, document) {
        // console.log(`[FirebaseService][getCollectionDocument] ${collection} [document] ${document}`);
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
       // console.log('[FirebaseService][addToCollection]', collection,'[data]',data);
        delete data.id;
        return await db.collection(collection).add(data);
    }

    updateDocumentInCollection(collection, data) {
        //console.log(`[FirebaseService][addToCollection] ${collection} [data] ${data}`);
        db.collection(collection).doc(data.id).update(data);
    }

    async removeFromCollection(collection, data) {
        //console.log(`[FirebaseService][removeFromCollection] ${collection} [data] ${data.id}`);
        return await db.collection(collection).doc(data.id).delete();
    }
}

export default new FirebaseService();