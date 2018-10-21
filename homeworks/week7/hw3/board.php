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
            $stmt_parent = $conn->prepare("SELECT messages.id, messages.content, users.nickname, messages.date FROM rubysih_messages as messages LEFT JOIN rubysih_users as users ON messages.users_id = users.id WHERE parent = 0 AND delete_status != 1 ORDER BY date DESC LIMIT ?, ?");
            $first_message = ($pageNow-1)*$pageSize;
            $last_message = $pageNow*$pageSize;
            $stmt_parent->bind_param("ii", $first_message, $last_message);
            $stmt_parent->execute();
            $result_parent = $stmt_parent->get_result();
            if ($result_parent->num_rows > 0) {
                while($row_parent = $result_parent->fetch_assoc()) {


                    echo
                    '<div class="message__block">
                        <div class="info">
                            <p class="name">' 
                                . htmlspecialchars($row_parent["nickname"], ENT_QUOTES, "UTF-8")
                            .'</p>
                            <p class="time">'
                                . $row_parent["date"]
                            .'</p>
                        </div>
                        <div class="content">'
                            . htmlspecialchars($row_parent["content"], ENT_QUOTES, "UTF-8");
                            if($row_parent["nickname"]===$nickname){ //自己的留言可刪除修改
                                echo '<input type="hidden" name="id" value="'.base64_encode($row_parent["id"]).'">
                                <div class="btn btn-dark delete">刪除</div>
                                <div class="btn btn-dark edit">編輯</div>';
                            }
                        echo '</div>
                        <div class="reply__block">
                    ';
                    //撈取子留言

                    $stmt_child = $conn->prepare("SELECT messages.id, messages.content, users.nickname, messages.date FROM rubysih_messages as messages LEFT JOIN rubysih_users as users ON messages.users_id = users.id WHERE parent = ? AND delete_status != 1 ORDER BY date DESC");
                    $stmt_child->bind_param("i", $row_parent["id"]);
                    $stmt_child->execute();
                    $result_child = $stmt_child->get_result();
                    if ($result_child->num_rows > 0) {
                        while($row_child = $result_child->fetch_assoc()) {
                            echo 
                            '<div class="info ';
                            if($row_child["nickname"]===$row_parent["nickname"]){
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
                            if($row_child["nickname"]===$row_parent["nickname"]){
                                echo 'self__message';
                            }
                            echo '">'
                                . htmlspecialchars($row_child["content"], ENT_QUOTES, "UTF-8");
                                if($row_child["nickname"]===$nickname){ //自己的留言可刪除修改
                                    echo '<input type="hidden" name="id" value="'.base64_encode($row_child["id"]).'">
                                    <div class="btn btn-dark delete">刪除</div>
                                    <div class="btn btn-dark edit">編輯</div>';
                                }
                            echo '</div>';
                        }
                    }
                    //子留言-新增留言
                    echo 
                            '<div class="new__message">
                                <form class="js_'.$row_parent["id"].'">
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
                                    <input type="hidden" name="parent" value='.$row_parent["id"].'>
                                    <input type="submit" value="送出" class="btn btn-primary btn__submit">
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
?>