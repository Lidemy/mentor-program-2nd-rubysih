<?php
    require_once('conn.php');
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>留言板</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/board.css">
</head>

<body>
    <?php
        if(!isset($_COOKIE["member_id"])) {
            $login=false;
        } else {
            $login=true;
            $nickname=$_COOKIE["member_id"];
        }
    ?>
    <header>
        <ul>
            <li>
                <a href="login.php" class="
                <?php   //已登入就隱藏按鈕
                if($login===true){echo 'display__none';}?>
                ">登入</a>
            </li>
            <li>
                <a href="register.php" class="
                <?php   //已登入就隱藏按鈕
                if($login===true){echo 'display__none';}?>
                ">註冊</a>
            </li>
            <li>
                <a href="logout.php" class="
                <?php   //沒登入就隱藏按鈕
                if($login===false){echo 'display__none';}?>
                ">登出</a>
            </li>
        </ul>
    </header>
    
    <div class="container">
        <div class="new__message">
            <form action="/board/new_message.php" method='POST'>
                暱稱 : <input type="text" name='nickname' 
                <?php   //有登入就代入nickname
                    if(isset($nickname)){echo 'value="'.$nickname.'"';}
                ?> readonly>
                內容 : <textarea name="content" id="content" cols="30" rows="5"></textarea>
                <input type="submit" value='送出' class='btn btn__submit'>
                <?php
                    if(isset($_GET['status'])){
                        echo '<h1 class="warning">'.$_GET['status'].'</h1>';
                    }
                ?>
            </form>
        </div>
        <?php   //撈取留言紀錄
            $sql = "SELECT * FROM message_board WHERE parent = 0";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo
                    '<div class="message__block">
                        <div class="info">
                            <p class="name">' 
                                . $row["nickname"]
                            .'</p>
                            <p class="time">'
                                . $row["date"]
                            .'</p>
                        </div>
                        <div class="content">'
                            . $row["content"]
                        .'</div>
                        <div class="reply__block">
                    ';
                    //撈取子留言
                    $sql_child = "SELECT * FROM message_board WHERE parent = " . $row["id"];
                    $result_child = $conn->query($sql_child);
                    if ($result_child->num_rows > 0) {
                        while($row_child = $result_child->fetch_assoc()) {
                            echo 
                            '<div class="info">
                                <p class="name">'
                                    . $row_child["nickname"]
                                .'</p>
                                <p class="time">'
                                    . $row_child["date"]
                                .'</p>
                            </div>
                            <div class="content">'
                                . $row_child["content"]
                            .'</div>
                            ';
                        }
                    }
                    //子留言-新增留言
                    echo 
                            '<div class="new__message">
                                <form action="/board/new_message.php" method="POST">
                                    暱稱 : <input type="text" name="nickname"';
                                    //有登入就代入nickname
                                    if(isset($nickname)){echo 'value="'.$nickname.'" ';}
                                    echo ' readonly>
                                    內容 : <textarea name="content" id="content" cols="30" rows="5"></textarea>
                                    <input type="text" name="parent" value='.$row["id"].' class="display__none">
                                    <input type="submit" value="送出" class="btn btn__submit">
                                </form>
                            </div>
                        </div>
                    </div>';
                }
            } 
        ?>
    </div>
</body>
</html>