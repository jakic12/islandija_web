var originalHeight = document.getElementById("titleDiv").clientHeight

var snapPoints = [
    { sc:0, id: "titleDiv" },
    { id: "opis_splitter" },
    { id: "zgo_splitter", data:{
        zgo:[
            { x:860, text: "Norsemen discover Iceland." },
            { x:930, text: "The Althing, a judiciary and law-making body of chieftains, convenes for the first time at Thingvellir. Population in Iceland estimated at 30,000–40,000." },
            { x:999, text: "Christianity adopted in Iceland." },
            { x:1000, text: "Leifur Eiríksson discovers what is now known as North America." },
            { x:1120, text: "Most of the Icelandic Sagas—tales of family feuds and heroics—are written." },
            { x:1402, text: "The Black Plague infects Iceland. Over 33% of the population is wiped out." },
            { x:1550, text: "Reformation in Iceland." },
            { x:1584, text: "The Bible is translated into Icelandic." },
            { x:1707, text: "Bubonic plague; one third of the population dies." },
            { x:1783, text: "Volcanic activity destroys Icelandic farmland and leads to widespread starvation." },
            { x:1890, text: "Mass emigration to North America." },
            { x:1904, text: "Home rule is granted." },
            { x:1915, text: "Women receive the vote." },
            { x:1918, text: "Union Treaty grants Iceland full sovereignty in a royal union with Denmark." },
            { x:1926, text: "Population reaches 100,000 for the first time." },
            { x:1940, text: "Iceland is occupied by British troops." },
            { x:1941, text: "US-Icelandic defence agreement signed; US troops stay in Iceland for duration of WWII." },
            { x:1944, text: "The Republic of Iceland is formally established." },
            { x:1949, text: "Iceland becomes a founding member of NATO." },
            { x:1951, text: "Defence treaty concluded with the US; US troops return to Iceland." },
            { x:1958, text: "Dispute over fishing limits, first ‘cod war’ with Britain." },
            { x:1960, text: "The number of Icelanders in Reykjavík and surrounding areas surpasses the number of habitants in the countryside for the first time." },
            { x:1966, text: "Icelandic state television begins broadcasting." },
            { x:1968, text: "Population reaches 200,000." },
            { x:1970, text: "Two further ‘cod wars’ with Britain (and West Germany)." },
            { x:1980, text: "Vigdís Finnbogadóttir elected president, the first democratically-elected female head of state." },
            { x:1986, text: "The Reykjavík Summit between US President Ronald Reagan and Soviet Secretary-General of the Communist Party, Mikhail Gorbachev takes place in Höfði, Reykjavík. " },
            { x:1994, text: "Iceland joins the European Economic Area, an economic arrangement with the EU." },
            { x:1996, text: "Ólafur Ragnar Grímsson elected president of Iceland" },
            { x:2008, text: "Economic crisis, near total collapse of Iceland’s banking system." },
            { x:2009, text: "Jóhanna Sigurdardóttir becomes the country’s first female prime minister (and the world’s first openly gay prime minister). " },
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
    if (currentPage >= 2) {
        if (!timelineloaded){
            let maxWidth = document.getElementById("zgo_tl").offsetWidth;
            for (let point in snapPoints[2].data.zgo){
                console.log(point);
                
                document.getElementById("zgo_tl").innerHTML += '<div id="zgo_point_' + snapPoints[2].data.zgo[point].x +'" class="tl_point" style="left:' + ((snapPoints[2].data.zgo[point].x - snapPoints[2].data.zgo[0].x) / (snapPoints[2].data.zgo[snapPoints[2].data.zgo.length - 1].x - snapPoints[2].data.zgo[0].x)) * maxWidth + 'px;"><div class="tl_point">';
            }
        }
    }
    /*zgo*/ 


    console.log(currentPage, "finished scrolling");
}

