document.addEventListener('DOMContentLoaded', function () {

    const   ac=select('.ac'), //歸零
            show=select('.show'),
            equal=select('.equal'),//=
            number=select('.number-block');//numbers
    let num1=0;num2=0,newNum=false,
        operation=0;//0=無運算,1=相加,2=相減,3=相乘,4=相除

    //歸零
    ac.addEventListener('click',(e) => {  
        show.innerText=0;
        operation=0;
    });

    //數字鍵盤
    number.addEventListener('click',(e) => {
        let show_num=show.innerText;        
        if(e.target.classList[0]==='number'){
            (show_num==0 || newNum==true )?show.innerText=e.target.innerText:show.innerText+=e.target.innerText;
            newNum=false;
        }
        if(e.target.classList[0]==='operator'){
            checkOperator(e.target.classList[1]);
        }
    });
    //button equal
    equal.addEventListener('click',(e) => {  
        num2=Number(show.innerText);
        switch (operation) {
            case 1:
                show.innerText=num1+num2;
                break;
            case 2:
                show.innerText=num1-num2;            
                break;
            case 3:
                show.innerText=num1*num2;                            
                break;
            case 4:
                if(num2!==0){
                    show.innerText=num1/num2
                }else{
                    alert('無法除以0'); 
                }     
                break;
        }
    });

    function checkOperator(operator){
        newNum=true; 
        num1=Number(show.innerText);
        switch (operator) {
            case 'plus':
                operation=1;
                break;
            case 'minus':
                operation=2;
                break;
            case 'times':
                operation=3;
                break;
            case 'division':
                operation=4;
                break;
        }
    }
})
//select html element
function select(element){
        return document.querySelector(element);
}