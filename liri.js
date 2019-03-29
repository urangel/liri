require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var moment = require("./node_modules/moment")

var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

function spotifyThis() {
  var query = "";
  if (process.argv[3]){
    query =  process.argv.slice(3).join(" ");
  }
  else {
    query = "All the Small Things";
    console.log("We'll search for All the Small Things since you didn't specify" + "\r\n" +
    "Try writing the following to learn how the program works: "+ "\r\n" + 
    "node liri.js" + "\r\n");
  }
 
  spotify.search({ type: 'track', query: query, limit: 10 })
  .then(function(data){
      for ( let i = 9 ; i > -1 ; i--){
        console.log("Entry #: " + (i+1) + "\r\n" + 
        "---------------------------------------" + "\r\n" +
        "Song name: " + JSON.stringify(data.tracks.items[i].name, null, 2) + "\r\n"+ 
        "Album name: " + JSON.stringify(data.tracks.items[i].album.name, null, 2) + "\r\n"+ 
        "Artist name: " + JSON.stringify(data.tracks.items[i].album.artists[0].name, null, 2) + "\r\n"+ 
        "Spotify link: " + JSON.stringify(data.tracks.items[i].external_urls.spotify, null, 2) + "\r\n" + 
        "---------------------------------------" + "\r\n"); 
    }
    });
}

function concertThis() {
  var artist = ""

  if (process.argv[3]){
    artist = process.argv.slice(3).join(" ");
  }
  else {
    console.log("We'll search for Muse since you didn't specify" + "\r\n" +
    "Try writing the following to learn how the program works: "+ "\r\n" + 
    "node liri.js" + "\r\n")
    artist = "muse";
  }

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function (response) {
    for ( let i = 9 ; i > -1; i --){
      console.log(
        "Entry #: " + (i+1) + "\r\n" + 
        "*******************************************" + "\r\n" +
        "Venue: " + response.data[i].venue.name + "\r\n"+ 
        "Location: " + response.data[i].venue.city +", " + response.data[i].venue.region + ", " + response.data[i].venue.country + "\r\n" + 
        "Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY")+ "\r\n" + 
        "*******************************************" + '\r\n')
    }
  })
}

function movieThis() {
  var movie = "";

  if (process.argv[3]){
    movie = process.argv.slice(3).join("+");
  }
  else {
    console.log("We'll search for Mr. Nobody since you didn't specify" + "\r\n" +
    "Try writing the following to learn how the program works: "+ "\r\n" + 
    "node liri.js" + "\r\n")
    movie = "Mr.+Nobody";
  }

  axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
  .then(function (response) {
    console.log(
    "############################################" + "\r\n" +
    "Title: " + response.data.Title + "\r\n" +
    "Year: " + response.data.Year + "\r\n" + 
    "IMBD Rating: " + response.data.Ratings[0].Value + "\r\n" + 
    "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n" + 
    "Country: " + response.data.Country + "\r\n" + 
    "Language: " + response.data.Language + "\r\n" + 
    "Plot: " + response.data.Plot + "\r\n" + 
    "Actors: " + response.data.Actors + "\r\n" + 
    "############################################" + "\r\n")
  })
}

if (!process.argv[2]){
  console.log(
`
This program has three functions:

It can retrieve upcoming shows for a specified artist with the concert-this command like this:
node liri.js concert-this BANDNAME
where BANDNAME is the band you want to search for.

It can show you a list of relevant songs from spotify and give you a link to listen to it like this:
node liri.js spotify-this-song SONGNAME
where SONGNAME is the song you want to search for.

It can give you movie information for a specified movie like this:
node liri.js movie-this MOVIENAME
where MOVIENAME is the movie you want to search for. 

Lastly, the do-what-it-says function allows you to run a command that the random.txt file specifies.
random.txt must contain the first command (either of the three specified above) and the query delimited by a comma.

Have fun with liri! :D
`
  )
}

else if (process.argv[2] === "concert-this"){
   concertThis();
} 

else if (process.argv[2] === "spotify-this-song"){
  spotifyThis();
}

else if (process.argv[2] === "movie-this"){
  movieThis();
}

else if (process.argv[2] === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data) {

      if (error) {
        return console.log(error);
      }
    
      var dataArr = data.split(",");
      
      // var command = dataArr[0].slice(2, dataArr[0].length);
      // var query = dataArr[1].slice(1, dataArr[1].length-1);

      var command = dataArr[0];
      var query = dataArr[1];

      process.argv[2] = command;
      process.argv.push(query);
      
      if (process.argv[2] === "concert-this"){
        concertThis();
      }
      else if (process.argv[2] === "spotify-this-song"){
        spotifyThis();
      }
      else if (process.argv[2] === "movie-this"){
        movieThis();
      }
    });
}