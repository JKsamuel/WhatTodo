<?php
/**
 * Title: Register.php
 * Author: Jongeun Kim
 * Number: 000826393
 * Date: Dec 9, 2021
 * Purpose: When setting the user's name, email address, and password, it is sent to the DB using the sql INSERT statement.
 *          Before sending to the DB, check whether the email address is already stored in the DB, and if it is not a registered email address,
 *          the user's password is encrypted using the 'password_has' function and stored in the DB.
 */
//error_reporting(E_ALL);          //--> this is for check the error when I got a 'internal server error 500'
//ini_set("display_errors", 1);    //--> this is for check the error when I got a 'internal server error 500'

include "connect.php";

date_default_timezone_set("America/New_York");

$username = filter_input(INPUT_POST, "Name", FILTER_SANITIZE_STRING);
$userid = filter_input(INPUT_POST, "Email", FILTER_VALIDATE_EMAIL);
$password = filter_input(INPUT_POST, "Password", FILTER_SANITIZE_STRING);

$query = "SELECT * FROM users";
$statement = $dbh->prepare($query);
$usermail = $statement->execute();

// Create an array for storing an email addresses
$userMailList = [];
while($row = $statement->fetch()){
    array_push($userMailList, $row["email"]);
}

// If the email address is already stored in DB, user registration is rejected
// and returns to the first screen.
if(in_array($userid, $userMailList)){
    echo "<script>alert('Already registed, Use the other email');</script>";
    echo "<script>document.location.href='../index.html';</script>";
}

$validationOfPassword = passwordCheck($password);                           // Validation of password.
if($validationOfPassword[0] == false){
    echo "<script>alert('" .$validationOfPassword[1]. "');</script>";       // alert message.
    echo "<script>document.location.href='../index.html';</script>";        // return main page.
}else{
    $hash = password_hash($password, PASSWORD_DEFAULT);                     // encrypt the password.

    $datetime = date("Y-m-d")." ".date("h:i:s");                            // set register time.
    
    // register user information
    $sql = "INSERT into users (username, email, userpassword, datetime) VALUES (?, ?, ?, ?)";
    $stmt = $dbh->prepare($sql);
    $params = [$username, $userid, $hash, $datetime];
    $success = $stmt->execute($params);

    if($success){
        echo "<script>alert('Thank you for registration');</script>";       // display welcom message
        echo "<script>document.location.href='../index.html';</script>";    // Go to login page.
    }
}

/**
 * Validation of password using regular expressions
 * Restriction
 * 1. The password length must be 10 to 30digits or less.
 * 2. It has no space
 * 3. At least one or more letter, number, and special letter must be included.
 */
function passwordCheck($password){
    $pw = $password;
    $num = preg_match('/[0-9]/u', $pw);
    $eng = preg_match('/[a-z]/u', $pw);
    $spe = preg_match("/[\!\@\#\$\%\^\&\*]/u",$pw);

    if(strlen($pw) < 10 || strlen($pw) > 30){
        return array(false, "Use English, numbers, and special characters in passwords of 10 to 30 digits.");
    }

    if(preg_match("/\s/u", $pw) == true)
    {
        return array(false, "Enter your password without a space.");
        exit;
    }
 
    if( $num == 0 || $eng == 0 || $spe == 0)
    {
        return array(false, "Please use a mix of English, numbers, and symbols.");
        exit;
    }
 
    return array(true);
}