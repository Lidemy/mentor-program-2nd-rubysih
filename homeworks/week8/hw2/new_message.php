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
                $user_nickname = $row["nickname"];
            }
        }
        $stmt_users->close();
    }
    if($_POST['nickname']!=='' && $_POST['content']!==''){  //空值判斷
        $name = $_POST['nickname'];
        if($name !== $user_nickname){
            echo json_encode(array("msg"=>'留言失敗, 你不是 ' . $user_nickname));
            return;
        }
        $content = $_POST['content'];
        if(isset($_POST['parent'])){
            $parent = base64_decode($_POST['parent']);     //判斷是否為子留言
        }else{
            $parent=0;
        }


        //insert into db
        $stmt_addUser = $conn->prepare("INSERT INTO rubysih_messages (users_id,content,parent) VALUES (?,?,?)");
        $stmt_addUser->bind_param("isi", $users_id, $content, $parent);
        if ($stmt_addUser->execute() !== TRUE) {
            echo json_encode(array("msg"=>'留言失敗<br/>Error: ' . $conn->error.$name.$users_id. $content. $parent));
        }else{
            $last_id = $conn->insert_id;
            $same_user = false;
            $stmt_parent = $conn->prepare("SELECT users_id FROM rubysih_messages WHERE id = ?");
            $stmt_parent->bind_param("i", $parent);
            $stmt_parent->execute();
            $result_parent = $stmt_parent->get_result();
            if ($result_parent->num_rows > 0) {
                $row = $result_parent->fetch_assoc();
                $same_user = ($row["users_id"] === $users_id)?$same_user = true:$same_user = false; 
            }
            $stmt_parent->close();
            $latest_message = array(
                "msg" => "留言成功",
                "id" => $last_id,
                "same_user" => $same_user
            );
            echo json_encode($latest_message);
        }
        $stmt_addUser->close();
        $conn->close();
    }else{
        echo json_encode(array("msg"=>"留言失敗"));
    }
?>
