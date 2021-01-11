function displayMovies(movies) {
    console.clear();
    console.log(movies[0])
    // let thead = document.createElement('thead');
    // let tbody = document.createElement('tbody');
    // for (let i = 0; i < movies.length; i++) {
    //     if (i == 0) {
    //         console.log('before add row')
    //         // console.log(movies[0])
    //         thead.appendChild(addRow(movies[i], i));
    //     } else {
    //         tbody.appendChild(addRow(movies[i], i))
    //     }
    // }

    // table.appendChild(thead)
    // table.appendChild(tbody)
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

function addRow(entry, i) {
    console.log('inside function')
    let tableRow = document.createElement('tr')
    for (item in entry) {
        console.log('inside for')
        let cell;
        if (i == 0) {
            cell = document.createElement('th')
        } else {
            cell = document.createElement('td')
        }
        cell.innerText = item
        tableRow.append(cell)
    }
    return tableRow
}

export {
    displayMovies
}

    //     let li = document.createElement('li');
    //     let imdbRef = document.createElement('span');
    //     let imdbId = document.createElement('span');
    //     let event = document.createElement('span');
    //     let year = document.createElement('span');
    //     let award = document.createElement('span');
    //     let category = document.createElement('span');
    //     let movie = document.createElement('span');
    //     let recipient = document.createElement('span');
    //     let won = document.createElement('span');

        // li.setAttribute('data-id', movies[i][0]);
        // name.textContent = doc.data().name;
        // year.textContent = doc.data().year;
        // cross.textContent = 'x';
    
        // li.appendChild(name);
        // li.appendChild(year);
        // li.appendChild(cross);
        // movieList.appendChild(li);