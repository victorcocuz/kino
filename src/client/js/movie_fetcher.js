// Imports
// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const csv = require('fast-csv');
// const JSONToCSV = require('json2csv').parse;
// const constants = require('./constants');

// INPUTS
const START_YEAR = 2020;
const FINISH_YEAR = 2020;
const START_ID = '00';
const FINISH_ID = '00';

// Variables
let movies = [];
let fetchYears = [];
let imdbLogs = [`***********************************************\nIMDB LOGS\n***********************************************`];

// Execute the getMovies function, write the results to the csv file and log any errors
// getMovies(START_YEAR, FINISH_YEAR).then(() => {
    // fs.mkdirSync('csv', { recursive: true })
    // fs.mkdirSync('logs', { recursive: true })
    // writeToCSV(movies);
    // imdbLogs.push('\n\n');
    // fs.writeFileSync('./logs/imdb_logs.txt', imdbLogs.join('\n') , 'utf-8');
// });

// Get all movies, given a year interval and a festival index
async function getMovies(firstYear, lastYear) {
    const browser = await puppeteer.launch();
    for (let index = START_ID; index <= FINISH_ID; index++) {
        for (let year = firstYear; year <= lastYear; year++) {
            fetchYears.push(fetchYear(browser, Client.EVENTS[Object.keys(Client.EVENTS)[index]], year));
        }
        await Promise.all(fetchYears);
        fetchYears = [];
    }
    await browser.close();
    console.log('this worked')
}

// Fetch the movies for a single year
async function fetchYear(browser, event, year) {
    console.log(`https://www.imdb.com/event/ev${event}/${year}/1/`);
    try {
        // Create a new page, load it and check response
        let responseStatus = -1;
        const page = await browser.newPage();
        page.on('response', response => {responseStatus = response.status()});
        await page.goto(`https://www.imdb.com/event/ev${event}/${year}/1/`, { waituntil: 'load', timeout: 0});
        imdbLogs.push(`INFO: Status for year ${year} is ${responseStatus}`);

        // If response is successful fetch movies
        if (200 <= responseStatus && responseStatus < 300) {
            // Push returned object into the movies array
            movies.push(...await page.evaluate(async (event, year) => {

                let moviesSingleYear = [];
                let entryEventName = document.querySelector('.event-header__title').innerText.split(',')[0];
        
                // Awards
                let awards = document.querySelectorAll('.event-widgets__award');
                let awardCount = 0
                awards.forEach(award => {
                    awardCount += 1
                    entryAwardName = award.querySelector('.event-widgets__award-name').innerText;
                    
                    let categories = award.querySelectorAll('.event-widgets__award-category');
                    let categoryCount = 0
                    categories.forEach(category => {
                        // Category
                        categoryCount += 1
                        let entryCategoryName = category.innerText.split('\n')[0];
                        if (entryCategoryName == 0) entryCategoryName = 'N/A';
            
                        // Winners and nominees
                        let nominations = category.querySelectorAll('.event-widgets__award-nomination');
                        let nominationCount = 0
                        nominations.forEach(async nomination => {
                            nominationCount += 1

                            // Check if nominee won
                            let entryWon = 'No';
                            if (nomination.querySelector('.event-widgets__winner-badge')) {
                                entryWon = 'Yes';
                            };

                            let imdbId = nomination.querySelector('.event-widgets__nominee-image a').href.substring(26, 38).replace(/[?/]|ny|r/g, '');

                            let type = imdbId.charAt(0);
                            let imdbRef = `${event}/${year}/${awardCount}/${categoryCount}/${nominationCount}/${imdbId}`;
                            
                            let primaryNomineesList = nomination.querySelectorAll('.event-widgets__primary-nominees .event-widgets__nominee-name');
                            let secondaryNomineesList = nomination.querySelectorAll('.event-widgets__secondary-nominees .event-widgets__nominee-name');
                            
                            // Get list of primary and secondary nominees
                            let primaryNominees = [];
                            if ((primaryNomineesList.length == 0) || (primaryNomineesList == null)) {
                                primaryNominees.push('N/A');
                            } else {
                                primaryNomineesList.forEach(primaryNominee => {
                                    primaryNominees.push(primaryNominee.innerText);
                                });
                            };

                            let secondaryNominees = [];
                            if ((secondaryNomineesList.length == 0) || (secondaryNomineesList == null)) {
                                secondaryNominees.push('N/A');
                            } else {
                                secondaryNomineesList.forEach(secondaryNominee => {
                                    secondaryNominees.push(secondaryNominee.innerText);
                                });
                            };

                            // Edge case if there is no movie and no recipient
                            if ((primaryNominees[0] == 'N/A') && (secondaryNominees[0] == 'N/A')) return;

                            // Add movie info
                            primaryNominees.forEach(primaryNominee => {
                                let entryMovie = '';
                                let entryRecipients = '';
                                
                                secondaryNominees.forEach(secondaryNominee => {
                                    let recipient = ''
                                    if (type == 't') {
                                        entryMovie = primaryNominee;
                                        recipient = secondaryNominee;
                                    } else if ((type == 'n') || (type == 'c')) {
                                        entryMovie = secondaryNominee;
                                        recipient = primaryNominee;
                                    };

                                    if (!entryRecipients.includes(recipient)) {
                                        entryRecipients = `${entryRecipients}, ${recipient}`
                                    };
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
            }, event, year));
            console.log(`${year} movies have been added`); 
        } else {
            imdbLogs.push(`ERROR: https://www.imdb.com/event/ev${event}/${year}/1/ has status ${responseStatus}`);
        };
    } catch (err) {
        console.log(err);
        imdbLogs.push(`ERROR: err`);
    };
};

export {
    getMovies
}

// function writeToCSV(data) {
//     const csv = JSONToCSV(data, { fields: ['imdbRef', 'imdbId', 'event', 'award', 'year', 'category', 'won', 'movie', 'recipient']});
//     fs.writeFileSync('./csv/movies.csv', csv);
// };
