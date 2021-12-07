<?php

error_reporting(E_ALL);

ini_set("display_errors", 1);

include "connect.php";

session_start();

$userid = filter_input(INPUT_POST, "Email", FILTER_VALIDATE_EMAIL);
$password = filter_input(INPUT_POST, "Password", FILTER_SANITIZE_STRING);

$sql = "SELECT * FROM users";
$stmt = $dbh->prepare($sql);
$usermail = $stmt->execute();

$userlist = [];
$userpassword = [];
while($row = $stmt->fetch()){
    array_push($userlist, $row["email"]);
    array_push($userpassword, $row["userpassword"]);
}

if(in_array($userid, $userlist) and in_array($password, $userpassword)){
    $_SESSION["email"] = $userid;
    echo "<meta http-equiv='refresh' content='0; url=/WhatTodo/application/index.html'>";
}else{
    session_unset();
    session_destroy();
}