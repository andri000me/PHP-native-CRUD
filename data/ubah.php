<?php

require "../function/functions.php";

if (isset($_POST["nama"]) && isset($_POST["email"]) && isset($_POST["id"])) {
    $id = htmlspecialchars($_POST["id"]);
    $nama = htmlspecialchars($_POST["nama"]);
    $email = htmlspecialchars(($_POST["email"]));
    
    $text = "";
    $aksi = "";
    
    if (ubah($nama, $email, $id)) {
        $text .= "data berhasil diubah";
        $aksi .= "success";
    } else {
        $text .= "data gagal diubah";
        $aksi .= "error";
    }
    
    $result = [
        "text" => $text,
        "aksi" => $aksi
    ];
    
    echo json_encode($result);
}