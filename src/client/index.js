// JS Imports
import { 
    init_firebase,
    show_movie_list,
    add_to_firebase
} from './js/firebase'
import { helperFunction } from './js/helpers'

show_movie_list();
const form = document.querySelector('#add-movie-form');
form.addEventListener('submit', e => {
    add_to_firebase(e, form)
});

// db.collection('movies').orderBy('year').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         console.log(change.doc.data())
//         if(change.type == 'added') {
//             renderMovie(change.doc)
//         }
//     })
//     console.log(changes);
// })

// CSS Imports
import './styles/main.sass'

// Export js to Client library for output
export {
    helperFunction
}