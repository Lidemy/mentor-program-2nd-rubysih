function isPalindromes(str) {
    var reverse='';
    for(var i=str.length-1;i>=0;i--){
        reverse+=str[i];
    }
    if(str===reverse){
        return true;
    }
    return false;
}

module.exports = isPalindromes