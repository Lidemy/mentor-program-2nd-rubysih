<?php
    
    require_once('conn.php');
    if($_POST['nickname']!=='' && $_POST['content']!==''){  //空值判斷
        $name = $_POST['nickname'];
        $content = $_POST['content'];
        if(isset($_POST['parent'])){    //判斷是否為子留言
            $parent = $_POST['parent'];
        }else{
            $parent = 0;
        }
        $sql = "INSERT INTO message_board (nickname,content,parent) VALUES ('$name','$content',$parent)";
        if ($conn->query($sql) !== TRUE) {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        header('Location: board.php');
    }else{
        $status='留言失敗';
        header('Location: board.php?status=留言失敗');
    }
?>
