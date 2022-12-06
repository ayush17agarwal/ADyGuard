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

function isUseful(e) {
    const ad_title = e.target.value;
    window.alert("Useless Ad!" + ad_title); //debugging
    //find index of the ad
    let index = 0;
    for(; index < popup_ads.length; index++) {
        if (ad_title == popup_ads[index].name) {
            break;
        }
    }
    var ad = popup_ads.splice(index, 1); //removes the one ad from popup_ads
    ad[0].isUseful = true; //ad has 1 element so set its isUseful value to true
    
    report_ads.push(ad[0]); //move ad from popup_ads to report_ads
    console.log(report_ads);
}

function isUseless(e) {
    const ad_title = e.target.value;
    window.alert("Useless Ad!" + ad_title); //debugging
    //find index of the ad
    let index = 0;
    for(; index < popup_ads.length; index++) {
        if (ad_title == popup_ads[index].name) {
            break;
        }
    }
    var ad = popup_ads.splice(index, 1); //removes the one ad from popup_ads
    ad[0].isUseful = false; //ad has 1 element so set its isUseful value to false
    
    report_ads.push(ad[0]); //move ad from popup_ads to report_ads
    console.log(report_ads);
}


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
                    <button class="useful" value="${ad.name}">good</button>
                    <button class="useless" value="${ad.name}">bad</button>
                </div>
            </li>`
        }

        ul.innerHTML = adsHTML;
    }
    catch(e) {
        //something idk what LOL
    }
}

function renderBtnActions() {
    var useful_btns = document.querySelectorAll('.useful');
    var useless_btns = document.querySelectorAll('.useless');
    
    for(const btn of useful_btns) {
        btn.addEventListener("click", isUseful);
    }
    
    for(const btn of useless_btns) {
        btn.addEventListener("click", isUseless);
    }
    
}

data = {ads :
    [
    {link : "https://www.target.com/p/lego-star-wars-imperial-light-cruiser-75315-building-kit/-/A-82133834?ref=tgt_adv_XS000000&AFID=google_pla_df_free_local&CPNG=Toys&adgroup=204-0", title : "LEGO Star Wars Imperial Light Cruiser 75315 Building Kit"},
    {link : "https://www.amazon.com/66596-Battle-Troopers-Imperial-Patrol/dp/B07HDZG32D?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ASDO1M0O64OFA", title : "LEGO Star Wars 66596 Super Battle Pack 2 In 1 Includes 75206 Jedi & Clone Troopers & 75207 Imperial Patrol Pack, 1.54 Lb"},
    {link : "https://www.amazon.com/LEGO-Star-Wars-Millennium-Minifigures/dp/B07QQ396NH?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ATVPDKIKX0DER", title : "LEGO Star Wars Millennium Falcon 75257 Building Toy Set for Kids, Boys, and Girls Ages 9+ (1353 Pieces)"},
    {link : "https://www.adidas.com/us/hoops-3.0-vintage-shoes-mid/GV6683.html?af_channel=Search&af_click_lookback=30d&af_reengagement_window=30d&c=PLA&cm_mmc=AdieSEM_Feeds-_-GoogleProductAds-_-NA-_-GV6683&cm_mmca1=US&cm_mmca2=NA&dfw_tracker=24819-GV6683-0009&gclid=Cj0KCQiAyracBhDoARIsACGFcS5LorvQUnNYb0HXB-HUjqc3KmT3nxk1UX1IVf88rNlxWdNLnZyAX-AaAjnHEALw_wcB&gclsrc=aw.ds&is_retargeting=true&kpid=GV6683&pid=googleadwords_temp&sourceid=543457011GV6683", title : "adidas Hoops 3.0 Vintage Shoes Mid Black 10.5 - Mens Originals Shoes"},
    {link : "https://www.dickssportinggoods.com/p/nike-lebron-19-low-basketball-shoes-22nikalbrn19lwlstmnk/22nikalbrn19lwlstmnk?sku=23007712&camp=CSE:DSG_92700072992198840_pla_aud-563275157883:pla-1746818479380_58700008024023774_71700000100252985&segment=&gclid=Cj0KCQiAyracBhDoARIsACGFcS5tvmUzPn4bsjU9FCKov5Y4BbBDXWwpa7APCQ0dPaLDJ5mJKNOz6yIaAmkoEALw_wcB&gclsrc=aw.ds", title : "Nike LeBron 19 Low Basketball Shoes, Men's, M11/W12.5, Purple/Pink"},
    {link : "https://www.nike.com/t/flyby-mid-3-basketball-shoes-sNRbLR/DD9311-101?nikemt=true&cp=34492719349_search_%7CPRODUCT_GROUP%7CGOOGLE%7C71700000088292143%7CAll_X_X_X_X-Device_X_Nike-Clearance_X_SSC%7C%7Cc&gclsrc=aw.ds&&gclid=Cj0KCQiAyracBhDoARIsACGFcS6K3TA4xP31UoosP8Wm0DJjZ9_iX48mzi_7ALJLrmGteMZpr5wOk8EaAh1nEALw_wcB&gclsrc=aw.ds", title : "Nike Men's Fly.By Mid 3 Basketball Shoes in White, Size: 11 | DD9311-101"}
]};

parse_response(data);
render();
renderBtnActions();

