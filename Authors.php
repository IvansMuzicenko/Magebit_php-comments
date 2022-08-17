<?php
require_once "Database.php";

class Authors extends Database {
    private $db;
    protected $table = 'authors';

    public function __construct() {
        $this->db = new Database();
    }

    public function getAllAuthors() {
        $this->db->query("SELECT * FROM " . $this->table);
        $results = $this->db->resultSet();

        return $results;
    }

    public function addAuthor($id, $firstname, $lastname) {
        $this->db->query("INSERT INTO {$this->table} (id, firstname, lastname) VALUES (:id, :firstname, :lastname)");

        $this->db->bind(":id", $id);
        $this->db->bind(":firstname", $firstname);
        $this->db->bind(":lastname", $lastname);

        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
