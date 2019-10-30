require("dotenv").config();
//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret,
});
// var defaultSong = require("The Sign");
var defaultMovie = "Mr. Nobody";
// var spotify = new Spotify(keys.spotify);



/**
 * Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")
 */
var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this":
    getBands(value)
    break;
  case "spotify-this-song":
    //If user has not specified a song , use default
    // if (value === "") {
    //   value = defaultSong;
    // }
    getSongs(value)
    break;
  case "movie-this":
    //If user has not specified a movie , use default
    if (value == "") {
      value = defaultMovie;
    }
    getMovies(value)
    break;
  case "do-what-it-says":
    doWhatItSays()
    break;
  default:
    break;
}
function getBands(artist) {
  // var artist = value;
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log("Name of the venue:", response.data[0].venue.name);
      console.log("Venue location:", response.data[0].venue.city);
      var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
      console.log("Date of the Event:", eventDate);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getSongs(songName) {
  // var songName = value;

  //If user has not specified a song , default to "The Sign" by Ace of Bass
  if (songName === "") {
    songName = "I Saw the Sign";
  }

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // else {
    //   console.log("Not right now. Later?")

    // console.log(JSON.stringify(data)); 

    // The song's name

    //Artist(s)
    console.log("Artists: ", data.tracks.items[0].album.artists[0].name)
    // A preview link of the song from Spotify
    console.log("Preview Link: ", data.tracks.items[0].preview_url)
    // The album that the song is from
    console.log("Album Name: ", data.tracks.items[0].album.name)
  });
}

function getMovies(movieName) {
  // var movieName = value;
  axios.get("http://www.omdbapi.com/?t=Star+Wars" + movieName)
    .then(function (data) {
      // console.log(data.data); 
      var results = `
      Title of the movie: ${data.data.Title}
      Year the movie came out: ${data.data.Year}
      IMDB Rating of the movie: ${data.data.Rated}
      Rotten Tomatoes Rating of the movie: ${data.data.Ratings[1].Value}
      Country where the movie was produced: ${data.data.Country}
      Language of the movie: ${data.data.Language}
      Plot of the movie: ${data.data.Plot}
      Actors in the movie: ${data.data.Actors}`;
      console.log(results)

      // console.log(data);
      // console.log("Name of the venue:", response.data[0].venue.name);
      // console.log("Venue location:", response.data[0].venue.city);
      // var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
      // console.log("Date of the Event:", eventDate);
    })
    .catch(function (error) {
      console.log(error);
    });
    //Response if user does not type in a movie title
    if (movieName === "Mr. Nobody") {
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");
  };
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    data = data.split(",");
    var action = data[0]
    var value = data[1]
    // getSongs(value)
    switch (action) {
      case "concert-this":
        getBands(value)
        break;
      case "spotify-this-song":
        getSongs(value)
        break;
      case "movie-this":
        getMovies(value)
        break;
      default:
        break;
    }
  });
}
































































// // DEPENDENCIES
// // =====================================
// // Read and set environment variables
// require("dotenv").config();

// // Import the Twitter NPM package.
// var Twitter = require("twitter");

// // Import the node-spotify-api NPM package.
// var Spotify = require("node-spotify-api");

// // Import the API keys
// var keys = require("./keys");

// // Import the request npm package.
// var request = require("request");

// // Import the FS package for read/write.
// var fs = require("fs");

// // Initialize the spotify API client using our client id and secret
// var spotify = new Spotify(keys.spotify);

// // FUNCTIONS
// // =====================================

// // Writes to the log.txt file
// var getArtistNames = function(artist) {
//   return artist.name;
// };

// // Function for running a Spotify search
// var getMeSpotify = function(songName) {
//   if (songName === undefined) {
//     songName = "What's my age again";
//   }

//   spotify.search(
//     {
//       type: "track",
//       query: songName
//     },
//     function(err, data) {
//       if (err) {
//         console.log("Error occurred: " + err);
//         return;
//       }

//       var songs = data.tracks.items;

//       for (var i = 0; i < songs.length; i++) {
//         console.log(i);
//         console.log("artist(s): " + songs[i].artists.map(getArtistNames));
//         console.log("song name: " + songs[i].name);
//         console.log("preview song: " + songs[i].preview_url);
//         console.log("album: " + songs[i].album.name);
//         console.log("-----------------------------------");
//       }
//     }
//   );
// };

// // Function for running a Twitter Search
// var getMyTweets = function() {
//   var client = new Twitter(keys.twitter);

//   var params = {
//     screen_name: "cnn"
//   };
//   client.get("statuses/user_timeline", params, function(error, tweets, response) {
//     if (!error) {
//       for (var i = 0; i < tweets.length; i++) {
//         console.log(tweets[i].created_at);
//         console.log("");
//         console.log(tweets[i].text);
//       }
//     }
//   });
// };

// // Function for running a Movie Search
// var getMeMovie = function(movieName) {
//   if (movieName === undefined) {
//     movieName = "Mr Nobody";
//   }

//   var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

//   request(urlHit, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var jsonData = JSON.parse(body);

//       console.log("Title: " + jsonData.Title);
//       console.log("Year: " + jsonData.Year);
//       console.log("Rated: " + jsonData.Rated);
//       console.log("IMDB Rating: " + jsonData.imdbRating);
//       console.log("Country: " + jsonData.Country);
//       console.log("Language: " + jsonData.Language);
//       console.log("Plot: " + jsonData.Plot);
//       console.log("Actors: " + jsonData.Actors);
//       console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
//     }
//   });
// };

// // Function for running a command based on text file
// var doWhatItSays = function() {
//   fs.readFile("random.txt", "utf8", function(error, data) {
//     console.log(data);

//     var dataArr = data.split(",");

//     if (dataArr.length === 2) {
//       pick(dataArr[0], dataArr[1]);
//     }
//     else if (dataArr.length === 1) {
//       pick(dataArr[0]);
//     }
//   });
// };

// // Function for determining which command is executed
// var pick = function(caseData, functionData) {
//   switch (caseData) {
//   case "my-tweets":
//     getMyTweets();
//     break;
//   case "spotify-this-song":
//     getMeSpotify(functionData);
//     break;
//   case "movie-this":
//     getMeMovie(functionData);
//     break;
//   case "do-what-it-says":
//     doWhatItSays();
//     break;
//   default:
//     console.log("LIRI doesn't know that");
//   }
// };

// // Function which takes in command line arguments and executes correct function accordingly
// var runThis = function(argOne, argTwo) {
//   pick(argOne, argTwo);
// };

// // MAIN PROCESS
// // =====================================
// runThis(process.argv[2], process.argv[3]);  var keys = require("./keys.js");

