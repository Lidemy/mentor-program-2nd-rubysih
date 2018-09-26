document.addEventListener('DOMContentLoaded', function () {
    let data;
    getStream(function(data){                    
        for(let i=0;i<20;i++){
            setStream(data.streams[i]);
        }
    });
})
function getStream(callback){
    const id = 'n24zau96r9deo3gfu9f2d0jlviscnw';
    const game='League%20of%20Legends';
    const request = new XMLHttpRequest();
    request.open('GET', 'https://api.twitch.tv/kraken/streams/?game='+game, true);
    request.setRequestHeader('Accept','application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID',id);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {    // Success!
            data=JSON.parse(request.responseText);
            callback(data);
        }
    };
    request.send();
}
function　setStream(stream_data){ //setting stream-block and clone
    const stream=document.querySelector('.stream-block');
    if(stream_data!==data.streams[0]){
        var cln = stream.cloneNode(true);                
    }

    stream.children[0].setAttribute("href",stream_data.channel.url) //stream url
    stream.children[0].children[0].style.backgroundImage=`url(${stream_data.preview.large})`;  //直播畫面
    stream.children[0].children[1].children[0].style.backgroundImage=`url(${stream_data.channel.logo})`; //channel logo
    stream.children[0].children[1].children[1].children[0].innerText=stream_data.channel.status; //直播標題
    stream.children[0].children[1].children[1].children[1].innerText=stream_data.channel.display_name; //channel name
    
    if(stream_data!==data.streams[0]){
        console.log('clone',stream_data.channel.display_name);
        document.querySelector('.block-container').append(cln);
    }
}