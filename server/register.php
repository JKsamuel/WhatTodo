<?php

error_reporting(E_ALL);

ini_set("display_errors", 1);

include "connect.php";
date_default_timezone_set("America/New_York");

$username = filter_input(INPUT_POST, "Name", FILTER_SANITIZE_STRING);
$userid = filter_input(INPUT_POST, "Email", FILTER_VALIDATE_EMAIL);
$password = filter_input(INPUT_POST, "Password", FILTER_SANITIZE_STRING);

$datetime = date("Y-m-d")." ".date("h:i:s");

$sql = "INSERT into users (username, email, userpassword, datetime) VALUES (?, ?, ?, ?)";
$stmt = $dbh->prepare($sql);
$params = [$username, $userid, $password, $datetime];
$success = $stmt->execute($params);

if($success){
    echo "<script>alert('Thank you for registration');</script>";
    echo "<script>document.location.href='../index.html';</script>";
}