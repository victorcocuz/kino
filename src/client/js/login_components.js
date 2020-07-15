const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const addMovieForm = document.querySelector('#add-movie-form');
const movieList = document.querySelector('#movie-list');

function setupUI(user) {
    if (user) {
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        addMovieForm.style.display = 'block';
    } else { 
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        addMovieForm.style.display = 'none';
    }
}

export {
    setupUI
}