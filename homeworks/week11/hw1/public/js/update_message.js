document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').addEventListener('click',(e) => {
        //delete btn
        if(e.target.classList[2]==='delete'){     //檢查classlist 中有沒有這個class
            if (confirm('確定刪除此留言?')) {
                const id=e.target.parentElement.children[0].value;
                //set post data object
                const post_value={
                    id : id,
                    method : 'DELETE'
                };
                let parentElement = e.target.parentElement.parentElement;
                let deleteElementArray=[];

                if(parentElement.classList[0]==='reply__block'){ //子留言
                    const this_info = e.target.parentElement.previousElementSibling;
                    const this_content = e.target.parentElement;
                    deleteElementArray = [this_info,this_content];
                    //子留言 info 跟 content 外面沒又再包一層 div, 所以要用 array
                }else{  //父留言
                    console.log('parent');
                    parentElement = e.target.parentElement.parentElement.parentElement;
                    deleteElementArray = [e.target.parentElement.parentElement];
                }
                let info_obj = {
                    parentElement : parentElement,
                    deleteElementArray : deleteElementArray
                };
                upadteRrequest_POST(post_value, info_obj);
            } else {
                console.log('no');
            }
        }

        //edit btn
        if(e.target.classList[2]==='edit'){     
            const id=e.target.parentElement.children[0].value;
            const content = prompt("編輯留言為 : ", "留言內容 ... ");
            if (content == null || content == "" || content == "留言內容 ... ") {
            } else {     
                //set post data object          
                post_value={
                    id : id,
                    content : content,
                    method : 'PUT'
                };
                let info_obj = {
                    element : e.target.parentElement,
                    content : content
                };
                upadteRrequest_POST(post_value, info_obj);
            }
        }
    });
})
//post to backend
function upadteRrequest_POST(post_value, info_obj){  
    let request = $.ajax({
        url: "/message",
        method: post_value.method,
        data: post_value,
        dataType: "text"
    });
    request.done(function( result ) {
        console.log(result);
        console.log('ergreg',post_value.method);
        if(result === 'success'){
            if(post_value.method === 'DELETE'){ //delete message
                deleteElement(info_obj.parentElement, info_obj.deleteElementArray);        
            }else{                                  //edit message
                editElement(info_obj.element, info_obj.content);
            }
        }
        
    });
    request.fail(function( jqXHR, textStatus) {
        // console.log(errorThrown);
        alert( "Request failed: " + textStatus );
    });
    
}
//編輯及刪除 DOM
function deleteElement(parentElement,deleteElementArray){
    alert('刪除成功');
    for(let i=0;i<deleteElementArray.length;i++){
        parentElement.removeChild(deleteElementArray[i]);
    }
    console.log('delete '+parentElement.classList[0]);
}

function editElement(element,content){
    alert('編輯成功');
    console.log('edit ' + element.childNodes[0].nodeValue);
    element.childNodes[0].nodeValue = content;
}