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


var API_KEY = "TyivXDz4fLTaoWkhUZtMleekhBeJTzQo";
const endpoint = create_endpoint("google", API_KEY);

//gets the search value for any google search when extension is enabled
var search_value = document.getElementsByClassName("gLFyf").q.value 


var Search = {
    value : search_value
};

console.log(endpoint);

const options = {
    "method": "GET",
    "headers": {}
  };

localStorage.setItem("popup_ads", JSON.stringify([]));
localStorage.setItem("report_ads", JSON.stringify([]));
//not running to preserve credits we have

// fetch(endpoint + "&q=" + Search.value, options)
//     .then(res => {
//         if(!res.ok) {
//             throw HTTPException(`HTTP error! Status: ${res.status}`);
//         }

//         return res.json();
//     })
//     .then(result => {
//         console.log(result);
//         parse_response(result);
//     })
//     .then(renderAds());