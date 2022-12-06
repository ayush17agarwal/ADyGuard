var popup_ads = []
var report_ads = []

function isSameAd(ad1, ad2) {
    return ad1.name === ad2.name;
}


function parse_response(response) {
    const ads = response.ads;

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


//attempt to display popup_ads in the popup for the extension
const template = document.getElementById("li_template");
const elements = new Set();

for(const ad of popup_ads) {
    console.log(ad.name);
    const element = template.content.firstElementChild.cloneNode(true);

    const title = ad.name;
    const link = new URL(ad.link);

    element.querySelector('.ad').textContent = title;
    element.querySelector('.ad').href = link;
    const useful_button = element.querySelector('.useful');
    const useless_button = element.querySelector('.useless');

    useful_button.addEventListener("click", isUseful(title));
    useless_button.addEventListener("click", isUseless(title));

    elements.add(element);
}

document.querySelector('ul').append(...elements);

