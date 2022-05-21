const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyAa2RarghDz6B5IAQixUz3l9HKdvN5oWf4",
  authDomain: "coder-crud-db.firebaseapp.com",
  projectId: "coder-crud-db",
  storageBucket: "coder-crud-db.appspot.com",
  messagingSenderId: "1024011150723",
  appId: "1:1024011150723:web:0023ee9fbb57b516d9c2b6"
};

const app = initializeApp(firebaseConfig);

module.exports = app