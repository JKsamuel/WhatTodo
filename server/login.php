<?php
/**
 * Title: login.php
 * Author: Jongeun Kim
 * Number: 000826393
 * Date: Dec 9, 2021
 * Purpose: Check whether the user input information is in the DB.
 */
//error_reporting(E_ALL);          //--> this is for check the error when I got a 'internal server error 500'
//ini_set("display_errors", 1);    //--> this is for check the error when I got a 'internal server error 500'

include "connect.php";

session_start();

$userid = filter_input(INPUT_POST, "Email", FILTER_VALIDATE_EMAIL);
$password = filter_input(INPUT_POST, "Password", FILTER_SANITIZE_STRING);

$sql = "SELECT * FROM users WHERE email=?";
$stmt = $dbh->prepare($sql);
$param = [$userid];
$success = $stmt->execute($param);
$user = [];

if($success == false){
    echo "<script>alert('Register first');</script>";
    echo "<meta http-equiv='refresh' content='0; url=/WhatTodo/index.html'>";
}else{
    while($row = $stmt->fetch()){
    array_push($user, $row["username"]);
    array_push($user, $row["email"]);               // Save all email address in DB
    array_push($user, $row["userpassword"]);
    }
}
$_SESSION["name"] = $user[0];
if(password_verify($password, $user[2])){
    echo "<script>alert('Welcome " .$_SESSION["name"]. "');</script>";
    echo "<meta http-equiv='refresh' content='0; url=/WhatTodo/application/index.html'>";
}else{
    echo "<script>alert('Password Invalid');</script>";
    echo "<meta http-equiv='refresh' content='0; url=/WhatTodo/index.html'>";
}