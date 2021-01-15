function displayMovies(movies) {
    console.log(movies)
    let table = document.querySelector('#movies-table')
    let keys = Object.keys(movies[0]);
    addTableHead(table, keys);
    addTableBody(table, movies);
}

function addTableHead(table, keys) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of keys) {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function addTableBody(table, movies) {
    for (let movie of movies) {
        let row = table.insertRow();
        for (let key in movie) {
            let cell = row.insertCell();
            let text = document.createTextNode(movie[key]);
            cell.appendChild(text);
        }
    }
}

export {
    displayMovies
}