require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var axios = require("axios")
var fs = require("fs")

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});