/*******************************************************************************************************
IMPORTS AND VARIABLES
********************************************************************************************************/
// Dependencies
import 'puppeteer'
import 'jquery'
const movieList = jQuery('#movie-list');
// Constants
import {
    EVENTS
} from './js/constants'

// JS Imports
import { 
    // CRUD
    // showMovieList,
    listenForAddToFirebase,
    // AUTH
    addSignUpEvent,
    addSignOutEvent,
    addLoginEvent,
    listenForAuthChanges,
} from './js/firebase'

import {
    listenForOpenModals,
    listenForCloseModals
} from './js/modals'

import { 
    setupUI,
    setupUserInfo 
} from './js/login_components'

import {
    getMovies
} from './js/movie_fetcher'

// Helpers
import { capitalize } from './js/helpers'

// CSS Imports
import 'normalize.css';
import './styles/main.sass'


/*******************************************************************************************************
INITIALIZATIONS
********************************************************************************************************/
// CRUD
// showMovieList();
listenForAddToFirebase();

// Modals
listenForOpenModals();
listenForCloseModals();

// Auth
addSignUpEvent();
addSignOutEvent();
addLoginEvent();
listenForAuthChanges();
// puppeteer.launch();

/*******************************************************************************************************
EXPORTS
********************************************************************************************************/
// Export js to Client library for output
export {
    // Constants
    EVENTS,

    // Functions
    setupUI,
    setupUserInfo,
    getMovies,

    // Helpers
    capitalize,
    // puppeteer
}