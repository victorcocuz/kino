const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const addMovieForm = document.querySelector('#add-movie-form');
const movieList = document.querySelector('#movie-list');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

function setupUI(user, db) {
    if (user) {
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        }
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        addMovieForm.style.display = 'block';
        setupUserInfo(user, db);
    } else { 
        adminItems.forEach(item => item.style.display = 'none');
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        addMovieForm.style.display = 'none';
        accountDetails.innerHTML = '';
    }
}

function setupUserInfo(user, db) {
    if (db.collection('users').doc(user.uid)){
        db.collection('users').doc(user.uid).get().then(doc => {
            let user_email = document.createElement('div');
            user_email.textContent = `Logged in as ${user.email}`;
            accountDetails.appendChild(user_email);

            let user_bio = document.createElement('div');
            user_bio.textContent = `${doc.data().bio}`
            accountDetails.appendChild(user_bio);

            let user_admin = document.createElement('div');
            user_admin.textContent = `${user.admin ? 'Admin' : 'Not Admin'}`;
            accountDetails.appendChild(user_admin);
        });
    }
}

export {
    setupUI,
    setupUserInfo
}