var originalHeight;
var snapPoints = [
    { sc:0, id: "titleDiv" },
    { id: "opis_splitter" },
    { id: "zgo_splitter", data:{
        zgo:[
            { x:860, text: "Norsemen discover Iceland." },
            { x:999, text: "Christianity adopted in Iceland." },
            { x:1000, text: "Leifur Eiríksson discovers what is now known as North America." },
            { x:1120, text: "Most of the Icelandic Sagas—tales of family feuds and heroics—are written." },
            { x:1402, text: "The Black Plague infects Iceland. Over 33% of the population is wiped out." },
            { x:1584, text: "The Bible is translated into Icelandic." },
            { x:1707, text: "Bubonic plague; one third of the population dies." },
            { x:1783, text: "Volcanic activity destroys Icelandic farmland and leads to widespread starvation." },
            { x:1915, text: "Women receive the vote." },
            { x:1940, text: "Iceland is occupied by British troops." },
            { x:1941, text: "US-Icelandic defence agreement signed; US troops stay in Iceland for duration of WWII." },
            { x:1944, text: "The Republic of Iceland is formally established." },
            { x:1949, text: "Iceland becomes a founding member of NATO." },
            { x:1958, text: "Dispute over fishing limits, first ‘cod war’ with Britain." },
            { x:1970, text: "Two further ‘cod wars’ with Britain (and West Germany)." },
            { x:1980, text: "Vigdís Finnbogadóttir elected president, the first democratically-elected female head of state." },
            { x:1994, text: "Iceland joins the European Economic Area, an economic arrangement with the EU." },
            { x:2008, text: "Economic crisis, near total collapse of Iceland’s banking system." },
            { x:2010, text: "Volcanic Eruption at the Eyjafjallajökull. This same year Jón Gnarr, a known actor and comedian in Iceland, became mayor of Reykjavik (2010-2014)." },
            { x:2015, text: "Residents in Iceland number 329.100. Icelandic citizens 296,700." }
        ]
    }},
    { id: "atr_splitter"}
];
//api_key = AIzaSyC3FOUHZgVAGK9QnL2RLq1oStFU8xcjU44

var currentPage = 0;
var endOfMainScreen = 0;

var scrolling = false;

function resetAllPoints(){
    endOfMainScreen = document.getElementById(snapPoints[1].id).offsetTop;
    endOfMainScreen /= 2;//main is shrinking 2x speed bcz parallax

    snapPoints.forEach(function(element,i){
        snapPoints[i].sc = document.getElementById(element.id).offsetTop;
        if(i != 0){
            snapPoints[i].sc -= endOfMainScreen-10;
        }
    });
}

loadAttractions();

/*document.addEventListener('DOMContentLoaded', function () {
    
}, false);*/

window.onwheel = function(event){
    if (!scrolling) {
        if (event.deltaY > 0){
            currentPage++;
        }else{
            currentPage--;
        }

        if (currentPage < snapPoints.length && currentPage >= 0){
                scrollToPoint(snapPoints[currentPage].sc);
        } else if (currentPage < 0){
            currentPage = 0;
        }else{
            currentPage = snapPoints.length-1;
        }
    }
    event.preventDefault();
}


var timeout = null
window.onscroll = function(event){
    scrolling = true;

    if (document.body.scrollTop == 0) {
        resetAllPoints();
    }

    if(timeout != null){
        clearTimeout(timeout);
    }

    if (document.body.scrollTop < endOfMainScreen){//parallax main
        document.getElementById("titleDiv").style.height = originalHeight - document.body.scrollTop + "px";
        document.getElementById("sky").style = "transform:translate(0,-" + document.body.scrollTop/3 + "px);";
    }

    timeout = setTimeout(()=>{//on scrolling stopped
        scrolling = false;
        console.log("stopped");
        onscrollchange();
    },100)
}

var scrollToPoint = function (amount){
    window.scrollTo({
        top: amount,
        left: 0,
        behavior: 'smooth'
    });
}

var timelineloaded = false;

var timelineInterval;

window.onload = function(){
    document.getElementById("main-content").style.display = "initial";
    //document.getElementById("loading-screen").style.display = "none";
    document.getElementById("loading-screen").className += " loading-screen-iv";
    setTimeout(function(){
        document.getElementById("loading-screen").style.display = "none";
    },1000);

    originalHeight = document.getElementById("titleDiv").clientHeight;


    console.log("finished loading");
    
    setTimeout(() => {
        document.body.scrollTop = 0;
    }, 100);
    if (document.body.scrollTop == 0) {
        resetAllPoints();
    }
}


var onscrollchange = function(){

    if (!scrolling){
        let min = Math.abs(document.body.scrollTop - snapPoints[0].sc);
        let indexmin = 0;
        snapPoints.forEach(function(element,i){
            if (Math.abs(document.body.scrollTop - element.sc) < min){
                min = Math.abs(document.body.scrollTop - element.sc);
                indexmin = i;
            }
        });
        currentPage = indexmin;
    }

    /*opis*/
    if (currentPage >= 1){
        document.getElementById("satellite").style.marginLeft = "0px";
    }else{
        document.getElementById("satellite").style.transitionProperty = "none";
        document.getElementById("satellite").style.marginLeft = "100%";
        setTimeout(function(){
            document.getElementById("satellite").style.transitionProperty = "margin";
        }, 100);
    }
    /*opis*/

    /*zgo*/
    var selected = 0;

    function transitionImage(){
        document.getElementById("zgo_tl_img").id = "zgo_tl_img_prev";
        document.getElementById("zgo-img-container").innerHTML += '<div id="zgo_tl_img" style="position:absolute;top:0;left:-100%;overflow:hidden; height:' + document.getElementById("zgo_tl_img_prev").offsetHeight + 'px;width:' + document.getElementById("zgo-img-container").offsetWidth + 'px; transition-duration:1s"><!-- crop div --><img style="" src="' + "public/images/zgo/" + snapPoints[2].data.zgo[selected].x + ".jpg" + '"></div>';
        setTimeout(()=>{
            document.getElementById("zgo_tl_img").style.left = 0;
            setTimeout(() => {
                document.getElementById("zgo-img-container").removeChild(document.getElementById("zgo_tl_img_prev"));
            }, 1100);
        }, 100);


    }

    function refreshText(){
        document.getElementById("zgo_tl_text").innerText = snapPoints[2].data.zgo[selected].text;
    }

    function changeIndicator(element){
        document.getElementById("tl_yearIndicator").innerText = element.x;
        document.getElementById('zgo_point_' + element.x).className += " tl_point_selected";
        document.getElementById("tl_yearIndicator").style.top = (document.getElementById('zgo_point_' + element.x).getBoundingClientRect().top - 100 - 44) + 'px';
        document.getElementById("tl_yearIndicator").style.left = (document.getElementById('zgo_point_' + element.x).getBoundingClientRect().left - document.getElementById("tl_yearIndicator").offsetWidth / 2 + 5) + 'px'
    }

    function loadTimeline(){
        let maxWidth = document.getElementById("zgo_tl").offsetWidth;

        snapPoints[2].data.zgo.forEach(function (element, i) {
            document.getElementById("zgo_tl").innerHTML += '<div id="zgo_point_' + element.x + '" class="tl_point"></div>';
            if (selected == i){
                changeIndicator(element);
            }

            setTimeout(function () {
                document.getElementById('zgo_point_' + element.x).style.left = ((element.x - snapPoints[2].data.zgo[0].x) / (snapPoints[2].data.zgo[snapPoints[2].data.zgo.length - 1].x - snapPoints[2].data.zgo[0].x)) * maxWidth + 'px';
            }, 100);
        });
        refreshText();
    }

    function refreshSelected(){
        snapPoints[2].data.zgo.forEach(function (element, i) {
            document.getElementById('zgo_point_' + element.x).className = 'tl_point';
            if (selected == i) {
                changeIndicator(element);
            }
        });
        refreshText();
        transitionImage();
    }

    function changeSelected(){
        selected = (selected + 1) % (snapPoints[2].data.zgo.length - 1);
        refreshSelected();
    }

    console.log(timelineInterval);

    if (currentPage == 2) {
        if (!timelineloaded){
            window.onresize = loadTimeline;
            loadTimeline();
            if (!timelineInterval){
                console.log("interval attached");
                timelineInterval = setInterval(() => changeSelected(), 3000);
            }
        }
    }else{
        
        clearInterval(timelineInterval);
        timelineInterval = undefined;
    }
    /*zgo*/ 

    /*atr*/
    var initialMousePos;
    var initialScrollPos;
    function handlescroll(evt){
        initialMousePos = evt.clientX;
        initialScrollPos = document.getElementById("results_container").scrollLeft;
        document.getElementById("results_container").addEventListener('mousemove', moveScroll);
    }

    function moveScroll(evt){
        document.getElementById("results_container").scrollLeft = (initialScrollPos + (initialMousePos - evt.clientX));
    }

    function removeMoveScroll(){
        document.getElementById("results_container").removeEventListener('mousemove', moveScroll);
    }

    if(currentPage== 3){
        document.getElementById("results_container").addEventListener('mousedown', handlescroll);
        document.getElementById("results_container").addEventListener('mouseup', removeMoveScroll);
    }else{
        document.getElementById("results_container").removeEventListener('mousedown', handlescroll);
        document.getElementById("results_container").removeEventListener('mousemove', moveScroll);
    }

    /*atr*/

    console.log(currentPage, "finished scrolling");
}

function loadAttractions() {
    var iceland = new google.maps.LatLng(64.796776, -23.7276555);
    var request = {
        location: iceland,
        query: 'iceland attractions',
        radius: '10000'
    };
    var service = new google.maps.places.PlacesService(document.getElementById("results"));
    service.textSearch(request, function (results, status) {
        console.log(results);
        results.sort(function (a, b) {
            return b.rating - a.rating;
        });
        for (let i in results) {
            console.log(results[i]);

            var requestDetail = {
                placeId: results[i].place_id
            };

            //console.log(results[i].name, results[i].rating, results[i].photos[0].getUrl());
            document.getElementById("results").innerHTML +=
                `<div class="attraction">
                    <div class="left-container left-right-img">
                        <div class="atr_thumbnail">
                            <a id="${results[i].place_id}_img" href=""><img src="${results[i].photos[0].getUrl()}"></a>
                        </div>
                    </div>
                    <div class="right-container left-right-content" style="height:100%; overflow-y:auto">
                        <div class="sub-title">
                            <h1>${results[i].name}</h1>
                        </div>
                        <hr>
                        <div class="sub-content" style="padding:10px">
                            <div>
                                <div class="rating">
                                    <div class="fa stars-outer">
                                        <div class="fa stars-inner" style="width:${results[i].rating * 20}%">
                                        </div>
                                    </div>
                                    <span>${results[i].rating}</span>
                                </div>
                                <p>reviews:</p>
                                <div id="google_reviews_${results[i].place_id}" class="reviews">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

            service.getDetails(requestDetail, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log("request details:", place);

                    document.getElementById(`${results[i].place_id}_img`).href = place.url;

                    for (let reviewI in place.reviews) {
                        document.getElementById('google_reviews_' + results[i].place_id).innerHTML +=

                            `<div class="review">
                                <p class="timestamp">${place.reviews[reviewI].author_name} - ${place.reviews[reviewI].relative_time_description}</p>

                                <div class="fa stars-outer">
                                    <div class="fa stars-inner-review" style="width:${place.reviews[reviewI].rating*20}%;">
                                    </div>
                                </div>
                                ${place.reviews[reviewI].rating}

                                <p>${place.reviews[reviewI].text}</p>
                            </div>`;
                    }

                }
            });
        }
    });


    /*fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=iceland%20point%20of%20interest&language=en&radius=2000&key=AIzaSyC3FOUHZgVAGK9QnL2RLq1oStFU8xcjU44")
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })*/
}

