function add(a, b) {
    var result=[],resultStr='';
    for(var i=0;i<a.length;i++){
        var num=parseInt(a[i])+parseInt(b[i]);
        if(num>=10){
            parseInt(a[i-1])+1;
            num=num%10;
        }
        result[i]=num;
        resultStr+=result[i];
    }

    return resultStr;
}

module.exports = add;