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
    <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css">
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
            $stmt = $conn->prepare("SELECT users.nickname  FROM rubysih_users_certificate as users_certificate LEFT JOIN rubysih_users as users ON users_certificate.username = users.username  WHERE users_certificate.session_id=?");
            $stmt->bind_param("s", $session_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $nickname=$row['nickname'];
            }
        }
    ?>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">留言板</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <?php
                    if($login === false) {  //沒登入才產生此按鈕
                        echo '<a class="nav-item nav-link" href="register.php">註冊</a>';
                    }
                ?>
                <?php
                    if($login === false) {  //沒登入才產生此按鈕
                        echo '<a class="nav-item nav-link" href="login.php">登入</a>';
                    }
                ?>
                <?php
                    if($login === true) {   //有登入才產生此按鈕
                        echo '<a class="nav-item nav-link" href="logout.php">登出</a>';
                    }
                ?>
            </div>
        </div>
    </nav>
   
    <div class="container">
        <?php
            if(isset($_GET['status'])){
                echo '<h1 class="warning">'.htmlspecialchars($_GET['status'], ENT_QUOTES, "UTF-8").'</h1>';
            }
        ?>
        <div class="new__message">
            <form class="parent_form">
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">暱稱:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name='nickname'
                        <?php   //有登入就代入nickname
                            if(!empty($nickname)){echo 'value="'.$nickname.'"';}
                        ?> readonly>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">內容:</label>
                    <div class="col-sm-10">
                        <textarea name="content" id="content" cols="30" rows="5"></textarea>
                    </div>
                </div>

                <input type="submit" value='送出' class='btn btn-primary btn__submit js_newParentMessage'>
            </form>
        </div>

        <div class="message__block display__none">
            <div class="info">
                <p class="name"></p>
                <p class="time"></p>
            </div>
            <div class="content">templete
                <input type="hidden" name="id" value="">
                <div class="btn btn-dark delete">刪除</div>
                <div class="btn btn-dark edit">編輯</div>
            </div>
            <div class="reply__block">
                <div class="new__message">
                    <form class="">
                        <div class="form-group row">
                            <label  class="col-sm-2 col-form-label">暱稱:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control nickname" name="nickname" value="" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">內容:</label>
                            <div class="col-sm-10">
                                <textarea name="content" id="content" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <input type="hidden" class="parent" name="parent" value="">
                        <input type="submit" value="送出" class="btn btn-primary btn__submit">
                    </form>
                </div>
            </div>
        </div>
        <?php   //撈取留言紀錄
            $pageSize = 10; //一頁幾筆資料
            $stmt = $conn->prepare("SELECT COUNT(*)  as sum FROM rubysih_messages WHERE delete_status != 1 AND parent = 0");
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $pageSum = ceil($row['sum']/10);   //總共幾頁
            }
            if(isset($_GET['pageNow'])){    //設定目前頁數
                $pageNow = $_GET['pageNow'];   
            }else{
                $pageNow=1;
            }
            //父子留言一起撈出
            $stmt_message = $conn->prepare("SELECT 
            p_id,p_content,p_date,p_nickname,
            messages.id c_id,messages.content c_content,messages.date c_date,
            users.nickname c_nickname
            FROM 
            ( SELECT messages.id p_id,messages.content p_content,messages.date p_date,users.nickname p_nickname
             FROM rubysih_messages messages LEFT JOIN rubysih_users as users ON messages.users_id = users.id
             WHERE messages.parent =0 ORDER BY date DESC LIMIT ?,?)
            parent 
            LEFT JOIN rubysih_messages messages on messages.parent=p_id
            LEFT JOIN rubysih_users as users ON messages.users_id = users.id ORDER BY p_date DESC,c_date DESC");
            $first_message = ($pageNow-1)*$pageSize;
            $last_message = $pageNow*$pageSize;
            $stmt_message->bind_param("ii", $first_message, $last_message);
            $stmt_message->execute();
            $result_message = $stmt_message->get_result();

            //將撈出的父子留言分別存在兩個陣列
            $parent_arr = array();
            $child_arr = array();
            if ($result_message->num_rows > 0) {
                while($row_message = $result_message->fetch_assoc()) {
                    if(checkExist($parent_arr, $row_message["p_id"])){   //確認不重複存父留言
                        $message = array(
                            'id' => $row_message["p_id"],
                            'content' => $row_message["p_content"],
                            'date' => $row_message["p_date"],
                            'nickname' => $row_message["p_nickname"]
                        );
                        array_push($parent_arr, $message);
                    }
                    if(isset($row_message["c_id"])){
                        $message_child = array(
                            'id' => $row_message["c_id"],
                            'content' => $row_message["c_content"],
                            'date' => $row_message["c_date"],
                            'nickname' => $row_message["c_nickname"],
                            'parent' => $row_message["p_id"]
                        );
                        array_push($child_arr, $message_child);
                    }
                }
            }
            for($i=0;$i<count($parent_arr);$i++){ //顯示父留言
                echo
                '<div class="message__block">
                    <div class="info">
                        <p class="name">' 
                            . htmlspecialchars($parent_arr[$i]["nickname"], ENT_QUOTES, "UTF-8")
                        .'</p>
                        <p class="time">'
                            . $parent_arr[$i]["date"]
                        .'</p>
                    </div>
                    <div class="content">'
                        . htmlspecialchars($parent_arr[$i]["content"], ENT_QUOTES, "UTF-8");
                        if($parent_arr[$i]["nickname"]===$nickname){ //自己的留言可刪除修改
                            echo '<input type="hidden" name="id" value="'.base64_encode($parent_arr[$i]["id"]).'">
                            <div class="btn btn-dark delete">刪除</div>
                            <div class="btn btn-dark edit">編輯</div>';
                        }
                    echo '</div>
                    <div class="reply__block">
                ';
                //顯示子留言
                for($j=0;$j<count($child_arr);$j++){
                    if($parent_arr[$i]["id"] === $child_arr[$j]["parent"]){
                        echo 
                        '<div class="info ';
                        if($child_arr[$j]["nickname"]===$parent_arr[$i]["nickname"]){
                            echo 'self__message';
                        }
                        echo '">
                            <p class="name">'
                                . htmlspecialchars($child_arr[$j]["nickname"], ENT_QUOTES, "UTF-8")
                            .'</p>
                            <p class="time">'
                                . $child_arr[$j]["date"]
                            .'</p>
                        </div>
                        <div class="content ';
                        if($child_arr[$j]["nickname"]===$parent_arr[$i]["nickname"]){
                            echo 'self__message';
                        }
                        echo '">'
                            . htmlspecialchars($child_arr[$j]["content"], ENT_QUOTES, "UTF-8");
                            if($child_arr[$j]["nickname"]===$nickname){ //自己的留言可刪除修改
                                echo '<input type="hidden" name="id" value="'.base64_encode($child_arr[$j]["id"]).'">
                                <div class="btn btn-dark delete">刪除</div>
                                <div class="btn btn-dark edit">編輯</div>';
                            }
                        echo '</div>';
                    }
                }
                //子留言-新增留言
                echo 
                        '<div class="new__message">
                            <form class="js_'.$parent_arr[$i]["id"].'">
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">暱稱:</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" name="nickname"';
                                            //有登入就代入nickname
                                            if(!empty($nickname)){echo 'value="'.$nickname.'"';}
                                            echo 'readonly>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">內容:</label>
                                    <div class="col-sm-10">
                                        <textarea name="content" id="content" cols="30" rows="5"></textarea>
                                    </div>
                                </div>
                                <input type="hidden" name="parent" value='.$parent_arr[$i]["id"].'>
                                <input type="submit" value="送出" class="btn btn-primary btn__submit">
                            </form>
                        </div>
                    </div>
                </div>';
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
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="js/update_message.js"></script>
    <script src="js/new_message.js"></script>
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
    function checkExist($parent_arr,$id){
        if(!empty($parent_arr) ){
            if($parent_arr[count($parent_arr)-1]['id'] === $id){
                return false;
            }
            return true;
        }else{
            return true;
        }
    }
?>