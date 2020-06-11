<?php

require "../function/functions.php";

if (isset($_POST["nama"]) && isset($_POST["email"])) {
    $nama = htmlspecialchars($_POST["nama"]);
    $email = htmlspecialchars($_POST["email"]);
    
    $text = "";
    $aksi = "";

    if (tambah($nama, $email) > 0) {
        $text .= "data berhasil ditambahkan";
        $aksi .= "success";
    } else {
        $text .= "data gagal ditambahkan";
        $aksi .= "error";
    }
    
    $hasil = [
        "text" => $text,
        "aksi" => $aksi
    ];
    
    echo json_encode($hasil);
}