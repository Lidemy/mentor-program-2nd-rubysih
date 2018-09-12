function add(a, b) {
    var result=[],resultStr='';
    var moreV='',lessV=[],j;
    //把較少的字串補0
    if(a.length>=b.length){
        moreV=a;
        j=b.length-1;
        for(var i=moreV.length-1;i>=0;i--){
            if(j>=0){
                lessV[i]=b[j];
                j--;
            }else{
                lessV[i]='0';
            }
        }
    }else{
        moreV=b; 
        j=a.length-1;
        for(var i=moreV.length-1;i>=0;i--){
            if(j>=0){
                lessV[i]=a[j];
                j--;
            }else{
                lessV[i]='0';
            }
        }        
    }
    //相加計算
    var carry=false; //判斷進位
    for(var i=moreV.length-1;i>=0;i--){
        if(carry===true){
            var num=1+parseInt(moreV[i])+parseInt(lessV[i]);
            carry=false; 
        }else{
            var num=parseInt(moreV[i])+parseInt(lessV[i]);
        }
        if(num>=10){
            carry=true;
            num=num%10;
        }
        result[i]=num;
    }
    for(var i=0;i<result.length;i++){
        resultStr+=result[i];
    }
    if(carry===true){
        return 1+resultStr;
    }
    return resultStr;
}

module.exports = add;
console.log(add('9','9'));
