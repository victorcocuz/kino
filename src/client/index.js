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
const modal_signup = document.querySelector('#modal-signup');
modal_signup.classList.add("hidden");
document.querySelector('.modal-button-signup').addEventListener('click', e => {
    modal_signup.classList.remove("hidden")
})

// CSS Imports
import './styles/main.sass'

// Export js to Client library for output
export {
    helperFunction
}