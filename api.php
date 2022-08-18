<?php
require "Authors.php";
require "Comments.php";
header('Content-Type: application/json');


$data = [];

$authors = new Authors();
$comments = new Comments();


if (isset($_GET["api"])) {
    switch ($_GET["api"]) {
        case 'add-author':
            $id = $_POST['author_id'];
            $firstname = $_POST['author_firstname'];
            $lastname = $_POST['author_lastname'];

            if (isset($id) && isset($firstname) && isset($lastname)) {
                $result = $authors->addAuthor($id, $firstname, $lastname);
                $output = [
                    'message' => 'New author added',
                    'status' => $result
                ];
            }
            break;

        case 'get-all-authors':
            $authors_list = $authors->getAllAuthors();

            $output = [
                'message' => 'All authors listed',
                "authors" => $authors_list
            ];

            break;

        case 'add-comment':
            $id = $_POST['comment_id'];
            $author_id = $_POST['comment_author'];
            $message = $_POST['comment_message'];

            if (isset($id) && isset($author_id) && isset($message)) {
                $result = $comments->addComment($id, $author_id, $message);
                $output = [
                    'message' => 'New comment added',
                    'status' => $result
                ];
            }
            break;

        case 'get-all-comments':
            $comments_list = $comments->getAllComments();

            $output = [
                'message' => 'All comments listed',
                "comments" => $comments_list
            ];

            break;
    }
}

echo json_encode($output, JSON_PRETTY_PRINT);
