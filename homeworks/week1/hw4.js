function printFactor(n) {
    var factor='';
    for(var i=0;i<=n;i++){
        if(n%i===0){
            factor+=i+'\n';
        }
    }
    console.log(factor);
}