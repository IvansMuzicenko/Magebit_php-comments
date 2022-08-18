<?php
require_once "Database.php";

class Comments extends Database {
    private $db;
    protected $table = 'comments';

    public function __construct() {
        $this->db = new Database();
    }

    public function getAllComments() {
        $this->db->query("SELECT comments.id, comments.message, comments.date, authors.firstname, authors.lastname FROM {$this->table} INNER JOIN authors ON comments.author_id=authors.id ORDER BY comments.date DESC");
        $results = $this->db->resultSet();

        return $results;
    }

    public function addComment($id, $author_id, $message) {
        $this->db->query("INSERT INTO {$this->table} 
        (id, author_id, message, date) 
        VALUES 
        (:id, :author_id, :message, :date)");

        $this->db->bind(":id", $id);
        $this->db->bind(":author_id", $author_id);
        $this->db->bind(":message", $message);
        $this->db->bind(":date", date("Y-m-d H:i:s"));

        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
