/*******************************************************************************************************
Imports and variables
********************************************************************************************************/
// Initialize Firebase
const movieList = document.querySelector('#movie-list');

const fb = require('firebase/app');
require('firebase/firestore');
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
const db = fb.firestore();

// CREATE - Add a movie to firebase
function add_to_firebase(e, 
    form) {
    e.preventDefault();
    db.collection('movies').add({
        name: form.name.value,
        year: parseInt(form.year.value)
    });
    form.name.value = '';
    form.year.value = '';
};

// READ - Show movies from firebase in realtime using snapshot
function show_movie_list() {
    db.collection('movies').orderBy('year').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == 'added'){
                render_movie(change.doc)
            } else if (change.type == 'removed'){
                movieList.querySelector(`[data-id=${change.doc.id}]`).remove();
            }
        })
    })
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


/*******************************************************************************************************
Helper Methods
********************************************************************************************************/
// Render movie
function render_movie(doc) {
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
Exports
********************************************************************************************************/
export {
    // init_firebase,
    show_movie_list,
    add_to_firebase
}