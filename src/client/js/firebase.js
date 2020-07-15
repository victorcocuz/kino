/*******************************************************************************************************
IMPORTS AND VARIABLES
********************************************************************************************************/
// Initialize Firebase
const fb = require('firebase/app');
require('firebase/firestore');
require('firebase/auth')

fb.initializeApp({
    apiKey: "AIzaSyDR6Y6NThIZWuCVxN1ahUIp2pHV5EHgQ4U",
    authDomain: "qp-kino.firebaseapp.com",
    databaseURL: "https://qp-kino.firebaseio.com",
    projectId: "qp-kino",
    storageBucket: "qp-kino.appspot.com",
    messagingSenderId: "315993142028",
    appId: "1:315993142028:web:441217e0cf2cbd1a0b0f29",
    measurementId: "G-GB2C7SV8FZ"
});

// Add references to firebase services
const db = fb.firestore();
const auth = fb.auth();

let unsubscribe;
const movieList = document.querySelector('#movie-list');


/*******************************************************************************************************
FIRESTORE
********************************************************************************************************/
// CREATE - Add a movie to firebase
function listenForAddToFirebase() {
    const form = document.querySelector('#add-movie-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        db.collection('movies').add({
            name: Client.capitalize(form.name.value),
            year: parseInt(form.year.value)
        });
        form.name.value = '';
        form.year.value = '';
    });
};

// READ - Show movies from firebase in realtime using snapshot
function showMovieList() {
    unsubscribe = db.collection('movies').orderBy('year').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == 'added'){
                renderMovie(change.doc)
            } else if (change.type == 'removed'){
                movieList.querySelector(`[data-id=${change.doc.id}]`).remove();
            }
        })
    })
}

function hideMovieList() {
    movieList.innerHTML = ''
}

// UPDATE - Append a movie in firebase
// TODO
function update_movie(id) {
    db.collection('movies').doc(id).update({
        name: 'TODO'
    })
}

// DELETE - Remove a movie from firebase
function remove_movie(id) {
    db.collection('movies').doc(id).delete();
    return id;
}

// Render movie
function renderMovie(doc) {
    const movieList = document.querySelector('#movie-list');
    let li = document.createElement('li');
    let name = document.createElement('span');
    let year = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    year.textContent = doc.data().year;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(year);
    li.appendChild(cross);
    movieList.appendChild(li);

    // Add listener to the x button to remove movie on click
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        remove_movie(id);
    })
}


/*******************************************************************************************************
AUTHENTICATION
********************************************************************************************************/
// Listen for auth status changes
function listenForAuthChanges() {
    auth.onAuthStateChanged(user => {
        if (user) {
            Client.setupUI(user);
            showMovieList();
            console.log('User Logged in: ', user)
        } else {
            Client.setupUI();
            hideMovieList();
            console.log("User logged out")
        }
    })
}

// Sign Up
function addSignUpEvent() {
    const signupForm = document.querySelector('#signup-form')
    signupForm.addEventListener('submit', evt => {
        evt.preventDefault();

        // Get user info
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;

        // Sign Up user
        auth.createUserWithEmailAndPassword(email, password).then(credential => {
            document.querySelector('#modal-signup').classList.remove('open');
            signupForm.reset();
        })
    })
}

// Log In
function addLoginEvent() {
    const loginForm = document.querySelector('#login-form')
    loginForm.addEventListener('submit', evt => {
        evt.preventDefault();

        // Get login info
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        auth.signInWithEmailAndPassword(email, password).then(credential => {
            document.querySelector('#modal-login').classList.remove('open');
            loginForm.reset();
        })
    })
}

// Sign Out
function addSignOutEvent() {
    const logout = document.querySelector('#logout')
    logout.addEventListener('click', evt => {
        evt.preventDefault();
        unsubscribe();
        auth.signOut();
    })
}


/*******************************************************************************************************
EXPORTS
********************************************************************************************************/
export {
    showMovieList,
    listenForAddToFirebase,
    addSignUpEvent,
    addSignOutEvent,
    addLoginEvent,
    listenForAuthChanges
}