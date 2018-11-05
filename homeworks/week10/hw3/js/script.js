let list = [];
$( document ).ready(function() {
    $( '.js__new-todo' ).click(function() {
        const todo = $( '.new__todo input' ).val();
        addTodo(todo);
        $( '.new__todo input' ).val('');
    });

    $( '.js__delete' ).click(function() {
        if($('input:checkbox:checked').length === 0){
            alert('請選取欲刪除項目');
            return;
        }
        if (confirm('確定刪除選取項目嗎 ? ')) {
            let index = $("input:checkbox:checked").map(function() { return this.id; }).get(); //取得選取的todo id
            deleteTodo(index);
        } 
    });

    $( '.js__finished' ).click(function() {
        if($('input:checkbox:checked').length === 0){
            alert('請選取欲標記項目');
            return;
        }
        if (confirm('確定將選取項目標記為已完成嗎 ? ')) {
            let index = $("input:checkbox:checked").map(function() { return this.id; }).get();
            finishTodo(index);
        }
    });

});

const addTodo = (todo) => {
    list.push({'todo':todo,'finished':false});
    render();
}
const deleteTodo = (index) => {
    for(let i=0;i<index.length;i++){
        list.splice(index[i],1,'');
    }
    list = list.filter(Boolean); //把空字串拿掉
    console.log('delete',list);
    render();
}
const finishTodo = (index) => {
    for(let i=0;i<index.length;i++){
        list[index[i]]['finished'] = true;
    }
    render();
}
const render = ()=>{
    $('.todo__block').empty();
    for(let i=0;i<list.length;i++){
        $('.todo__block').append($('.todo__item.templete').clone());
        $('.todo__block .todo__item:eq('+i+')').removeClass('templete');
        $('.todo__block .todo__item:eq('+i+') label').text(list[i]['todo']);
        $('.todo__block .todo__item:eq('+i+') input').attr('id',''+i);
        $('.todo__block .todo__item:eq('+i+') label').attr('for',''+i);
        if(list[i]['finished']){
            $('.todo__block .todo__item:eq('+i+')').addClass('finished');
        }
    }
    console.log(list);
}
