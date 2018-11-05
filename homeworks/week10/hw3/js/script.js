let list = [];
let finishedList = [];
$( document ).ready(function() {
    $( '.js__new-todo' ).click(function() {
        const todo = $( '.new__todo input' ).val();
        addTodo(todo);
        
    });

    $( '.js__delete' ).click(function() {
        if($('input:checkbox:checked').length === 0){
            alert('請選取欲刪除項目');
            return;
        }
        if (confirm('確定刪除選取項目嗎 ? ')) {
            let index = $('input:checkbox:checked').attr('id');
            deleteTodo(index);
        } 
    });

    $( '.js__finished' ).click(function() {
        if($('input:checkbox:checked').length === 0){
            alert('請選取欲標記項目');
            return;
        }
        if (confirm('確定將選取項目標記為已完成嗎 ? ')) {
            let index = $('input:checkbox:checked').attr('id');
            finishTodo(index);
        }
    });

});

const addTodo = (todo)=>{
    list.push(todo);
    render();
}
const deleteTodo = (index)=>{
    list.splice(index,1);
    for(let i=0;i<finishedList.length;i++){
        if(finishedList[i] === index){
            finishedList.splice(i,1);
        }
    }
    render();
}
const finishTodo = (index) => {
    finishedList.push(index);
    render();
}
const render = ()=>{
    $('.todo__block').empty();
    for(let i=0;i<list.length;i++){
        $('.todo__block').append($('.todo__item.templete').clone());
        $('.todo__block .todo__item:eq('+i+')').removeClass('templete');
        $('.todo__block .todo__item:eq('+i+') label').text(list[i]);
        $('.todo__block .todo__item:eq('+i+') input').attr('id',''+i);
        $('.todo__block .todo__item:eq('+i+') label').attr('for',''+i);
    }
    for(let i=0;i<finishedList.length;i++){
        $('.todo__block .todo__item:eq('+finishedList[i]+')').addClass('finished');
    }
    console.log(list);
    console.log(finishedList);
}
