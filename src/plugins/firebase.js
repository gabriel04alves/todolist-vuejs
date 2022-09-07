import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAKwqIYm_8dcF6Bz29W6DIKJbij7zU0jv8",
    authDomain: "task-of-day-vue.firebaseapp.com",
    projectId: "task-of-day-vue",
    storageBucket: "task-of-day-vue.appspot.com",
    messagingSenderId: "317770695679",
    appId: "1:317770695679:web:f30f6638a5f26fc8d71dca"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const profileCollection = db.collection('profile')
const tasksCollection = db.collection('tasks')
const googleProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    auth,
    profileCollection,
    tasksCollection,
    googleProvider
}