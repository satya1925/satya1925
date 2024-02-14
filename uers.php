<?php 
$servername = "localhost"; 
$username = "id21829037_sarang"; 
$password = "VasaviSatya@143"; 
$dbname = "id21829037_satya"; 
// Create connection 
$conn = new mysqli($servername, $username, $password, $dbname); 
// Check connection 
if ($conn->connect_error) 
{ 
die("Connection failed: " . $conn->connect_error); 
} 
$conn->close();
 ?>