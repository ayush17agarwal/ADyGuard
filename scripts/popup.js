var http = require("https");
var {Search} = require('./content.js');
var {EndpointException}= require('./exceptions.js');


function isAvailableEngine(engine) {
    // generated from https://docs.webscrapingapi.com/google-search-api/google-search-engines
    const available_engines = [
        "google",
        "google_maps",
        "google_maps_reviews",
        "google_autocomplete",
        "google_scholar",
        "google_scholar_profiles",
        "google_scholar_author",
        "google_scholar_cite",
        "google_product",
        "google_reverse_image",
        "google_jobs",
        "google_jobs_listing",
        "google_events",
        "google_play",
        "google_trends"
    ];

    return available_engines.includes(engine);
};

function create_endpoint(engine, API_KEY) {
    var endpoint = "https://serpapi.webscrapingapi.com/v1";
    if (isAvailableEngine(engine)) {
        endpoint += "?api_key=" + API_KEY + "&engine=" + engine;
        return endpoint;
    } else {
        throw EndpointException("Invalid endpoint. Please contact admin");
    }

};

function isUseful() {
    window.alert("Useful Ad!");
}

function isUseless() {
    window.alert("Useless Ad!");
}

const endpoint = create_endpoint("google", process.env.API_KEY);
var split_endpoint = endpoint.split("/");
var hostname = split_endpoint[2];
var path = split_endpoint[3] + "&q=" + Search.value;

const options = {
    "method": "GET",
    "hostname": hostname,
    "port": null,
    "path": path,
    "headers": {}
  };

//https://docs.webscrapingapi.com/google-search-api/google-search-engines/google-search-api
const req = http.request(options, function (res) {
    const chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });