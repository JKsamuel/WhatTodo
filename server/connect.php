<?php
/**
 * Title: conncect.php
 * Author: Jongeun Kim
 * Number: 000826393
 * Date: Dec 9, 2021
 * Purpose: Connect to Local Database(phpmyadmin)
 */

try{
    $dbh = new PDO(
        "mysql:host=localhost;dbname=test", 
        "root", 
        "");
} catch( Exception $e ){
    die("ERROR: Could not connect. Something wrong, bro. {$e->getMessage()}");
}
