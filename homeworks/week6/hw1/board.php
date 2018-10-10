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
    <?php   //檢測是否為登入狀態
        if(!isset($_COOKIE["member_id"])) {
            $login=false;
            $nickname="";
        } else {
            $login=true;
            $session_id=$_COOKIE["member_id"];
            $result = $conn->query("SELECT users.nickname  FROM rubysih_users_certificate as users_certificate LEFT JOIN rubysih_users as users ON users_certificate.username = users.username  WHERE users_certificate.session_id='$session_id'");
            $data = $result->fetch_assoc();
            $nickname=$data['nickname'];
        }
    ?>
    <header>
        <ul>
            <?php
                if($login === false) {  //沒登入才產生此按鈕
                    echo 
                    '<li>
                        <a href="login.php" >登入</a>
                    </li>';
                }
            ?>
            <?php
                if($login === false) {  //沒登入才產生此按鈕
                    echo 
                    '<li>
                        <a href="register.php" >註冊</a>
                    </li>';
                }
            ?>
            <?php
                if($login === true) {   //有登入才產生此按鈕
                    echo 
                    '<li>
                        <a href="logout.php" >登出</a>
                    </li>';
                }
            ?>
        </ul>
    </header>
    
    <div class="container">
        <?php
            if(isset($_GET['status'])){
                echo '<h1 class="warning">'.htmlspecialchars($_GET['status'], ENT_QUOTES, "UTF-8").'</h1>';
            }
        ?>
        <div class="new__message">
            <form action="/board/new_message.php" method='POST'>
                暱稱 : <input type="text" name='nickname' 
                <?php   //有登入就代入nickname
                    if(!empty($nickname)){echo 'value="'.$nickname.'"';}
                ?> readonly>
                內容 : <textarea name="content" id="content" cols="30" rows="5"></textarea>
                <input type="submit" value='送出' class='btn btn__submit'>
            </form>
        </div>
        <?php   //撈取留言紀錄
            $pageSize = 10; //一頁幾筆資料
            $result_sum = $conn->query("SELECT COUNT(*)  as sum FROM rubysih_messages WHERE delete_status != 1");
            $data = $result_sum->fetch_assoc();
            $pageSum = ceil($data['sum']/10);   //總共幾頁
            if(isset($_GET['pageNow'])){    //設定目前頁數
                $pageNow = $_GET['pageNow'];   
            }else{
                $pageNow=1;
            }

            $sql = "SELECT messages.id, messages.content, users.nickname, messages.date FROM rubysih_messages as messages LEFT JOIN rubysih_users as users ON messages.users_id = users.id WHERE parent = 0 AND delete_status != 1 ORDER BY date DESC LIMIT ".($pageNow-1)*$pageSize.", ".$pageNow*$pageSize;
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo
                    '<div class="message__block">
                        <div class="info">
                            <p class="name">' 
                                . htmlspecialchars($row["nickname"], ENT_QUOTES, "UTF-8")
                            .'</p>
                            <p class="time">'
                                . $row["date"]
                            .'</p>
                        </div>
                        <div class="content">'
                            . htmlspecialchars($row["content"], ENT_QUOTES, "UTF-8");
                            if($row["nickname"]===$nickname){ //自己的留言可刪除修改
                                echo '<input type="hidden" name="id" value="'.base64_encode($row["id"]).'">
                                <div class="btn delete">刪除</div>
                                <div class="btn edit">編輯</div>';
                            }
                        echo '</div>
                        <div class="reply__block">
                    ';
                    //撈取子留言
                    $sql_child = "SELECT messages.id, messages.content, users.nickname, messages.date FROM rubysih_messages as messages LEFT JOIN rubysih_users as users ON messages.users_id = users.id WHERE parent = " . $row["id"] . " AND delete_status != 1 ORDER BY date DESC";
                    $result_child = $conn->query($sql_child);
                    if ($result_child->num_rows > 0) {
                        while($row_child = $result_child->fetch_assoc()) {
                            echo 
                            '<div class="info ';
                            if($row_child["nickname"]===$row["nickname"]){
                                echo 'self__message';
                            }
                            echo '">
                                <p class="name">'
                                    . htmlspecialchars($row_child["nickname"], ENT_QUOTES, "UTF-8")
                                .'</p>
                                <p class="time">'
                                    . $row_child["date"]
                                .'</p>
                            </div>
                            <div class="content ';
                            if($row_child["nickname"]===$row["nickname"]){
                                echo 'self__message';
                            }
                            echo '">'
                                . htmlspecialchars($row_child["content"], ENT_QUOTES, "UTF-8");
                                if($row_child["nickname"]===$nickname){ //自己的留言可刪除修改
                                    echo '<input type="hidden" name="id" value="'.base64_encode($row_child["id"]).'">
                                    <div class="btn delete">刪除</div>
                                    <div class="btn edit">編輯</div>';
                                }
                            echo '</div>';
                        }
                    }
                    //子留言-新增留言
                    echo 
                            '<div class="new__message">
                                <form action="/board/new_message.php" method="POST">
                                    暱稱 : <input type="text" name="nickname"';
                                    //有登入就代入nickname
                                    if(!empty($nickname)){echo 'value="'.$nickname.'" ';}
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
        <div class="page">
            <?php
                for($i=1;$i<=$pageSum;$i++){
                    echo 
                    '<span class="page_'.$i.'">
                        <a href="board.php?pageNow='.$i.'">'.$i.'</a>
                    </span>';
                }
            ?>
        </div>
    </div>
    <script src="js/update_message.js"></script>
    <script>
        //Now page setting
        document.addEventListener('DOMContentLoaded', function () {
            nowPage(<?php echo $pageNow;?>);
        })
        function nowPage(pageNow){
            document.querySelector('.page_'+pageNow).className+=' now';
        }
    </script>
</body>
</html>
<?php
    function setPage($pageNow,$nowNum){
        if($pageNow*10>$nowNum){
            return $nowNum;
        }else{
            return $pageNow*10;
        }
    }
?>