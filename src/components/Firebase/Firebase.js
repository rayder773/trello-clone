import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCxqZDj22hLbNZNm7Ot2-3cUy4OwlK1uuw',
  authDomain: 'trello-clone-95d19.firebaseapp.com',
  databaseURL: 'https://trello-clone-95d19.firebaseio.com',
  projectId: 'trello-clone-95d19',
  storageBucket: 'trello-clone-95d19.appspot.com',
  messagingSenderId: '679377117547',
  appId: '1:679377117547:web:49f6d979167ff6c9bfac2e',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
