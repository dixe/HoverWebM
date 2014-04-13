// determines if the href should open in new tab or not
var newtab = true;
var href;
// used to detect when entering and leaving image with mouse
// starts off
var on = false;
// used to create unique video id's and get find them again
// the reason for unique id's is, because if they where not unique
// then after hovering over the first webm and watching it, all
// other webm's would not start playing
var curtimestamp;
var leave1 = false;
var leave2 = false;

// enter function that get's called when encountering a href = *.webm
// creates and play webm file, and keeps the window at the mouse
function enter(ev) {
    var target = $(ev.target);

    href = $(this).attr('href');
    on = true;
    var timestamp = event.timeStamp; // get timestamp
    if(on){ // code done when entering a .webm image/link
        // set global timestamp to the one created when entering the image/link
        curtimestamp = timestamp;

        // the elemnt to be the webm's parent
        var parent = ev.delegateTarget;

        // get the hoverWebm <a>
        var suba = document.getElementById('hoverWebm' + curtimestamp);

        // if it was not found, create it
        if(suba === null){
            // create the <a> where the video is inside, this is created once per page per reload, when a .webm is found
            suba = document.createElement("a" );

            // set the class and the id
            suba.setAttribute("class","hoverWebm");
            // id contains the timestamp to make it unique
            suba.setAttribute("id","hoverWebm" + curtimestamp);
        }

        // set the innerHTML to the video, using timestamp to make i unique, and using href for the link
        // set video id to curtimestamp, to access it when calculation position
        suba.innerHTML=' <span id="tooltip-span' + curtimestamp + '">' +
            '<video id="' + curtimestamp + '" controls autoplay loop>' +
            '<source src="' + href +'" type="video/webm"> </video></span>';
        // append it to the document body, to use it
        parent.appendChild(suba);

    }
    else{ // code done when leaving image/link
        // get the <a> and set innerHTML to nothing
        var suba = document.getElementById('hoverWebm' + curtimestamp);
        suba.parentNode.removeChild(suba);
    }

    //code that makes the video windows follow the mouse, if it is null, mouse does not hover anymore
    var tooltipSpan = document.getElementById('tooltip-span' + curtimestamp);
    if(!(tooltipSpan === null)){
        //get video element, to determinate if it is within the screen, else move it up and or left
        var video = document.getElementById(curtimestamp);
        var width;
        var height;
        var bwidth = $(window).width();   // returns width of browser viewport
        var bheight = $(window).height();   // returns height of browser viewport

        video.addEventListener( "loadedmetadata", function (e) {
                width = this.videoWidth;
                height = this.videoHeight;

            }, false );
        window.onmousemove = function (e) {
            var x = e.clientX,
            y = e.clientY;

            // if mouse is not hovering image/link, close the hoverWebm video
            if(!isMouseInside(parent,x,y)){
                leave();
            }

            if(bheight - y - 20 < height){
                tooltipSpan.style.top = 0 + 'px';
            }
            else if(height){
                tooltipSpan.style.top = (y + 20) + 'px';
            }
            if(bwidth - x - 20 < width){
                tooltipSpan.style.left = 0 + 'px';
            }
            else if(width){
                tooltipSpan.style.left = (x + 20) + 'px';
            }
        }
     ;
    }
}

//check is mouse is inside element, given mouse x and y
function isMouseInside(elem,x,y){

    var pos = position(elem);
    pos[1] = pos[1] - window.pageYOffset;
    var h = elem.offsetHeight;
    var w = elem.offsetWidth;

    if(x < pos[0] || x > pos[0] + w){
        // mouse cannot be inside
        return false;
    }
    if(y < pos[1] || y > pos[1] + h){
        // mouse cannot be inside
        return false;
    }
    return true;


}

// find position of DOM element
function position( elem ) {
    var left = 0,
        top = 0;

    do {
        left += elem.offsetLeft;
        top += elem.offsetTop;
    } while ( elem = elem.offsetParent );

    return [ left, top ];
}

function leave(){
    // get the <a> and set innerHTML to nothing
    var suba = document.getElementById('hoverWebm' + curtimestamp);
    suba.parentNode.removeChild(suba);
}


//select all elements with a href, containg .webm and enter handler function
$("[href*='.webm']").mouseenter(enter);
$("[href*='.webm']").mouseleave(leave);

