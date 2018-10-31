<?php
    session_start();  
    require_once('conn.php');
    if(isset($_SESSION["member_id"])){
        $stmt_users = $conn->prepare("SELECT * FROM rubysih_users WHERE username = ?");
        $stmt_users->bind_param("i", $_SESSION["member_id"]);
        if ($stmt_users->execute() !== TRUE) {
            echo json_encode(array("msg"=>'id失敗<br/>Error: ' . $conn->error.$_SESSION["member_id"]));
        }else{
            $result_users = $stmt_users->get_result();
            if ($result_users->num_rows > 0) {
                $row = $result_users->fetch_assoc();
                $users_id = $row["id"];
                // $user_nickname = $row["nickname"];
            }
        }
        $stmt_users->close();
    }
    // if(isset($_POST['nickname'])){
    //     if($_POST['nickname'] !== $user_nickname){
    //         echo '操作失敗，你不是本人';
    //         return;
    //     }
    // }

    //update
    if(isset($_POST['edit_id'])&&!empty($_POST['edit_id']) && isset($_POST['content'])&&!empty($_POST['content'])){
        $content=$_POST['content'];
        $id = base64_decode($_POST['edit_id']);
        updateMessage($users_id,$id,$content,$conn);
    }
    //delete
    if(isset($_POST['delete_id'])&&!empty($_POST['delete_id'])){
        $id = base64_decode($_POST['delete_id']);
        deleteMessage($users_id,$id,$conn);
    }

    function updateMessage($users_id,$id,$content,$conn){
        $stmt = $conn->prepare("UPDATE rubysih_messages SET content = ? WHERE id = ? AND users_id = ?");
        $stmt->bind_param("sii", $content, $id, $users_id);
        if ($stmt->execute() !== TRUE) {
            echo "Error: "  . $conn->error;
        }
    }

    function deleteMessage($users_id,$id,$conn){
        $stmt = $conn->prepare("UPDATE rubysih_messages SET delete_status = 1 WHERE id = ? AND users_id = ?");
        $stmt->bind_param("ii",$id,$users_id);
        if ($stmt->execute() !== TRUE) {
            echo "Error: "  . $conn->error;
        }
    }
    $stmt->close();
    $conn->close();
?>