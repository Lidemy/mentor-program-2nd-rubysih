document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').addEventListener('click',(e) => {
        if(e.target.classList[2]==='btn__submit'){ 
            event.preventDefault();
            //set post data object
            let post_value = {};
            var formData = new FormData(e.target.parentElement);
            for (var pair of formData.entries()) {
                post_value[pair[0]] = pair[1];
            } 
            post_value.nickname = nickname;
            const parent = e.target.parentElement.parentElement.parentElement;
            console.log('post',post_value);
            addRequest_POST(post_value, parent);
            e.target.parentElement.children[1].children[1].children[0].value = '';  //clear textarea
        }
    });
})
//post to backend
function addRequest_POST(post_value, parent){  
    console.log('post1',post_value);

    let request = $.ajax({
        url: "new_message.php",
        method: "POST",
        data: post_value,
        dataType: "text"
    });
    request.done(function( result ) {
        let result_obj = JSON.parse(result);    //josn to object
        console.log(result_obj);
        if(result_obj.msg === '留言成功'){
            result_obj.nickname = post_value.nickname;
            result_obj.content = post_value.content;
            appendMessage(result_obj, parent);
        }
    });
    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
}
//新增留言到 DOM
function appendMessage(result_obj, parent){ 
    //get now time
    let date = new Date();
    let nowTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if(parent.classList[0] === 'container'){     //父留言
        let cln = parent.children[1].cloneNode(true);
        parent.insertBefore(cln, parent.children[2]);
        cln.className = 'message__block';
        cln.children[0].children[0].innerText = result_obj.nickname;
        cln.children[0].children[1].innerText = nowTime;/* result_obj.date */
        cln.children[1].childNodes[0].nodeValue = result_obj.content;
        cln.children[1].children[0].value = btoa(result_obj.id);
        cln.children[2].children[0].children[0].className = 'js_' + result_obj.id;
        document.querySelector('.js_' + result_obj.id + ' .nickname').value = result_obj.nickname;
        document.querySelector('.js_' + result_obj.id + ' .parent').value = btoa(result_obj.id);
    }else{                                       //子留言
        let cln_info = parent.parentElement.parentElement.children[1].children[0].cloneNode(true);
        let cln_content = parent.parentElement.parentElement.children[1].children[1].cloneNode(true);
        parent.insertBefore(cln_content, parent.children[0]);
        parent.insertBefore(cln_info, parent.children[0]);
        cln_info.children[0].innerText = result_obj.nickname;
        cln_info.children[1].innerText = nowTime;/* result_obj.date */
        cln_content.childNodes[0].nodeValue = result_obj.content;
        //判斷是否是自己的子留言
        if(result_obj.same_user === true){
            cln_info.className+= ' self__message';
            cln_content.className+= ' self__message';
        }
        cln_content.children[0].value = btoa(result_obj.id); //base64 encode id
    }
}