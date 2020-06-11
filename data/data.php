<?php

require "../function/functions.php";
$mahasiswa = query("SELECT * FROM data ORDER BY id DESC");

echo json_encode($mahasiswa);