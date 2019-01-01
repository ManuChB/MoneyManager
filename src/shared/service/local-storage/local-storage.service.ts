// class LocalStorageService {
//     db: any;

//     constructor() {
        
//     }

//     initStorage () {
//         console.log(`[LocalStorageService][initStorage]`);
//         var Datastore = require('react-native-local-mongodb');
//             this.db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

//         var a = this.db.insert([{ a: 5 }, { a: 42 }]), function (err, newDocs) {
            
//             console.log(`a[LocalStorageService][insert][newDocs] --> ${newDocs} //[error] --> ${err}`);
//             return newDocs;
//         }); 
//         this.db.find({ a: 5 }, function (err, docs) {
//             console.log(`a[LocalStorageService][insert][newDocs] --> ${docs} //[error] --> ${err}`);

//         });
//         console.log(`[LocalStorageService][initStorage]end`, a);

//     }

//     insert (data) {
//     //     console.log(`[LocalStorageService][insert]`);

//     //     this.db.insert([{ a: 5 }, { a: 42 }], function (err, newDocs) {
//     //         console.log(`[LocalStorageService][insert][newDocs] --> ${newDocs} //[error] --> ${err}`);
//     //    }); 
//     }

//     get () {
//         // console.log(`[LocalStorageService][get]`);
//         // this.db.find({ a: 5 }, function (err, docs) {
//         //     console.log(`[LocalStorageService][insert][newDocs] --> ${docs} //[error] --> ${err}`);

//         // });
//     }
// }

// export default new LocalStorageService();