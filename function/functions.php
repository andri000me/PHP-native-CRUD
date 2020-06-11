<?php

$conn = mysqli_connect("localhost", "root", "", "php");

function query($param) {
    global $conn;
    
    $query = mysqli_query($conn, $param);
    $wrap = [];
    while ($row = mysqli_fetch_assoc($query)) {
        $wrap[] = $row;
    }
    
    return $wrap;
}

function tambah($nama, $email) {
    global $conn;
    
    if (empty($nama) && empty($email)) {
        return false;
    } else if (empty($nama)) {
        return false;
    } else if (empty($email)) {
        return false;
    }
    
    $query = "INSERT INTO data VALUES('', '$nama', '$email')";
    mysqli_query($conn, $query);
    
    return mysqli_affected_rows($conn);
}

function cari($keyword) {
    $query = "SELECT * FROM data WHERE
                nama LIKE '%$keyword%' OR
                email LIKE '%$keyword%' ORDER BY id DESC";
                
    return query($query);
}

function hapus($id) {
    global $conn;
    
    $query = "DELETE FROM data WHERE id = '$id'";
    mysqli_query($conn, $query);
    
    return mysqli_affected_rows($conn);
}

function ubah($nama, $email, $id) {
    global $conn;
    
    if (empty($nama) && empty($email)) {
        return false;
    } else if (empty($nama)) {
        return false;
    } else if (empty($email)) {
        return false;
    }
    
    $query = "UPDATE data SET nama= '$nama', email= '$email' WHERE id = '$id'";
    mysqli_query($conn, $query);
    
    return mysqli_affected_rows($conn);
}
