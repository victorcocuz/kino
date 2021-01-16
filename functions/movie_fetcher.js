const constants = require('./constants');
const puppeteer = require('puppeteer');

async function fetchMovies(data) {
    // Create array of promises
    const browser = await puppeteer.launch();
    const fetchYears = [];
    for (let index = data.eventStart; index <= data.eventEnd; index++) {
        for (let year = data.yearStart; year <= data.yearEnd; year++) {
            fetchYears.push(() => fetchYear(browser, constants.EVENTS[Object.keys(constants.EVENTS)[index]], year));
        }
    }
    const arrayOfPromises = fetchYears.map(fetchYear => fetchYear());

    // Run all pages and return results
    return await Promise.allSettled(arrayOfPromises)
    .then(async responses => {
        let movies = []
        responses.forEach(response => {
            if (response.status === 'fulfilled') {
                movies.push(...response.value)
            } else {
                console.log(response.reason)
            }
        });

        // Close pages and browser
        let pages = await browser.pages();
        await Promise.all(pages.map(page => page.close()));
        await browser.close();

        if (movies.length === 0) {
            return {error: '404'}
        }

        return movies;
    });
}

// Fetch the movies for a single year
function fetchYear(browser, event, year) {
    return new Promise(async (resolve, reject) => {
        console.log(`https://www.imdb.com/event/ev${event}/${year}/1/`);
        let movies = []
        try {
            // Create a new page, load it and check response
            let responseStatus = -1;
            console.log('try')
            const page = await browser.newPage();
            page.on('response', response => {responseStatus = response.status()});
            console.log('add listener')
            await page.goto(`https://www.imdb.com/event/ev${event}/${year}/1/`, { waituntil: 'load', timeout: 0});
            console.log('goto page')
            // If response is successful fetch movies
            if (200 <= responseStatus && responseStatus < 300) {
                console.log('check respons')
                // Push returned object into the movies array
                movies = await page.evaluate(async (event, year) => {
                    console.log('evaluate')
                    let moviesSingleYear = [];
                    let entryEventName = document.querySelector('.event-header__title').innerText.split(',')[0];
            
                    // Awards
                    let awards = document.querySelectorAll('.event-widgets__award');
                    let awardCount = 0
                    awards.forEach(award => {
                        console.log('awards')
                        awardCount += 1
                        entryAwardName = award.querySelector('.event-widgets__award-name').innerText;
                        
                        let categories = award.querySelectorAll('.event-widgets__award-category');
                        let categoryCount = 0
                        categories.forEach(category => {
                            // Category
                            categoryCount += 1
                            let entryCategoryName = category.innerText.split('\n')[0];
                            if (entryCategoryName === 0) entryCategoryName = 'N/A';
                
                            // Winners and nominees
                            let nominations = category.querySelectorAll('.event-widgets__award-nomination');
                            let nominationCount = 0
                            nominations.forEach(async nomination => {
                                nominationCount += 1

                                // Check if nominee won
                                let entryWon = 'No';
                                if (nomination.querySelector('.event-widgets__winner-badge')) {
                                    entryWon = 'Yes';
                                }

                                let imdbId = nomination.querySelector('.event-widgets__nominee-image a').href.substring(26, 38).replace(/[?/]|ny|r/g, '');

                                let type = imdbId.charAt(0);
                                let imdbRef = `${event}/${year}/${awardCount}/${categoryCount}/${nominationCount}/${imdbId}`;
                                
                                let primaryNomineesList = nomination.querySelectorAll('.event-widgets__primary-nominees .event-widgets__nominee-name');
                                let secondaryNomineesList = nomination.querySelectorAll('.event-widgets__secondary-nominees .event-widgets__nominee-name');
                                
                                // Get list of primary and secondary nominees
                                let primaryNominees = [];
                                if ((primaryNomineesList.length === 0) || (primaryNomineesList === null)) {
                                    primaryNominees.push('N/A');
                                } else {
                                    primaryNomineesList.forEach(primaryNominee => {
                                        primaryNominees.push(primaryNominee.innerText);
                                    });
                                }

                                let secondaryNominees = [];
                                if ((secondaryNomineesList.length === 0) || (secondaryNomineesList === null)) {
                                    secondaryNominees.push('N/A');
                                } else {
                                    secondaryNomineesList.forEach(secondaryNominee => {
                                        secondaryNominees.push(secondaryNominee.innerText);
                                    });
                                }

                                // Edge case if there is no movie and no recipient
                                if ((primaryNominees[0] === 'N/A') && (secondaryNominees[0] === 'N/A')) return;

                                // Add movie info
                                primaryNominees.forEach(primaryNominee => {
                                    let entryMovie = '';
                                    let entryRecipients = '';
                                    
                                    secondaryNominees.forEach(secondaryNominee => {
                                        let recipient = ''
                                        if (type === 't') {
                                            entryMovie = primaryNominee;
                                            recipient = secondaryNominee;
                                        } else if ((type === 'n') || (type === 'c')) {
                                            entryMovie = secondaryNominee;
                                            recipient = primaryNominee;
                                        }

                                        if (!entryRecipients.includes(recipient)) {
                                            entryRecipients = `${entryRecipients}, ${recipient}`
                                        }
                                    });

                                    // Push values to object
                                    moviesSingleYear.push({
                                        imdbRef: imdbRef,
                                        imdbId: imdbId,
                                        event: entryEventName,
                                        award: entryAwardName,
                                        year: year,
                                        category: entryCategoryName,
                                        won: entryWon,
                                        movie: entryMovie,
                                        recipient: entryRecipients.replace(/ *\([^)]*\) */g, "").substring(2)
                                    });
                                });
                            });
                        });
                    });
                    return moviesSingleYear;
                }, event, year);
                resolve(movies)
            } else {
                reject(new Error(`REJECTION: https://www.imdb.com/event/ev${event}/${year}/1/ has status ${responseStatus}`));
            }
        } catch (err) {
            console.log(err);
        }
    });
}

module.exports = Object.freeze({
    fetchMovies: fetchMovies,
})