var originalHeight = document.getElementById("titleDiv").clientHeight

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
    }}
];


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


document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        document.body.scrollTop = 0;
    }, 100);
    if (document.body.scrollTop == 0) {
        resetAllPoints();
    }
}, false);

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


var onscrollchange = function(){
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
                timelineInterval = setInterval(() => changeSelected(), 5000);
            }
        }
    }else{
        
        clearInterval(timelineInterval);
        timelineInterval = undefined;
    }
    /*zgo*/ 

    console.log(currentPage, "finished scrolling");
}

