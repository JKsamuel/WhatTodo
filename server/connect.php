<?php

try{
    $dbh = new PDO(
        "mysql:host=localhost;dbname=test", 
        "root", 
        "");
} catch( Exception $e ){
    die("ERROR: Could not connect. Something wrong, bro. {$e->getMessage()}");
}
