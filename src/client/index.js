/*******************************************************************************************************
IMPORTS AND VARIABLES
********************************************************************************************************/
// Constants
import {
    EVENTS
} from '../server/constants'

// JS Imports
import { 
    // CRUD
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
} from './js/network'

// Helpers
import { capitalize } from './js/helpers'

// CSS Imports
import 'normalize.css';
import './styles/main.sass'


/*******************************************************************************************************
INITIALIZATIONS
********************************************************************************************************/
// CRUD
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
    // Functions
    setupUI,
    setupUserInfo,
    getMovies,

    // Helpers
    capitalize,
}