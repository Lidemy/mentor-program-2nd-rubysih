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

            $stmt = $conn->prepare("SELECT * FROM rubysih_users WHERE username=?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                if (password_verify($password, $row['password'])) {
                    setSession($username,$conn);
                }
                header('Location: board.php');

            }else{echo '<h1 class="warning">登入失敗!</h1>';}
            
        }else{echo '<h1 class="warning">登入失敗!</h1>';}
    }
    function setSession($username,$conn){
        $session_id=uniqid();
        $sql_session = "INSERT INTO rubysih_users_certificate (session_id,username) VALUES ('$session_id','$username')";
        if ($conn->query($sql_session) !== TRUE) {
            echo "Error: " . $sql_session . "<br>" . $conn->error;
        }
        setcookie("member_id", $session_id, time()+3600*24);

    }
?>