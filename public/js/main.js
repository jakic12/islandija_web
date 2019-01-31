var originalHeight = document.getElementById("titleDiv").clientHeight

var snapPoints = [
    { sc:0, id: "titleDiv" },
    { id: "opis_splitter" },
    { id: "opis1_splitter"}
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


var onscrollchange = function(){
    if (currentPage >= 1){
        document.getElementById("satellite").style.marginLeft = "0px";

    }else{
        document.getElementById("satellite").style.transitionProperty = "none";
        document.getElementById("satellite").style.marginLeft = "100%";
        setTimeout(function(){
            document.getElementById("satellite").style.transitionProperty = "margin";
        }, 100);
    }
    console.log(currentPage, "finished scrolling")
}

