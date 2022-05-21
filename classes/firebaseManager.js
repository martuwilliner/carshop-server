const app = require('../firebase.config.js')
const { getFirestore,collection, addDoc,getDocs,doc,getDoc,deleteDoc, setDoc } = require("firebase/firestore");

const db = getFirestore(app)

class firebaseManager {
    constructor(collection) {
        this.db = db;
        this.collection = collection;
    }

    async addDoc(doc) {
        return await addDoc(collection(this.db, this.collection), doc);
    }

    async getDocs() {
        let results = []
        let docs = await getDocs(collection(this.db, this.collection))
        docs.forEach(doc => results.push(Object({id:doc.id,...doc.data()})))
        return results;
    }

    async getDoc(id) {
        const docRef = doc(this.db, this.collection, id);
        const docSnap = await getDoc(docRef);
        return docSnap.data()
    }

    async updateDoc(id, data) {
        return await setDoc(doc(this.db, this.collection, id), data);
    }

    async deleteDoc(id) {
        return await deleteDoc(doc(this.db, this.collection, id));
    }

}

module.exports = firebaseManager;