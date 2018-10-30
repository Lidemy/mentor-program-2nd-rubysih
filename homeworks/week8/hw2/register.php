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
    <title>註冊</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css">
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
                
                <input type="submit" value='送出' class='btn btn-primary btn__submit'>
            </form>
        </div>
    </div>
</body>
</html>
<?php
    if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['nickname'])){    //給值判斷
        if(!empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['nickname'])){      //空值判斷
            $username = $_POST['username'];
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
            $nickname = $_POST['nickname'];

            //insert into db
            $stmt_addUser = $conn->prepare("INSERT INTO rubysih_users (username,password,nickname) VALUES (?,?,?)");
            $stmt_addUser->bind_param("sss", $username, $password, $nickname);
            if ($stmt_addUser->execute() !== TRUE) {
                echo "Error: "  . $conn->error;
                echo '<h1 class="warning">註冊失敗!!</h1>';
            }else{
                $_SESSION['member_id'] = $username;
                header('Location: index.php');
            }
            $stmt_addUser->close();
            $conn->close();
        }else{echo '<h1 class="warning">註冊失敗!</h1>';}
    }
?>
