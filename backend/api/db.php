<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("mysql", "bususer", "buspass123", "bus_app");

if ($conn->connect_error) {
    die(json_encode([
        "status" => "error",
        "message" => $conn->connect_error
    ]));
}
?>
