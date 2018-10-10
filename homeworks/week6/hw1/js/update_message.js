document.addEventListener('DOMContentLoaded', function () {
    //刪除測試
    document.querySelector('body').addEventListener('click',(e) => {
        if(e.target.classList[1]==='delete'){     //delete btn
            if (confirm('確定刪除此留言?')) {
                const id=e.target.parentElement.children[0].value;
                const post_value='delete_id='+id;
                request_POST(post_value);
            } else {
                console.log('no');
            }
        }

        if(e.target.classList[1]==='edit'){     //edit btn
            const id=e.target.parentElement.children[0].value;
            const content = prompt("編輯留言為 : ", "留言內容 ... ");
            if (content == null || content == "" || content == "留言內容 ... ") {
                alert('編輯失敗!');
            } else {               
                post_value='edit_id='+id+'&content='+content;
                request_POST(post_value);
            }
        }
    });
})
function request_POST(post_value){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","update_message.php",true);
    xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    xmlhttp.send(post_value);
    xmlhttp.onload = () => {
        if(xmlhttp.status>=200 && xmlhttp.status<400){
            if(xmlhttp.responseText === ''){
                window.location = 'board.php';
                if(post_value.slice(0,1)==='d'){
                    alert('刪除成功!');
                }else if(post_value.slice(0,1)==='e'){
                    alert('編輯成功!'+xmlhttp.responseText);
                }
            }else{
                console.log(xmlhttp.responseText);
                alert(xmlhttp.status + xmlhttp.responseText);
            }
        }
    }
}
