<?php 
    require_once('conn.php');
    function buy(){
        $conn->autocommit(FALSE);
        $conn->begin_transaction();
        $stmt = $conn->prepare("select amount from products where id = 1 for update");
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo $row['amount'] .'  ';
            if($row['amount']>0){
                $stmt1 = $conn->prepare("update products set amount = amount -1 where id = 1");
                if($stmt1->execute()){
                    echo '+"購買成功"';
                }
            }else{
                echo '+"購買失敗"';
            }
        }
        $conn->commit();
    }
    
?>
<style>
.btn1{
    padding : 5px;
    border : #000 solid 1px;
    display : inline-block;
    cursor: pointer;
}
</style>
<div class="btn1 btn2 btn3 btn4 btn5">button</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.btn1').addEventListener('click',() => {
        console.log('btn1');
        console.log(
        <?php
            buy();    
        ?>
        );
        
    });
    document.querySelector('.btn2').addEventListener('click',() => {
        console.log('btn2');
        console.log(
        <?php
            buy();    
        ?>
        );
    });
    document.querySelector('.btn3').addEventListener('click',() => {
        console.log('btn3');
        console.log(
        <?php
            buy();    
        ?>
        );
    });
    document.querySelector('.btn4').addEventListener('click',() => {
        console.log('btn4');
        console.log(
        <?php
            buy();    
        ?>
        );
    });
    document.querySelector('.btn5').addEventListener('click',() => {
        console.log('btn5');
        console.log(
        <?php
            buy();    
        ?>
        );
    });
})
</script>
