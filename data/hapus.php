<?php

require "../function/functions.php";

if (isset($_GET["id"])) {
    $id = mysqli_real_escape_string($conn, $_GET["id"]);
    
    $text = "";
    $aksi = "";
    
    if (hapus($id) > 0) {
        $text .= "data berhasil dihapus";
        $aksi = "success";
    } else {
        $text .= "data gagal dihapus";
        $aksi = "error";
    }
    
    $result = [
        "text" => $text,
        "aksi" => $aksi
    ];
    
    echo json_encode($result);
}