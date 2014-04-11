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

// handler function that get's called when encountering a href = *.webm
// creates and play webm file, and keeps the window at the mouse
// closes the window when mouse leaves link/image.
function handler(ev) {
    var target = $(ev.target);
    href = $(this).attr('href');
    on = !on;
    var timestamp = event.timeStamp; // get timestamp
    if(on){ // code done when entering a .webm image/link
        // set global timestamp to the one created when entering the image/link
        curtimestamp = timestamp;
        // get the hoverWebm <a>
        var suba = document.getElementById('hoverWebm');
        // if it was not found, create it
        if(suba === null){
            // create the <a> where the video is inside, this is created once per page per reload, when a .webm is found
            suba = document.createElement("a" );
            // set the class and the id
            suba.setAttribute("class","hoverWebm");
            // id contains the timestamp to make it unique
            suba.setAttribute("id","hoverWebm" + timestamp);
        }

        // set the innerHTML to the video, using timestamp to make i unique, and using href for the link
        suba.innerHTML=' <span id="tooltip-span' + timestamp + '"> <video width="320" height="240" controls autoplay loop> <source src="'+ href +'" type="video/webm"> </video></span>';
        // append it to the document body, to use it
        document.getElementsByTagName('body')[0].appendChild(suba);

    }
    else{ // code done when leaving image/link
        // get the <a> and set innerHTML to nothing
        var suba =document.getElementById('hoverWebm' + curtimestamp);
        suba.innerHTML = '';
    }

    //code that makes the video windows follow the mouse, if it is null, mouse does not hover anymore
    var tooltipSpan = document.getElementById('tooltip-span' + curtimestamp);
    if(!(tooltipSpan === null)){
        window.onmousemove = function (e) {
            var x = e.clientX,
            y = e.clientY;
            tooltipSpan.style.top = (y + 20) + 'px';
            tooltipSpan.style.left = (x + 20) + 'px';
        };
    }
}

//select all elements with a href, containg .webm and enter handler function
$("[href*='.webm']").hover(handler);