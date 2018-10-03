<?php
    require_once('conn.php');
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>登入</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/board.css">
</head>
<body>
    <div class="container">
        <div class="block">
            <h1>登入</h1>
            <form method='POST'>
                帳號 : <input type="text" name='username'>
                密碼 : <input type="password" name='password'>
                <input type="submit" value='送出' class='btn btn__submit'>
            </form>
        </div>
    </div>
</body>
</html>
<?php
    if(isset($_POST['username']) && isset($_POST['password']) ){
        if($_POST['username']!=='' && $_POST['password']!==''){
            $username = $_POST['username'];
            $password = $_POST['password'];

            $sql = "SELECT * FROM users WHERE username = '" . $username . "' or password = '" . $password . "'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                //抓該帳號的nickname塞進cookie
                $sql_nickname = "SELECT nickname FROM users WHERE username = '" . $username . "'";
                $result_nickname = $conn->query($sql_nickname);
                if ($result_nickname->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        setcookie("member_id", $row["nickname"], time()+3600*24);
                    }
                }
                header('Location: board.php');

            }else{echo '<h1>登入失敗!</h1>';}
            
        }else{echo '<h1>登入失敗!</h1>';}
    }
?>