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
      // Is this what they mean by location??
    console.log(`Date of Concert: ${res.data[0].datetime}`)
      // How do i implement moment.js here??
  })
} 
