var popup_ads = []
var report_ads = []

function isSameAd(ad1, ad2) {
    return ad1.name === ad2.name;
}


function parse_response(response) {
    var ads = response.ads;

    for(const ad of ads) {
        var Ad = {
            name: ad.title.trim(),
            link: ad.link,
            isUseful: null
        }; //Ad object

        //ignore duplicates, store only unique ads
        var exists_flag = false;

        for(const popup of popup_ads) {
            if (isSameAd(popup, ad)) {
                exists_flag = true;
            }
        }

        if(!exists_flag) {
            popup_ads.push(Ad);
        }
    }

    console.log(popup_ads); //debugging
}

function isUseful(ad_title) {
    window.alert("Useful Ad!"); //debugging
    //find index of the ad
    let index = 0;
    for(; index < popup_ads.length; index++) {
        if (ad_title == popup_ads[index].name) {
            break;
        }
    }
    var ad = popup_ads.splice(index, 1); //removes the one ad from popup_ads
    ad[0].isUseful = true; //ad has 1 element so set its isUseful value to true
    
    report_ads.concat(ad); //move ad from popup_ads to report_ads
    browser.runtime.reload();
}

function isUseless(ad_title) {
    window.alert("Useless Ad!"); //debugging
    //find index of the ad
    let index = 0;
    for(; index < popup_ads.length; index++) {
        if (ad_title == popup_ads[index].name) {
            break;
        }
    }
    var ad = popup_ads.splice(index, 1); //removes the one ad from popup_ads
    ad[0].isUseful = false; //ad has 1 element so set its isUseful value to true
    
    report_ads.concat(ad); //move ad from popup_ads to report_ads
    browser.runtime.reload();
}

// function renderAds() {
//     //attempt to display popup_ads in the popup for the extension
//     const template = document.getElementById("li_template");
//     const elements = new Set();

//     for(const ad of popup_ads) {
//         console.log(ad.name);
//         const element = template.content.firstElementChild.cloneNode(true);

//         const title = ad.name;
//         const link = new URL(ad.link);

//         element.querySelector('.ad').textContent = title;
//         element.querySelector('.ad').href = link;
//         const useful_button = element.querySelector('.useful');
//         const useless_button = element.querySelector('.useless');

//         useful_button.addEventListener("click", isUseful(title));
//         useless_button.addEventListener("click", isUseless(title));

//         elements.add(element);
//     }

//     document.querySelector('ul').append(...elements);
// }


function render() {
    const ul = document.querySelector(".ads");
    ul.innerHTML = "";
    var adsHTML = "";

    try {

        for (const ad of popup_ads) {
            adsHTML += 
            `<li>
                <a href="${ad.link}" class="ad">${ad.name}</a>
                <div>
                    <button class="useful" onclick="isUseful('${ad.name}')">good</button>
                    <button class="useless" onclick="isUseless('${ad.name}')">bad</button>
                </div>
            </li>`
        }

        ul.innerHTML = adsHTML;

        // var adsInnerHTML = document.querySelectorAll("ul li");
        // for (const ad of adsInnerHTML) {
        //     ad.querySelector(".useful").addEventListener("click", isUseful(ad.name));
        //     ad.querySelector(".useless").addEventListener("click", isUseless(ad.name));
        // }
    }
    catch(e) {
        //somethign idk what LOL
    }
}
function renderReport() {
    const ul = document.querySelector(".report");
    ul.innerHTML = "";
    var reportHTML = "";

    try {
        for (const ad of popup_ads) {
            reportHTML +=
            `<li>
                <a href="${ad.link}" class="ad">${ad.name}</a>
            </li>`
        }
        ul.innerHTML = reportHTML;
    }
    catch(e) {

    }
}


data = {ads :
    [
    {link : "https://www.target.com/p/lego-star-wars-imperial-light-cruiser-75315-building-kit/-/A-82133834?ref=tgt_adv_XS000000&AFID=google_pla_df_free_local&CPNG=Toys&adgroup=204-0", title : "LEGO Star Wars Imperial Light Cruiser 75315 Building Kit"},
    {link : "https://www.amazon.com/66596-Battle-Troopers-Imperial-Patrol/dp/B07HDZG32D?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ASDO1M0O64OFA", title : "LEGO Star Wars 66596 Super Battle Pack 2 In 1 Includes 75206 Jedi & Clone Troopers & 75207 Imperial Patrol Pack, 1.54 Lb"},
    {link : "https://www.amazon.com/LEGO-Star-Wars-Millennium-Minifigures/dp/B07QQ396NH?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ATVPDKIKX0DER", title : "LEGO Star Wars Millennium Falcon 75257 Building Toy Set for Kids, Boys, and Girls Ages 9+ (1353 Pieces)"}

]};

console.log(data);
parse_response(data);
render();
renderReport();