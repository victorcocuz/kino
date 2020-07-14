// JS Imports
import { 
    init_firebase,
    show_movie_list,
    add_to_firebase
} from './js/firebase'
import { helperFunction } from './js/helpers'

// CRUD
show_movie_list();
const form = document.querySelector('#add-movie-form');
form.addEventListener('submit', e => {
    add_to_firebase(e, form)
});

// Modals
Array.from(document.querySelectorAll('.modal')).forEach(e => {
    e.addEventListener('click', () => {
        console.log('modal')
        e.classList.remove('open')
    })
})

Array.from(document.querySelectorAll('.modal-trigger')).forEach(e => {
    e.addEventListener('click', () => {
        console.log(e.getAttribute('data-target'))
        document.querySelector(`#${e.getAttribute('data-target')}`).classList.add('open')
    })
})

// CSS Imports
import 'normalize.css';
import './styles/main.sass'

// Export js to Client library for output
export {
    helperFunction
}