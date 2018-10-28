<?php
    require_once('conn.php');

    if(isset($_COOKIE["member_id"])){
        $session_id=$_COOKIE["member_id"];
        $stmt = $conn->prepare("SELECT users.id  FROM rubysih_users_certificate as users_certificate LEFT JOIN rubysih_users as users ON users_certificate.username = users.username  WHERE users_certificate.session_id=?");
        $stmt->bind_param("s", $session_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $users_id=$row['id'];
        }
    }

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
?>