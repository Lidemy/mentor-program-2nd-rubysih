document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').addEventListener('click',(e) => {
        if(e.target.classList[2]==='btn__submit'){ 
            event.preventDefault();
            //set post data object
            let post_value = {};
            //透過 FormData 取得 user input
            var formData = new FormData(e.target.parentElement);
            for (var pair of formData.entries()) {
                post_value[pair[0]] = pair[1];
            } 
            // post_value.nickname = nickname;
            const parent = e.target.parentElement.parentElement.parentElement; //要 append 到哪個元素
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
        url: "/message",
        method: "POST",
        data: post_value,
        dataType: "text"
    });
    request.done(function( result ) {
        let result_obj = JSON.parse(result);    //json to object
        console.log(result_obj,'result obj');
        if(result_obj.msg === '留言成功'){
            console.log('success, append to dom');
            //content 直接用前端的資料
            // result_obj.nickname = post_value.nickname;
            // result_obj.content = post_value.content;
            appendMessage(result_obj, parent);
        }else{
            console.log(result_obj.msg,'test');

            alert(result_obj.msg,'test');
        }
    });
    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
}
//新增留言到 DOM
function appendMessage(result_obj, parent){ 
    //可改進: 若是頁數不在第一頁，新增留言後，留言會在此頁數上方新增 (不會回到第一頁)

    //get now time, 並且補零
    let date = new Date();
    let nowTime = `${date.getFullYear()}-${(date.getMonth()+1<10 ? '0' : '')+(date.getMonth()+1)}-${(date.getDate()<10 ? '0' : '')+date.getDate()} ${(date.getHours()<10 ? '0' : '')+date.getHours()}:${(date.getMinutes()<10 ? '0' : '')+date.getMinutes()}:${(date.getSeconds()<10 ? '0' : '')+date.getSeconds()}`;
    
    //從父元素判定是否為父留言
    if(parent.classList[0] === 'container'){     //父留言
        //clone templete
        let cln = parent.children[1].cloneNode(true);
        parent.insertBefore(cln, parent.children[2]);
        //修改 clone block 的值
        //直接設定 innerHtml
        cln.className = 'message__block';
        cln.children[0].children[0].innerText = result_obj.nickname;
        cln.children[0].children[1].innerText = nowTime;
        cln.children[1].childNodes[0].nodeValue = result_obj.content;
        cln.children[1].children[0].value = btoa(result_obj.id); //base64
        cln.children[2].children[0].children[0].className = 'js_' + result_obj.id;
        document.querySelector('.js_' + result_obj.id + ' .nickname').value = result_obj.nickname;
        // document.querySelector('.js_' + result_obj.id + ' .parent').value = btoa(result_obj.id);
        document.querySelector('.js_' + result_obj.id + ' .parent').value = result_obj.id;
    }else{                                       //子留言
        let cln_info = parent.parentElement.parentElement.children[1].children[0].cloneNode(true);
        let cln_content = parent.parentElement.parentElement.children[1].children[1].cloneNode(true);
        //最新的留言顯示在最上面 (append 在第一個元素之前)
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