const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const movie_fetcher = require('./movie_fetcher');

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '2GB'
  }

const admin = require('firebase-admin');
admin.initializeApp();
exports.addAdminRole = functions.https.onCall((data, context) => {
    // check request is made by an admin
    if (context.auth.token.admin !== true) {
        return {
            error: 'Only admins can add other admins.'
        }
    }
    // get user and add custom claim (admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `Success: ${data.email} has been made an admin`
        };
    }).catch(err => {
        return err
    });
});

// Get all movies, given a year interval and a festival index
exports.getMovies = functions
.runWith(runtimeOpts)
.https.onRequest((req, res) => {
    cors(req, res, async () => {  
        const data = req.body.data
        console.log(data)
        await movie_fetcher.fetchMovies(data).then(movies => {
            if (movies.error) {
                console.log('yea 404')
                return res.status(404).send({error: 'Error 404, no movies'});
            } else {
                console.log('no 404')
                return res.status(200).send(movies);
            }
        })
    });
});
