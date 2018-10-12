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
            echo "Error: "  . $conn->error;
            header('Location: board.php?status=留言失敗');
        }else{
            header('Location: board.php');
        }
    }else{
        header('Location: board.php?status=留言失敗');
    }
?>
