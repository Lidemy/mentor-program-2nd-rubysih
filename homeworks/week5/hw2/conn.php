<!-- connect to db -->
<?php
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "comments";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("SET NAMES 'UTF8'");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

?>