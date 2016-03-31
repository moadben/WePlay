var videos;
var count;
var curr = 0;
var ids = [];
var embeds = [];
var player;


//FUNCTION FOR PLAYER.JS //

function initPlayer(){
    var iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    iframe.src = embeds[curr];
    iframe.width = '500';
    iframe.height='400';
    var title = document.createElement('vid_title');
    title.id = 'vid_title';
    title.innerHTML = ids[curr]['title'] + "<br>";
    title.style.fontSize = "x-large";
    title.style.paddingBottom = "25px";
    var description = document.createElement('vid_description');
    description.id = 'vid_description';
    description.innerHTML =  "<br>" + ids[curr]['description'];
    description.style.paddingBottom = "25px";
    document.getElementById("holder").appendChild(title);
    document.getElementById("holder").appendChild(iframe);
    document.getElementById("holder").appendChild(description);
    var player = new playerjs.Player(iframe);
    player.on('ready', function(){
        player.play();
        player.on('ended', function(){
            getNext();
        });
    });
    return player;
};

//END OF FUNCTION FOR PLAYER.JS //

// FUNCTION FOR API //

function getIDs(initPlayer){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://riipen.mediacore.tv/api2/media", true, "riipenchallenge@mediacore.com", "riipenchallenge");
    xhttp.onload = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            videos = JSON.parse(xhttp.responseText);
            count = videos['count'];
            for(var i = 0; i<count; i++){
                ids.push(videos['items'][i]);
                // console.log(ids);
            }
            for(var i =0; i<count; i++){
                embeds.push("https://riipen.mediacore.tv/media/" + ids[i]['slug'] + "/embed_player?iframe=True");
            }
            player = initPlayer();
        };
    };
    xhttp.onerror = function () {
        console.error(xhr.statusText);
    };
    xhttp.send();
};

// END OF FUNCTION FOR API //




 // FUNCTIONS FOR BUTTONS //
 function getNext(){
    if(curr == (count-1)){
        curr = (-1);
    }
    curr = curr+1;
    document.getElementById('vid_title').innerHTML = ids[curr]['title'] + "<br>";
    document.getElementById('vid_description').innerHTML = "<br>" + ids[curr]['description'];
    var iframe = document.getElementById('iframe').src=embeds[curr];
    player.on('ready', function(){
        player.play();
        player.on('ended', function(){
            getNext();
        });
    });
};

function getPrev(){
    curr = curr-1;
    if(curr == -1){
        curr = count-1;
    }
    document.getElementById("vid_title").innerHTML = ids[curr]['title'] + "<br>";
    document.getElementById("vid_description").innerHTML = "<br>" + ids[curr]['description'];
    var iframe = document.getElementById('iframe').src=embeds[curr];
    player.on('ready', function(){
        player.play();
        player.on('ended', function(){
            getNext();
        });
    });
};

// END OF FUNCTIONS FOR BUTTONS //




// MAIN //
getIDs(initPlayer);
// END OF MAIN //