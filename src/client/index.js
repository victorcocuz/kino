/*******************************************************************************************************
IMPORTS AND VARIABLES
********************************************************************************************************/
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

/*******************************************************************************************************
EXPORTS
********************************************************************************************************/
// Export js to Client library for output
export {
    capitalize,
    setupUI,
    setupUserInfo
}