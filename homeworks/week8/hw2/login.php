<?php
    session_start();
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
    <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css">
    <link rel="stylesheet" href="css/board.css">
</head>
<body>
    <div class="container">
        <div class="block">
            <h1>登入</h1>
            <form method='POST'>
                帳號 : <input type="text" name='username'>
                密碼 : <input type="password" name='password'>
                <input type="submit" value='送出' class='btn btn-primary btn__submit'>
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

            $stmt = $conn->prepare("SELECT * FROM rubysih_users WHERE username=?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                if (password_verify($password, $row['password'])) {
                    $_SESSION['member_id'] = $username;
                }
                header('Location: index.php');

            }else{echo '<h1 class="warning">登入失敗!</h1>';}
            $stmt->colse();
        }else{echo '<h1 class="warning">登入失敗!</h1>';}
        $conn->close();
    }
?>