//Require .env file
require("dotenv").config();

//Require request
var request = require('request');
//Require moment
var moment = require('moment');

//Require fs
var fs = require("fs");

//link key page
var keys = require("./keys.js");

//Initialize spotify
var spotify = require("node-spotify-api");
var spotify = new spotify(keys.spotify);

//OMDB and Bands in Town API
let omdb = (keys.omdb);
//let bandsintown = (keys.bandsintown);

//User command and Input
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

//App
function userCommand(userInput, userQuery) {
    switch (userInput) {
        //case "concert-this":
        //  concertThis();
        // break;
        case "spotify-this":
            concertThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("I don't understand");
            break;
    }
}
userCommand(userInput, userQuery);

//function concertThis() {
// console.log(`\n - - - - -\n\nSEARCHING FOR...${userQuery}'s next show...`);

//request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp" + bandsintown, function (error, response, body) {
// If no error, give status code - 200 Everything ok
// if (!error && response.statusCode === 200) {
// Capture data and use json
//let userBand = JSON.parse(body);

//if (userBand.length > 0) {
//for (i = 0; i < 1; i++) {


//  console.log(`\n...................\n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude},${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)


// let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
// console.log(`Date and Time: ${concertDate}\n\n- - - - -`);
// };
// } else {
//console.log('Band or concert not found!');
//  };
// };
// });
//};

function spotifyThisSong() {
    console.log(`\n..................\n\nSEARCHING FOR..."${userQuery}"`);

    // If user query not found use "ACE OF BASE" 
    if (!userQuery) {
        userQuery = "the sign ace of base"
    };

    // Spotify format
    spotify.search({
        type: 'track',
        query: userQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        // Get info in array
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\n.....................\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n....................`)
        };
    });
}

function movieThis() {
    console.log(`\n - - - - -\n\nSEARCHING FOR..."${userQuery}"`);
    if (!userQuery) {
        userQuery = "mr nobody";
    };
    // Request OMDB API
    request("http://www.omdbapi.com/?i=tt3896198&t=" + userQuery + "&apikey=180b2357", function (error, response, body) {
        let userMovie = JSON.parse(body);

        console.log(userMovie);
        let ratingsArr = userMovie.Ratings;
        //console.log(ratingsArr);
        if (ratingsArr.length > 2) {}

        if (!error && response.statusCode === 200) {
            console.log(`\n....................\n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n...................`)
        } else {
            return console.log("Movie unavailable or not valid. Error:" + error)
        };
    })
};

function doThis() {
    // Use read file to get random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // Get data and use split method
        let dataArr = data.split(",");

        // Put objects in random.txt
        userInput = dataArr[0];
        userQuery = dataArr[1];
        // Call the function to get new parameters
        userCommand(userInput, userQuery);
    });
};