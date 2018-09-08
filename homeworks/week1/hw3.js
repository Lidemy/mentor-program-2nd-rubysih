function reverse(str) {
    var newStr='';
    // for(var i=str.length;i>0;i--){
    //     newStr+=str.slice(i-1,i);
    // }
    for(var i=str.length;i>0;i--){
        newStr+=str[i-1];
    }
    console.log(newStr);
}
reverse('yoyoyo');