// JS Imports
import { 
    showMovieList,
    addToFirebase,
    addSignUpEvent,
    addSignOutEvent,
    addLoginEvent,
    listenForAuthChanges
} from './js/firebase'
import { helperFunction } from './js/helpers'

// CRUD
showMovieList();
const form = document.querySelector('#add-movie-form');
form.addEventListener('submit', e => {
    addToFirebase(e, form)
});

// Modals
Array.from(document.querySelectorAll('.modal-trigger')).forEach(elem => {
    elem.addEventListener('click', () => {
        document.querySelector(`#${elem.getAttribute('data-target')}`).classList.add('open')
    })
})

Array.from(document.querySelectorAll('.modal')).forEach(elem => {
    elem.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('modal')) {
            elem.classList.remove('open');
        }
    })
})

// Auth
addSignUpEvent();
addSignOutEvent();
addLoginEvent();
listenForAuthChanges();

// CSS Imports
import 'normalize.css';
import './styles/main.sass'

// Export js to Client library for output
export {
    helperFunction
}