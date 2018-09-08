function join(str, concatStr) {
    var output='';
    for(var i=0;i<str.length;i++){
        output+=str[i];
        if(i!==str.length-1){
            output+=concatStr;            
        }
    }
    return output;
}

function repeat(str, times) {
    var output='';
    for(var i=0;i<times;i++){
        output+=str;
    }
    return output;
}
