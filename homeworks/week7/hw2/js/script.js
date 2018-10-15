$( document ).ready(function() {
    $( '.js__new-todo' ).click(function() {
        const todo = $( '.new__todo input' ).val();
        setTodoItem(todo);
    });
    $( '.js__delete' ).click(function() {
        if($('input:checkbox:checked').length === 0){
            alert('請選取欲刪除項目');
            return;
        }
        deleteTodo();

    });
    $( '.js__finished' ).click(function() {
        const count = $('input:checkbox:checked').length;
        if(count === 0){
            alert('請選取欲標記項目');
            return;
        }
        finishTodo(count);
    });

    
});
const setTodoItem = (todo) => {
    $( '.new__todo input' ).val('');
    const count = $('.todo__item').length;  //共幾個todo item (include templete)
    for(let i=1;i<count;i++){
        if($('.todo__item:eq('+i+')  label').text() === todo){
            alert('已有此 todo 項目 ! ');
            return ;
        }
    }
    $('.todo__block').append($('.todo__item:eq(0)').clone());
    $('.todo__item:eq('+count+') label').text(todo);
    $('.todo__item:eq('+count+') input').attr('id',''+count);
    $('.todo__item:eq('+count+') label').attr('for',''+count);
    
}
const deleteTodo = () => {
    if (confirm('確定刪除選取項目嗎 ? ')) {
        $('input:checkbox:checked').parent().parent().remove();
    } 
}
const finishTodo = (count) => {
    for(let i=0;i<count;i++){
        console.log(i);
        if($('input:checkbox:checked:eq('+i+')').parent().parent().hasClass('finished')){
            let todo = $('input:checkbox:checked:eq('+i+')').parent().find('label' ).text();
            alert(todo+' 已標記');
            return;
        }
    }
    if (confirm('確定將選取項目標記為已完成嗎 ? ')) {
        $('input:checkbox:checked').parent().parent().addClass( "finished");
    } 
    $('input:checkbox:checked').prop('checked', false);
}
