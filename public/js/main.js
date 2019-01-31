var originalHeight = document.getElementById("titleDiv").clientHeight

var snapPoints = [
    { sc: 0, id: "titleDiv" },
    { sc: 475, id: "opis_splitter" },
    { sc: 0, id: "opis1_splitter"}
];

var currentPage = 0;

window.onload = function(){
    scrollToPoint(snapPoints[0].id);
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

window.onwheel = function(event){
    //var direction = (event.deltaY > 0)? 1:-1;
    if (event.deltaY > 0){
        currentPage++;
    }else{
        currentPage--;
    }

    if (currentPage < snapPoints.length && currentPage >= 0){
        scrollToPoint(snapPoints[currentPage].id);
        console.log("scrolled to", snapPoints[currentPage].id, document.getElementById(snapPoints[currentPage].id).getBoundingClientRect().top);
    } else if (currentPage < 0){
        currentPage = 0;
    }else{
        currentPage = snapPoints.length-1;
    }

    console.log(currentPage);
    console.log(snapPoints[currentPage].id);

    event.preventDefault();
}

window.onscroll = function(event){
    if (document.body.scrollTop < 475){//parallax main
        /*document.getElementById("titleDiv").style.height = originalHeight - document.body.scrollTop + "px";
        document.getElementById("sky").style = "transform:translate(0,-" + document.body.scrollTop/3 + "px);";*/
    }
}

var scrollToPoint = function(id){
    window.scroll({
        top: document.body.scrollTop + document.getElementById(id).getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth'
    });

    //document.getElementById(id).scrollIntoView();
}

var onscrollchange = function(){
    console.log(currentPage, "finished scrolling")
}

