function join(str, concatStr) {
    var output='';
    for(var i=0;i<str.length;i++){
        output+=str[i]+concatStr;
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