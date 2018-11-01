// stack and queue
function Stack(){
    let list = [];
    return{
        push : function(num){
            list[list.length] = num;
        },
        pop : function(){
            return list.pop();
        }
    }
}

function Queue(){
    let list = [];
    return{
        push : function(num){
            list[list.length] = num;
        },
        pop : function(){
            return list.shift();
        }
    }
}
var stack = new Stack()
stack.push(10)
stack.push(5)
console.log(stack.pop(),'stack') // 5
console.log(stack.pop(),'stack') // 10

var queue = new Queue()
queue.push(1)
queue.push(2)
console.log(queue.pop(),'queue') // 1
console.log(queue.pop(),'queue') // 2