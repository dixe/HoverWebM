// determines if the href should open in new tab or not
var newtab = true;
var href;
// used to detect leaving image
var on = false;
var curtimestamp;

function handler(ev) {
    var target = $(ev.target);
    href = $(this).attr('href');
    console.log("Hovering " + href);
    //play webm with href as link
    on = !on;
    console.log(on);
    var timestamp = event.timeStamp; // get timestamp
    if(on){
        curtimestamp = timestamp;
        var suba =document.getElementById('white-popup');
        if(suba === null){
            suba = document.createElement("a" );
            console.log("created a");
            suba.setAttribute("class","white-popup");
            suba.setAttribute("id","white-popup" + timestamp);
        }

        suba.innerHTML=' <span id="tooltip-span' + timestamp + '"> <video width="320" height="240" controls autoplay loop> <source src="'+ href +'" type="video/webm"> </video></span>';
        document.getElementsByTagName('body')[0].appendChild(suba);

    }
    else{
        console.log('white-popup' + curtimestamp);
        var suba =document.getElementById('white-popup' + curtimestamp);
        suba.innerHTML = '';
    }
    var tooltipSpan = document.getElementById('tooltip-span' + curtimestamp);
    if(!(tooltipSpan === null)){
        console.log(tooltipSpan);
        window.onmousemove = function (e) {
            var x = e.clientX,
            y = e.clientY;
            tooltipSpan.style.top = (y + 20) + 'px';
            tooltipSpan.style.left = (x + 20) + 'px';
        };
    }
}
//select all elements with a href, containg .webm
$("[href*='.webm']").hover(handler);

// suba.innerHTML=' <span id="tooltip-span"> <video width="320" height="240" controls autoplay loop> <source src="'+ href +'" type="video/webm"> <object data="' + href + '" width="320" height="240"> <embed src="" width="320" height="240">  </object></video></span>';