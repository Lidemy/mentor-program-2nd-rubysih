<?php
    setcookie("member_id", '', time()+3600*24);
    header('Location: board.php');
?>