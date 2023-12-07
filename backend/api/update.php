<?php

// Set common HTTP response headers
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check HTTP request method
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header('ALLOW: PUT');
    http_response_code(405);
    echo json_encode(array('message' => 'Method not allowed'));
    return;
}

require_once '../db/Database.php';
include_once '../models/Bookmark.php';

//instantiate a DB object and connect
$database = new Database();
$dbConnection = $database->connect();

//instantiate todo object
$bookmark = new Bookmark($dbConnection);

//get the HTTP PUT request JSON body
$data = json_decode(file_get_contents('php://input'), true);

//if no task is included in the json body, return an error
if (!$data || !isset($data['title']) || !isset($data['URL']) || !isset($data['id'])) {
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error missing required parameters title, URL, or id in the JSON body')
    );
    return;
}

// Create a todo item
$bookmark->setId($data['id']);
$bookmark->setTitle($data['title']);
$bookmark->setURL($data['URL']);

// Check if the update was successful
if ($bookmark->update()) {
    echo json_encode(
        array('message' => 'Bookmark item was updated')
    );
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(
        array('message' => 'Error: Bookmark item was not updated')
    );
}
