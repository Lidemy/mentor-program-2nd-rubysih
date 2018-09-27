document.addEventListener('DOMContentLoaded', function () {
    let data;
    getStream(function(data){                    
        for(let i=0;i<20;i++){
            cloneStream(data.streams[i]);
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
function　cloneStream(stream_data){ //clone stream block
    const stream=document.querySelector('.stream-block');
    if(stream_data!==data.streams[0]){
        var cln = stream.cloneNode(true); 
        setStream(cln,stream_data);
        document.querySelector('.block-container').append(cln);
    }else{
        setStream(stream,stream_data);        
    } 
    // if(stream_data!==data.streams[0]){
        
    // }
}
function　setStream(stream_block,stream_data){ //setting stream-block
    stream_block.children[0].setAttribute("href",stream_data.channel.url) //stream url
    stream_block.children[0].children[0].style.backgroundImage=`url(${stream_data.preview.large})`;  //直播畫面
    stream_block.children[0].children[1].children[0].style.backgroundImage=`url(${stream_data.channel.logo})`; //channel logo
    stream_block.children[0].children[1].children[1].children[0].innerText=stream_data.channel.status; //直播標題
    stream_block.children[0].children[1].children[1].children[1].innerText=stream_data.channel.display_name; //channel name
    
}