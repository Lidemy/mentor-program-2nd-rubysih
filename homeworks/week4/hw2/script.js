function formsubmit(){
    const email= document.querySelector('.email');
    const nick_name= document.querySelector('.nick_name');
    const work= document.querySelector('.work');
    const background= document.querySelector('.background');
    const others= document.querySelector('.others');

    email.parentNode.classList.remove('bg-red'); 
    nick_name.parentNode.classList.remove('bg-red');


    //判斷必填欄位是否有作答，並取值
    if(email.value==='' || nick_name.value===''){
        if(email.value===''){
            email.parentNode.classList.add('bg-red'); 
        }
        if(nick_name.value===''){
            nick_name.parentNode.classList.add('bg-red'); 
        }
        return false;
    }else{
        console.log('email : '+email.value);
        console.log('nick name : '+nick_name.value);
        console.log('work : '+work.value);
        console.log('background : '+others.value);
        console.log('others : '+others.value);
        alert('submit!');
        return true;
    }
}