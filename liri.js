require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var axios = require("axios")
var fs = require("fs")

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});


var command = process.argv[2];


if (command === "concert-this") {
  const artist = process.argv.splice(3, process.argv.length).join(" ")

  console.log(`\nArtist Search: ${artist}`)
  console.log(`run the concert search for ${artist}\n`)

  var query = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  axios.get(query).then(res => {
    console.log(`Venue: ${res.data[0].venue.name}`)
    console.log(`Venue Location: ${res.data[0].venue.city}`)
    console.log(`Date of Concert: ${res.data[0].datetime}`)
    // How do i implement moment.js here??
  })
} else if (command === "spotify-this") {
  let song = process.argv.splice(3, process.argv.length).join(" ")

  console.log(`\nSong Search: ${song}`)
  console.log(`run the spotify search for ${song}\n`)

  // Is this how I would set a default?? It works but is there a better way?
  if (song === "") {
    song = "The Sign Ace of Base"
  }

  spotify.search({
    type: "track",
    query: song
  }, function (err, data) {
    if (err) {
      return console.log(`Error occurred: ${err}`)
    }
    console.log(`Artist: ${data.tracks.items[0].artists[0].name}`)
    console.log(`Song Title: ${data.tracks.items[0].name}`)
    console.log(`Preview Link: ${data.tracks.items[0].preview_url}`)
    console.log(`Album Name: ${data.tracks.items[0].album.name}`)
  });
} else if (command === "movie-this") {
  let movie = process.argv.splice(3, process.argv.length).join(" ")

  console.log(`\nMovie Search: ${movie}`)
  console.log(`run the movie search for ${movie}\n`)

  // Is this how I would set a default?? It works but is there a better way?
  if (movie === "") {
    movie = "Mr. Nobody"
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function (response) {
      console.log(`Title: ${response.data.Title}`)
      console.log(`Release Year: ${response.data.Year}`)
      console.log(`IMDB Rating: ${response.data.imdbRating}`)
      console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`)
      console.log(`Country of Production: ${response.data.Country}`)
      console.log(`Language: ${response.data.Language}`)
      console.log(`Plot: ${response.data.Plot}`)
      console.log(`Main Actors: ${response.data.Actors}`)
    }
  );
} else if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (err, data) {
    var newData = data.split(",");
    console.log(newData)

    if (newData[0] === "concert-this") {
      const artist = process.argv.splice(3, process.argv.length).join(" ")

      console.log(`\nArtist Search: ${artist}`)
      console.log(`run the concert search for ${artist}\n`)

      var query = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

      axios.get(query).then(res => {
        console.log(`Venue: ${res.data[0].venue.name}`)
        console.log(`Venue Location: ${res.data[0].venue.city}`)
        console.log(`Date of Concert: ${res.data[0].datetime}`)
        // How do i implement moment.js here??
      })
    } else if (newData[0] === "spotify-this") {
      let song = process.argv.splice(3, process.argv.length).join(" ")

      console.log(`\nSong Search: ${song}`)
      console.log(`run the spotify search for ${song}\n`)

      // Is this how I would set a default?? It works but is there a better way?
      if (song === "") {
        song = "The Sign Ace of Base"
      }

      spotify.search({
        type: "track",
        query: song
      }, function (err, data) {
        if (err) {
          return console.log(`Error occurred: ${err}`)
        }
        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`)
        console.log(`Song Title: ${data.tracks.items[0].name}`)
        console.log(`Preview Link: ${data.tracks.items[0].preview_url}`)
        console.log(`Album Name: ${data.tracks.items[0].album.name}`)
      });
    } else if (newData[0] === "movie-this") {
      let movie = process.argv.splice(3, process.argv.length).join(" ")

      console.log(`\nMovie Search: ${movie}`)
      console.log(`run the movie search for ${movie}\n`)

      // Is this how I would set a default?? It works but is there a better way?
      if (movie === "") {
        movie = "Mr. Nobody"
      }

      var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

      axios.get(queryUrl).then(
        function (response) {
          console.log(`Title: ${response.data.Title}`)
          console.log(`Release Year: ${response.data.Year}`)
          console.log(`IMDB Rating: ${response.data.imdbRating}`)
          console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`)
          console.log(`Country of Production: ${response.data.Country}`)
          console.log(`Language: ${response.data.Language}`)
          console.log(`Plot: ${response.data.Plot}`)
          console.log(`Main Actors: ${response.data.Actors}`)
        }
      );
    }

  })
}