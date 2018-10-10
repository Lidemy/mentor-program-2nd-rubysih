<?php
    require_once('conn.php');
    if(isset($_POST['edit_id'])&&!empty($_POST['edit_id']) && isset($_POST['content'])&&!empty($_POST['content'])){
        $content=$_POST['content'];
        $id = base64_decode($_POST['edit_id']);
        updateMessage($id,$content,$conn);
        
    }

    if(isset($_POST['delete_id'])&&!empty($_POST['delete_id'])){
        $id = base64_decode($_POST['delete_id']);
        deleteMessage($id,$conn);
    }

    function updateMessage($id,$content,$conn){
        $sql = "UPDATE rubysih_messages SET content = '$content' WHERE id = $id";
        if ($conn->query($sql) !== TRUE) {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    function deleteMessage($id,$conn){
        $sql = "UPDATE rubysih_messages SET delete_status = 1 WHERE id = $id";
        if ($conn->query($sql) !== TRUE) {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
?>