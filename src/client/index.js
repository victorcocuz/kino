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
Array.from(document.querySelectorAll('.modal-trigger')).forEach(elem => {
    elem.addEventListener('click', () => {
        document.querySelector(`#${elem.getAttribute('data-target')}`).classList.add('open')
    })
})

Array.from(document.querySelectorAll('.modal')).forEach(elem => {
    elem.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('modal')) {
            elem.classList.remove('open')
        }
    })
})

// CSS Imports
import 'normalize.css';
import './styles/main.sass'

// Export js to Client library for output
export {
    helperFunction
}