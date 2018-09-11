function stars(n) {
    var str=[];
    for(var i=0;i<n;i++){
        str[i]='';
        for(var j=0;j<=i;j++){
            str[i]+='*';
        }
    }
    return str;
}

module.exports = stars;
console.log(stars(3));