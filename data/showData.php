<?php

require "../function/functions.php";

if (isset($_GET["id"])) {
    $id = mysqli_real_escape_string($conn, $_GET["id"]);
    $mahasiswa = query("SELECT * FROM data WHERE id = '$id'");
    
    echo json_encode($mahasiswa);
}