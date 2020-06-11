<?php

require "../function/functions.php";

if (isset($_POST["keyword"])) {
    $keyword = htmlspecialchars($_POST["keyword"]);
    $mahasiswa = cari($keyword);
    
    echo json_encode($mahasiswa);
}
