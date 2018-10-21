<?php
    require_once('conn.php');
    if($_POST['nickname']!=='' && $_POST['content']!==''){  //空值判斷
        $name = $_POST['nickname'];
        $content = $_POST['content'];
        if(isset($_POST['parent'])){
            $parent = $_POST['parent'];     //判斷是否為子留言
        }else{
            $parent=0;
        }
        $sql_users="SELECT * FROM rubysih_users WHERE nickname = '$name'";
        $result_users = $conn->query($sql_users);
        if ($result_users->num_rows > 0) {
            $row = $result_users->fetch_assoc();
            $users_id = $row["id"];
        }
        //insert into db
        $stmt_addUser = $conn->prepare("INSERT INTO rubysih_messages (users_id,content,parent) VALUES (?,?,?)");
        $stmt_addUser->bind_param("isi", $users_id, $content, $parent);
        if ($stmt_addUser->execute() !== TRUE) {
            echo json_encode(array("msg"=>'留言失敗<br/>Error: ' . $conn->error));
        }else{
            $stmt_latest = $conn->prepare("SELECT * FROM rubysih_messages ORDER BY id DESC LIMIT 1");
            $stmt_latest->execute();
            $result_latest = $stmt_latest->get_result();
            
            if ($result_latest->num_rows > 0) {
                $row = $result_latest->fetch_assoc();
                $latest_message = array(
                    "msg" => "留言成功",
                    "id" => $row["id"],
                    "date" => $row["date"],
                    "content" => $row["content"],
                    "parent" => $row["parent"]
                );
            }
            echo json_encode($latest_message);
        }
    }else{
        echo json_encode(array("msg"=>"留言失敗"));
    }
?>
