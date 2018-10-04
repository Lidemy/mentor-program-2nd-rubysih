<?php
    require_once('conn.php');
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>註冊</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/board.css">
</head>
<body>
    <div class="container">
        <div class="block">
            <h1>註冊</h1>
            <form method='POST'>
                帳號 : <input type="text" name='username'>
                密碼 : <input type="password" name='password'>
                暱稱 : <input type="text" name='nickname'>
                
                <input type="submit" value='送出' class='btn btn__submit'>
            </form>
        </div>
    </div>
</body>
</html>
<?php
    if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['nickname'])){    //給值判斷
        if($_POST['username']!=='' && $_POST['password']!=='' && $_POST['nickname']!==''){      //空值判斷
            $username = $_POST['username'];
            $password = $_POST['password'];
            $nickname = $_POST['nickname'];
            //username 或 nickname 沒有重複才可註冊
            $sql = "SELECT * FROM users WHERE username = '" . $username . "' or nickname = '" . $nickname . "'";
            $result = $conn->query($sql);
            if ($result->num_rows <= 0) {
                //insert into db
                $sql_addUser = "INSERT INTO users (username,password,nickname) VALUES ('$username','$password','$nickname')";
                if ($conn->query($sql_addUser) !== TRUE) {
                    echo "Error: " . $sql_addUser . "<br>" . $conn->error;
                }
                header('Location: board.php');
            }else{echo '<h1 class="warning">註冊失敗!</h1>';}
        }else{echo '<h1 class="warning">註冊失敗!</h1>';}
    }
?>
