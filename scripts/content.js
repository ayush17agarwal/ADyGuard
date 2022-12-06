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

//not running to preserve credits we have use below code
data ={ads :
    [
    {link : "https://www.target.com/p/lego-star-wars-imperial-light-cruiser-75315-building-kit/-/A-82133834?ref=tgt_adv_XS000000&AFID=google_pla_df_free_local&CPNG=Toys&adgroup=204-0", title : "LEGO Star Wars Imperial Light Cruiser 75315 Building Kit"},
    {link : "https://www.amazon.com/66596-Battle-Troopers-Imperial-Patrol/dp/B07HDZG32D?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ASDO1M0O64OFA", title : "LEGO Star Wars 66596 Super Battle Pack 2 In 1 Includes 75206 Jedi & Clone Troopers & 75207 Imperial Patrol Pack, 1.54 Lb"},
    {link : "https://www.amazon.com/LEGO-Star-Wars-Millennium-Minifigures/dp/B07QQ396NH?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ATVPDKIKX0DER", title : "LEGO Star Wars Millennium Falcon 75257 Building Toy Set for Kids, Boys, and Girls Ages 9+ (1353 Pieces)"}

]};

console.log(data);
parse_response(data);
render();
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